import esbuild from 'esbuild'

import fs from 'fs'
import * as fspath from 'path'

function walk(path, process) {
  const files = fs.readdirSync(path)
  for (const file of files) {
    const fullpath = fspath.join(path, file)
    const stats = fs.statSync(fullpath)
    if (stats.isDirectory())
      walk(fullpath, process)
    else if (file.includes(".ts"))
      process(fullpath)
  }
}

function build(file) {
  esbuild
    .build({
      entryPoints: [file],
      bundle: false,
      sourcemap: true,
      format: 'esm',
      outdir: 'lib/mjs',
      target: ['esnext']
    })
}

walk('src/ts', build)