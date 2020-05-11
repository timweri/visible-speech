export default {
    server: {
        host: process.env.SERVER_HOST || 'http://localhost',
        port: process.env.SERVER_PORT || 3456,
        apiPath: process.env.SERVER_API_PATH || '/api/v1',
        roomSocketPath: process.env.SERVER_ROOM_SOCKET_PATH || '/room',
    },
    distDir: 'dist',
};
