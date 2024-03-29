import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/add-expense", protect, addExpense);
expenseRouter.get("/:userId", protect, getExpenses);

export { expenseRouter };
