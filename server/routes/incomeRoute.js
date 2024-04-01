import express from "express";
import { addIncome, deleteIncome, getIncomes } from "../controllers/incomeController.js";
import protect from "../middlewares/authMiddleware.js";
import { aggregateData, getAllData } from "../controllers/dataController.js";

const incomeRouter = express.Router();

incomeRouter.post("/add-income", protect, addIncome);
incomeRouter.get("/:userId", protect, getIncomes);
incomeRouter.get("/agg/:userId", protect, getAllData);
incomeRouter.delete("/delete-income/:recordId", protect, deleteIncome);

export { incomeRouter };
