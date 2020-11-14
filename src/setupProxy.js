/* eslint-disable @typescript-eslint/no-var-requires */

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    onProxyRes(proxyRes, req) {
      console.log(`Request '${req.method} ${req.path}' was proxy with response ${proxyRes.statusCode}`)
    },
  }))
}
