import { defineConfig } from 'umi';

export default defineConfig({
    ssr: {
    },
    nodeModulesTransform: {
        type: 'none'
    }
});