import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(process.cwd());
const releaseDir = resolve(root, "release");
const extensionZip = resolve(root, "extension", "dist", "yt-download-plus-extension.zip");
const releaseExtensionZip = resolve(releaseDir, "yt-download-plus-extension.zip");
const releaseSourceZip = resolve(releaseDir, "yt-download-plus-source.zip");

rmSync(releaseDir, { recursive: true, force: true });
mkdirSync(releaseDir, { recursive: true });

execFileSync("npm", ["run", "extension:zip"], { cwd: root, stdio: "inherit" });
copyFileSync(extensionZip, releaseExtensionZip);
execFileSync("git", ["archive", "--format=zip", `--output=${releaseSourceZip}`, "HEAD"], { cwd: root, stdio: "inherit" });

console.log("Release prête :");
console.log(`- ${releaseExtensionZip}`);
console.log(`- ${releaseSourceZip}`);
