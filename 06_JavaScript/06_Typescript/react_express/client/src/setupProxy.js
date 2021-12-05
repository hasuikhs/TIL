import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = app => {
    app.use(
        createProxyMiddleware(
            ['/api'],
            {
                target: 'http://localhost:4000',
                changeOrigin: true,
                ws: true,
                router: {
                    '/api': 'http://localhost:4000'
                }
            }
        )
    );
}