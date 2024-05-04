import fs from 'fs'
import { transform } from '../transform.js'
import { fileURLToPath } from 'node:url'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const code = fs.readFileSync(path.join(__dirname, './code/entry.js'), 'utf8')

fs.writeFileSync(
  path.join(__dirname, './code/output.js'),
  transform(code),
  'utf8'
)
