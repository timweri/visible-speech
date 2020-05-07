import winston from "winston";

const options = {
    file: {
        level: 'info',
        filename: `logs/info.log`,
        handleExceptions: true,
        format: winston.format.json(),
        timestamp: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: winston.format.simple(),
        colorize: true,
    },
};

