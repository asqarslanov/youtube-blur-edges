import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";

import * as manifest from "./manifest";

export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      browser: "firefox",
      manifest: manifest.generate,
      watchFilePaths: ["package.json", "manifest.json"],
    }),
  ],
});
