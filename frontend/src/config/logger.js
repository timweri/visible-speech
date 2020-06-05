import winston from "winston";
import appRootPath from "app-root-path";
import path from "path";

export default (module) => {
    const relativePath = path.relative(appRootPath.toString(), module.filename);

    const logFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
            info => `${info.timestamp} ${info.level} [${relativePath}]: ${info.message}`,
        ),
    );

    const options = {
        file: {
            level: 'info',
            filename: `logs/info.log`,
            handleExceptions: true,
            format: logFormat,
            timestamp: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        },
        console: {
            level: 'debug',
            handleExceptions: true,
            format: logFormat,
            colorize: true,
        },
    };
    
    return winston.createLogger({
        transports: [
            new winston.transports.File(options.file),
            new winston.transports.Console(options.console),
        ],
    });
};
