import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  plugins: [reactRefresh()],
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
