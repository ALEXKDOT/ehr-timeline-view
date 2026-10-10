import fs from "node:fs";
import path from "node:path";

const root = path.resolve("standalone-build");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g, (_, href) => {
  const css = fs.readFileSync(path.resolve(root, href.replace(/^\.\//, "")), "utf8");
  return `<style>${css}</style>`;
});
html = html.replace(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/g, (_, src) => {
  const js = fs.readFileSync(path.resolve(root, src.replace(/^\.\//, "")), "utf8");
  return `<script type="module">${js.replace(/<\/script/gi, "<\\/script")}</script>`;
});
fs.mkdirSync("docs", { recursive: true });
fs.mkdirSync("standalone-dist", { recursive: true });
fs.writeFileSync("docs/index.html", html);
fs.writeFileSync("docs/.nojekyll", "");
fs.writeFileSync("standalone-dist/Clancy_Clinical_Timeline.html", html);
console.log("Built GitHub Pages and standalone clinical prototype.");
