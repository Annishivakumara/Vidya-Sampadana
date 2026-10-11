import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        headers: {
          'x-vidya-proxy-hop': '1',
        },
        bypass: (req, res) => {
          if (
            req.headers['x-vidya-proxy-hop'] ||
            req.headers.host === 'localhost:3000'
          ) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(
              JSON.stringify({
                message: 'API Gateway (port 8080) is currently offline.',
              })
            )
            return false
          }
        },
        configure: (proxy) => {
          queueMicrotask(() => {
            proxy.removeAllListeners('error')
            proxy.on('error', (_err, _req, res) => {
              if (res && !res.headersSent && typeof res.writeHead === 'function') {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(
                  JSON.stringify({
                    message: 'API Gateway (port 8080) is currently offline.',
                  })
                )
              }
            })
          })
        },
      },
    },
  },
})
