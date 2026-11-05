import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // the library is a symlinked workspace package outside this app's folder
  turbopack: { root: path.join(import.meta.dirname, "../..") },
};

export default config;
