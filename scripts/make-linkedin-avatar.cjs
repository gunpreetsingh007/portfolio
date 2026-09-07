// @ts-nocheck
/*
 * Bakes the About-avatar look (emerald->teal->blue gradient + top highlight)
 * behind the transparent public/avatar.png cutout and exports a flat square
 * PNG suitable for a LinkedIn profile photo (square, displayed as a circle).
 *
 * Run: node scripts/make-linkedin-avatar.cjs
 */
const fs = require('fs')
const zlib = require('zlib')
const path = require('path')

const SRC = path.join(__dirname, '..', 'public', 'avatar.png')
const OUT = path.join(__dirname, '..', 'public', 'avatar-linkedin.png')
const SIZE = 1080 // square output

// --- PNG decode (color type 6 / 8-bit / no interlace) ----------------------
function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
}

function decode(file) {
  const b = fs.readFileSync(file)
  const w = b.readUInt32BE(16)
  const h = b.readUInt32BE(20)
  if (b[25] !== 6 || b[24] !== 8) throw new Error('expected 8-bit RGBA PNG')
  let o = 8
  const idat = []
  while (o < b.length) {
    const len = b.readUInt32BE(o)
    const type = b.toString('ascii', o + 4, o + 8)
    if (type === 'IDAT') idat.push(b.subarray(o + 8, o + 8 + len))
    if (type === 'IEND') break
    o += 12 + len
  }
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const bpp = 4
  const stride = w * bpp
  const img = Buffer.alloc(h * stride)
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)]
    const rs = y * (stride + 1) + 1
    for (let x = 0; x < stride; x++) {
      const v = raw[rs + x]
      const a = x >= bpp ? img[y * stride + x - bpp] : 0
      const up = y > 0 ? img[(y - 1) * stride + x] : 0
      const ul = x >= bpp && y > 0 ? img[(y - 1) * stride + x - bpp] : 0
      let val
      if (ft === 0) val = v
      else if (ft === 1) val = v + a
      else if (ft === 2) val = v + up
      else if (ft === 3) val = v + ((a + up) >> 1)
      else val = v + paeth(a, up, ul)
      img[y * stride + x] = val & 255
    }
  }
  return { w, h, data: img }
}

// --- PNG encode (color type 6 / 8-bit) -------------------------------------
const crcTable = (() => {
  const t = []
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, buf) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(buf.length, 0)
  const t = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, buf])), 0)
  return Buffer.concat([len, t, buf, crc])
}
function encode(w, h, data) {
  const stride = w * 4
  const raw = Buffer.alloc(h * (stride + 1))
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0
    data.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const comp = zlib.deflateSync(raw, { level: 9 })
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', comp), chunk('IEND', Buffer.alloc(0))])
}

// --- compose ---------------------------------------------------------------
const C0 = [52, 211, 153] // emerald-400
const C1 = [20, 184, 166] // teal-500
const C2 = [37, 99, 235] // blue-600
const lerp = (a, b, t) => a + (b - a) * t

const src = decode(SRC)
const W = SIZE
const H = SIZE
const out = Buffer.alloc(W * H * 4)

// center the cutout horizontally; anchor so shoulders sit near the bottom
const offX = Math.round((W - src.w) / 2)
const offY = Math.round((H - src.h) / 2)

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // diagonal (to bottom-right) gradient with a mid stop
    const t = (x + y) / (W - 1 + (H - 1))
    let r, g, b
    if (t < 0.5) {
      const u = t / 0.5
      r = lerp(C0[0], C1[0], u)
      g = lerp(C0[1], C1[1], u)
      b = lerp(C0[2], C1[2], u)
    } else {
      const u = (t - 0.5) / 0.5
      r = lerp(C1[0], C2[0], u)
      g = lerp(C1[1], C2[1], u)
      b = lerp(C1[2], C2[2], u)
    }
    // top-center radial highlight: rgba(255,255,255,0.35) -> transparent at 60%
    const rx = 1.2 * W
    const ry = 0.8 * H
    const d = Math.sqrt(((x - W / 2) / rx) ** 2 + (y / ry) ** 2)
    const hl = Math.max(0, 1 - d / 0.6) * 0.35
    r = r * (1 - hl) + 255 * hl
    g = g * (1 - hl) + 255 * hl
    b = b * (1 - hl) + 255 * hl

    // composite subject over background
    const sx = x - offX
    const sy = y - offY
    if (sx >= 0 && sx < src.w && sy >= 0 && sy < src.h) {
      const si = (sy * src.w + sx) * 4
      const sa = src.data[si + 3] / 255
      if (sa > 0) {
        r = src.data[si] * sa + r * (1 - sa)
        g = src.data[si + 1] * sa + g * (1 - sa)
        b = src.data[si + 2] * sa + b * (1 - sa)
      }
    }

    const oi = (y * W + x) * 4
    out[oi] = Math.round(r)
    out[oi + 1] = Math.round(g)
    out[oi + 2] = Math.round(b)
    out[oi + 3] = 255 // fully opaque
  }
}

fs.writeFileSync(OUT, encode(W, H, out))
console.log(`Wrote ${OUT} (${W}x${H})`)
