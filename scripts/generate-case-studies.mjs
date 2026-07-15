// Scaffolds one Markdown case study per church from src/data/churches.json.
//
// This generates placeholder copy Emily can later replace with the real story.
// Re-run any time the church dataset changes:
//   node scripts/generate-case-studies.mjs
//
// Existing files are overwritten, so do not hand-edit generated files you want
// to keep until Emily has signed off on the real copy (this is scaffolding).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const churches = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/churches.json'), 'utf8'),
)
const outDir = path.join(root, 'src/content/case-studies')
fs.mkdirSync(outDir, { recursive: true })

function list(items) {
  if (items.length === 1) return items[0].toLowerCase()
  if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`
  const head = items.slice(0, -1).map((s) => s.toLowerCase()).join(', ')
  return `${head}, and ${items[items.length - 1].toLowerCase()}`
}

function yamlEscape(value) {
  return String(value).replace(/"/g, '\\"')
}

function body(c) {
  const work = list(c.workTypes)
  const lede =
    c.status === 'active'
      ? `${c.name} is one of the churches Emily designs for on an ongoing basis.`
      : `${c.name} partnered with Emily on a focused stretch of design work.`

  return `${lede} Based in ${c.location}, the team came to Create Church Media for the same reason most churches do: the weekend kept coming, the design didn't keep up, and the brand had started to drift across every surface.

## The challenge

Like a lot of growing churches, ${c.name} had capable people doing design in the margins of other jobs. Sermon art got built the week of. Social graphics came from whoever had a free hour. Over time, the church started to look like several different churches that happened to share a name. Nothing was wrong, exactly. It just wasn't pulling in one direction.

What they needed wasn't another tool. They needed one person who owned the look across everything and could keep it consistent week after week.

## What Emily designed

Emily took on ${work} for ${c.name}, building from a single visual system so each piece reinforced the next. The work covered the surfaces a congregation actually touches:

- A consistent treatment for sermon series art that carried from the stage to the app to the lock screen.
- Social graphics built on the same type and color decisions, so the feed looked like the church.
- Announcements and supporting collateral that stayed on-brand without slowing the comms team down.

Every request ran through the subscription, so the staff stopped scrambling and started planning. Instead of asking who could make the graphic, they asked what the series needed, and the design showed up looking like ${c.name}.

## The result

The most useful outcome is the one nobody notices: the church reads as one church now. A first-time guest sees the same identity on the invite, the screen, and the wall. The staff got their margins back, and the brand stopped depending on whoever was free that week.

> This is a scaffolded case study. Emily will replace this section with the specific story, the real timeline, and finished work from the ${c.name} archive.

If your church is fighting the same brand drift, the wait list is the place to start.
`
}

let written = 0
for (const c of churches) {
  const fm = [
    '---',
    `title: "${yamlEscape(`${c.name} — case study`)}"`,
    `church: "${yamlEscape(c.name)}"`,
    `slug: "${c.slug}"`,
    `location: "${yamlEscape(c.location)}"`,
    `status: "${c.status}"`,
    `engagement: "${yamlEscape(c.engagement)}"`,
    `image: "/church-logos/${c.slug}-black.png"`,
    `excerpt: "${yamlEscape(c.excerpt)}"`,
    'tags:',
    ...c.workTypes.map((t) => `  - "${yamlEscape(t)}"`),
    '---',
    '',
  ].join('\n')

  fs.writeFileSync(path.join(outDir, `${c.slug}.md`), fm + body(c) + '\n')
  written += 1
}

console.log(`Wrote ${written} case studies to ${path.relative(root, outDir)}`)
