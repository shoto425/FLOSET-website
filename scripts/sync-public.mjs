import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const publicDir = join(root, "floset-app", "public")

const htmlFiles = [
  "index.html",
  "terms.html",
  "privacy.html",
  "contact.html",
  "tokushoho.html",
]

mkdirSync(publicDir, { recursive: true })

for (const file of htmlFiles) {
  cpSync(join(root, file), join(publicDir, file))
}

const assetsSrc = join(root, "assets")
const assetsDest = join(publicDir, "assets")
if (existsSync(assetsDest)) rmSync(assetsDest, { recursive: true, force: true })
cpSync(assetsSrc, assetsDest, { recursive: true })

console.log("Synced static site files to floset-app/public/")
