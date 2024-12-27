// src/pages/api/videoProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://heartoss.xn--vuqw0e54ixuh2wab7xjjnvyb7x0m.online',
  changeOrigin: true,
  pathRewrite: {
    '^/api/video': '/video.mp4', // 将请求路径重写为目标路径
  },
});