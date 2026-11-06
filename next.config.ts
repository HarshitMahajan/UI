import type { NextConfig } from "next";

// Static site: the pages and /r/*.json need no server, so any static host works.
const config: NextConfig = { output: "export" };

export default config;
