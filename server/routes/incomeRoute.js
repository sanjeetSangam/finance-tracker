import express from "express";
import { addIncome, getIncomes } from "../controllers/incomeController.js";
import protect from "../middlewares/authMiddleware.js";

const incomeRouter = express.Router();

incomeRouter.post("/add-income", protect, addIncome);
incomeRouter.get("/:userId", protect, getIncomes);

export { incomeRouter };
