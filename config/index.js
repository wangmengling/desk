
import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 4008,
        host: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),
};

export default config;
