// Usage:
//   node record.mjs --list               list available flows
//   node record.mjs aut-profile ai-chat  record specific flows
//   node record.mjs "fg-*"               record every flow whose id starts with fg-
//   node record.mjs --all                record every flow (except the smoke test)
//   add --headed to watch the browser while it records
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { record, RECORDER_DIR } from './lib/recorder.mjs'

try {
  process.loadEnvFile(path.join(RECORDER_DIR, '.env'))
} catch {}

const args = process.argv.slice(2)
const headed = args.includes('--headed')
const names = args.filter((a) => !a.startsWith('--'))

const flowsDir = path.join(RECORDER_DIR, 'flows')
const flows = []
for (const file of (await readdir(flowsDir)).filter((f) => f.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(path.join(flowsDir, file)))
  flows.push(mod.default)
}

if (args.includes('--list') || (!names.length && !args.includes('--all'))) {
  console.log('Flows:')
  for (const f of flows) console.log(`  ${f.id.padEnd(22)} → ${f.output}.webm${f.title ? `  (${f.title})` : ''}`)
  process.exit(0)
}

const prefixes = names.filter((n) => n.endsWith('*')).map((n) => n.slice(0, -1))
const selected = args.includes('--all') ? flows.filter((f) => !f.smokeTest) : prefixes.length ? flows.filter((f) => prefixes.some((p) => f.id.startsWith(p))) : names.map((n) => {
  const f = flows.find((f) => f.id === n)
  if (!f) throw new Error(`Unknown flow "${n}". Run with --list.`)
  return f
})

let failed = 0
for (const flow of selected) {
  process.stdout.write(`● ${flow.id} … `)
  try {
    const { webm, duration } = await record(flow, { headed })
    console.log(`ok ${duration}  ${path.relative(process.cwd(), webm)}`)
  } catch (err) {
    failed++
    console.log('FAILED')
    console.error(err)
  }
}
process.exit(failed ? 1 : 0)
