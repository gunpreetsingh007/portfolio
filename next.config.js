/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // Produce a fully static site (`next build` emits ./out) so it can be hosted
  // on any static CDN like Cloudflare Pages with zero server runtime.
  output: "export",

  // next/image optimization requires a server; disable it for static export.
  images: {
    unoptimized: true,
  },

  transpilePackages: ["geist"],
};

export default config;
