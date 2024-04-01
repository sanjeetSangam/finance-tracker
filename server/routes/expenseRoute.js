import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { addExpense, deleteExpense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/add-expense", protect, addExpense);
expenseRouter.delete("/delete-expense/:recordId", protect, deleteExpense);
expenseRouter.get("/:userId", protect, getExpenses);

export { expenseRouter };
