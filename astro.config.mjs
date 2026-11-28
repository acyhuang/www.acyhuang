import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

// Run outside Vite. The config loader's module runner closes before build
// hooks finish, and that runner cannot host sharp.
function linkPreviews() {
  const script = fileURLToPath(new URL('./src/lib/link-previews.ts', import.meta.url))
  return {
    name: 'link-previews',
    hooks: {
      'astro:build:start': () => generateLinkPreviews(script),
      'astro:server:setup': () => generateLinkPreviews(script),
    },
  }
}

function generateLinkPreviews(script) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['--experimental-strip-types', script], {
      cwd: fileURLToPath(new URL('.', import.meta.url)),
      stdio: 'inherit',
      env: process.env,
    })
    child.on('error', (error) => {
      console.warn(`[link-previews] skipped, build continues: ${error.message}`)
      resolve()
    })
    child.on('exit', (code) => {
      if (code !== 0) console.warn(`[link-previews] generator exited ${code}; build continues`)
      resolve()
    })
  })
}

export default defineConfig({
  integrations: [mdx(), linkPreviews()],
  vite: {
    plugins: [tailwindcss()],
  },
})
