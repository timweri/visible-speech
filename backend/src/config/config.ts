export default {
    connection: {
        port: process.env.CONNECTION_PORT || 3456,
    },
    distDir: "dist",
    maxRoom: 4, // Maximum number of rooms
    roomCapacity: 4,
};
