module.exports = {
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, 'src'),
            'umi': require('path').resolve(__dirname, 'src/.umi/export'),
        }
    }
};
