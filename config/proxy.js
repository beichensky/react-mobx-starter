'use strict';

const proxy = {
    dev: {
        '/api': {
            changeOrigin: true,
            target: 'https://easy-mock.com/mock/5c2dc9665cfaa5209116fa40/example',
            pathRewrite: {
                '^/api/': '/'
            }
        }
    }
};

module.exports = proxy.dev;