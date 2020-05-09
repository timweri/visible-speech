import createLogger from "@controllers/utils/logger";
import express from "express";

const logger = createLogger(module);

export default async (req: express.Request, res: express.Response, next: Function) => {
    logger.setId(req.id);
    logger.info("Ping");
    res.status(200).send("OK");
    logger.info("200: OK");
};
