import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { aggregateData, getAllData } from "../controllers/dataController.js";

const aggDataRouter = express.Router();

aggDataRouter.get("/:userId", protect, getAllData);

export { aggDataRouter };
