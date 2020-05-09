import express from "express";
import expressRequestId from "express-request-id";
import pingController from "@controllers/ping";

const router = express.Router();

const addRequestId = expressRequestId();
router.use('/', addRequestId);

router.get('/ping', pingController);

export default router;
