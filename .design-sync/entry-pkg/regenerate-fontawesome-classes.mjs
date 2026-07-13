/**
 * Regenerate fontawesome-classes.css from src/assets/fontawesome/.../all.css:
 * 1. Strip every @font-face (fonts ship via fontawesome-fonts.css + extraFonts).
 * 2. Annotate each --fa-* custom property with /* @kind other *\/ for Claude Design token export.
 *
 * Run from repo root: node .design-sync/entry-pkg/regenerate-fontawesome-classes.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(dirname, '../..')
const sourcePath = path.join(
  repoRoot,
  'src/assets/fontawesome/v6.5.1/css/all.css'
)
const outPath = path.join(dirname, 'fontawesome-classes.css')

const header = `/* GENERATED for design-sync — src/assets/fontawesome/v6.5.1/css/all.css with
 * every @font-face block stripped (fonts ship separately via fontawesome-fonts.css
 * + cfg.extraFonts). Each --fa-* variable tagged /* @kind other *\\/ for Claude
 * Design token export. Regenerate after an FA version bump:
 *   node .design-sync/entry-pkg/regenerate-fontawesome-classes.mjs
 * See .design-sync/NOTES.md.
 */

`

const source = fs.readFileSync(sourcePath, 'utf8')
let stripped = source.replace(/@font-face\s*\{[^}]*\}/g, '')

stripped = stripped.replace(
  /(--fa-[a-z0-9-]+:[^;{}]+;)/gi,
  '$1 /* @kind other */'
)
stripped = stripped.replace(
  /(--fa-[a-z0-9-]+:[^;{}]+)(?=[}.])/gi,
  '$1 /* @kind other */'
)

fs.writeFileSync(outPath, header + stripped)
console.log(`Wrote ${outPath} (${fs.statSync(outPath).size} bytes)`)
