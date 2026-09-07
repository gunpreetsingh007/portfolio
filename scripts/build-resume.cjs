/**
 * Regenerates public/resume.pdf from the /resume page.
 *
 *   npm run build && npm run resume:pdf
 *
 * Serves the static export in ./out on a local port, then drives headless
 * Chrome/Edge to print /resume to PDF. Printing the built output (rather than
 * the dev server) means the PDF matches exactly what ships.
 *
 * Build-time tooling — not part of the exported site.
 *
 * Why print-to-PDF and not an HTML-to-PDF library: this produces a real text
 * layer, which is what an ATS parser reads. Canvas-based converters rasterise
 * the text and the résumé becomes unparseable.
 */

const http = require('http')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawn } = require('child_process')

const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'out')
const PDF_PATH = path.join(ROOT, 'public', 'resume.pdf')

/** @type {Record<string, string>} */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

/** @type {string[]} */
const BROWSER_CANDIDATES = [
  process.env.CHROME_PATH || '',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter((candidate) => candidate.length > 0)

function findBrowser() {
  const found = BROWSER_CANDIDATES.find((candidate) => fs.existsSync(candidate))
  if (!found) {
    throw new Error(
      'No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser executable.',
    )
  }
  return found
}

/**
 * Minimal static file server for the exported site.
 * @param {string} dir
 * @returns {Promise<{ server: import('http').Server, port: number }>}
 */
function serve(dir) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0] ?? '/')
    const candidates = [
      path.join(dir, urlPath),
      path.join(dir, urlPath, 'index.html'),
      path.join(dir, `${urlPath}.html`),
    ]
    const file = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile())
    if (!file) {
      res.writeHead(404)
      res.end('not found')
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') throw new Error('could not bind a port')
      resolve({ server, port: address.port })
    })
  })
}

const sleep = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Resolves once `file` exists and its size has been unchanged for two polls.
 * @param {string} file
 * @param {number} timeoutMs
 * @returns {Promise<void>}
 */
async function waitForStableFile(file, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  let previous = -1
  while (Date.now() < deadline) {
    await sleep(400)
    if (!fs.existsSync(file)) continue
    const { size } = fs.statSync(file)
    if (size > 0 && size === previous) return
    previous = size
  }
  throw new Error('timed out waiting for the browser to write the PDF')
}

async function main() {
  if (!fs.existsSync(path.join(OUT_DIR, 'resume.html')) &&
      !fs.existsSync(path.join(OUT_DIR, 'resume', 'index.html'))) {
    throw new Error('out/resume not found — run `npm run build` first.')
  }

  const browser = findBrowser()
  const { server, port } = await serve(OUT_DIR)
  const url = `http://127.0.0.1:${port}/resume`
  console.log(`Printing ${url}\n  browser: ${browser}`)

  // Prove the page is actually served before printing, so a connectivity failure
  // is reported here rather than silently becoming a PDF of a browser error page.
  const probe = await fetch(url).then((r) => (r.ok ? r.text() : ''))
  if (!probe.includes('Gunpreet')) {
    server.close()
    throw new Error(`the local server did not serve the résumé at ${url}`)
  }

  fs.rmSync(PDF_PATH, { force: true })

  await /** @type {Promise<void>} */ (new Promise((resolve, reject) => {
    const child = spawn(browser, [
      '--headless',
      '--disable-gpu',
      '--no-first-run',
      // A configured system proxy makes headless Edge fail to reach 127.0.0.1 and
      // silently print its "can't reach this page" error instead.
      '--no-proxy-server',
      // Without an isolated profile an already-running Chrome/Edge takes over the
      // command line, and this process exits 0 having printed nothing.
      `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'resume-pdf-'))}`,
      '--no-pdf-header-footer',
      '--virtual-time-budget=8000',
      `--print-to-pdf=${PDF_PATH}`,
      url,
    ], { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`browser exited ${code}`))))
  }))

  // On Windows the launched executable hands off to a separate browser process and
  // exits straight away. Closing the server on that exit pulls the rug out from
  // under the real renderer, which then prints its "can't reach this page" error.
  // Wait for the PDF to appear and stop growing before shutting the server down.
  await waitForStableFile(PDF_PATH, 45000)
  server.close()

  const { size } = fs.statSync(PDF_PATH)
  // A blank print still writes a valid ~1 KB PDF, so treat tiny output as failure.
  if (size < 20000) {
    throw new Error(`resume.pdf is only ${size} bytes — the page likely printed blank.`)
  }
  console.log(`Wrote public/resume.pdf (${(size / 1024).toFixed(0)} KB)`)
}

main().catch((error) => {
  console.error(`\nresume:pdf failed — ${error.message}`)
  process.exit(1)
})
