/**
 * This is a wrapper of the global logger object to
 * help add metadata of requests to logs.
 */

import createLogger from "@config/logger";

export default (module: NodeModule) => {
    const logger = createLogger(module);
    let id: string = '';
    const formatMessage = (msg: string) => {
        if (id != '') return `${id} ${msg}`;
        else return msg;
    };
    return {
        setId: (newId: string) => {
            id = newId;
        },
        info: (msg: string) => {
            logger.info(formatMessage(msg));
        },
        error: (msg: string) => {
            logger.error(formatMessage(msg));
        },
        debug: (msg: string) => {
            logger.debug(formatMessage(msg));
        },
        verbose: (msg: string) => {
            logger.verbose(formatMessage(msg));
        },
        warn: (msg: string) => {
            logger.warn(formatMessage(msg));
        },
    };
};