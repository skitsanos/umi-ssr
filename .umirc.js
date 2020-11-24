import {defineConfig} from 'umi';

export default defineConfig({
    ssr: {},
    nodeModulesTransform: {
        type: 'none'
    },
    devServer: {
        proxy: {
            '/rt': {
                ws: true,
                target: 'wss://echo.websocket.org',
                changeOrigin: true,
                pathRewrite: {'^/rt': ''}
            }
        }
    }
});