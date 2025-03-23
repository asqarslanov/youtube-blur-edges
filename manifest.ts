import { readJsonFile } from "vite-plugin-web-extension";

export function generate(): any {
  const pkg = readJsonFile("package.json");

  return {
    manifest_version: 3,
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "96": "icon/96.png",
      "128": "icon/128.png",
    },
    action: {
      // default_popup: "src/popup.html",
    },
    background: {
      "{{chrome}}.service_worker": "src/background.ts",
      "{{firefox}}.scripts": ["src/background.ts"],
    },
    permissions: ["scripting", "activeTab"],
  };
}
