import path from 'node:path'
import url from 'node:url'
import reactPlugin from '@vitejs/plugin-react'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src'),
    },
  },
  plugins: [reactPlugin()],
  build: {
    chunkSizeWarningLimit: 768,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: proxy => {
          proxy.on('proxyReq', (req) => {
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${req.method} ${req.path}' sent`)
          })
          proxy.on('proxyRes', (res, req) => {
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${req.method} ${req.url}' was proxy with response ${res.statusCode}`)
          })
        },
      },
    },
  },
})
