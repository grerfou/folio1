import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'rollup'

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '*.html',
          dest: '.'
        },
        {
            src: 'data',
            dest: '.'
        }
      ]
    })
  ]
})