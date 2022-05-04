#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sade from 'sade'
import { build } from 'esbuild'
import git from 'git-rev-sync'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
)

const prog = sade('link.web3.storage')

prog
  .command('build')
  .describe('Build the worker.')
  .option('--env', 'Environment', process.env.ENV)
  .action(buildCmd)

async function buildCmd(opts) {
  console.log(`Building`)

  await build({
    entryPoints: [path.join(__dirname, '..', 'src', 'index.js')],
    bundle: true,
    format: 'esm',
    outfile: path.join(__dirname, '..', 'dist', 'worker.mjs'),
    legalComments: 'external',
    define: {
      VERSION: JSON.stringify(pkg.version),
      COMMITHASH: JSON.stringify(git.long(__dirname)),
      BRANCH: JSON.stringify(git.branch(__dirname)),
      global: 'globalThis',
    },
    minify: opts.env === 'dev' ? false : true,
    sourcemap: 'external',
  })
}

prog.parse(process.argv)
