
import path from 'path';

let config = {
    server: {
        port: process.env.PORT || 4008,
        host: 'localhost',
        apiPort: '3002',
        apiHost: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),
};

if (process.env.NODE_ENV === "production")
{
    config = {
        server: {
            port: process.env.PORT || 4008,
            host: '47.100.10.3',
            apiPort: '3002',
            apiHost: '47.100.10.3'
        },

        client: path.resolve(__dirname, '../src'),
        assets: path.resolve(__dirname, '../src/assets'),
        dist: path.resolve(__dirname, '../dist'),
    };
}
export default config;
