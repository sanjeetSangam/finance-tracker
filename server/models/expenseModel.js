import mongoose from "mongoose";

const Expense = new mongoose.Schema(
	{
		title: { type: String, required: true },
		amount: { type: Number, required: true },
		date: { type: Date, required: true },
		category: { type: String, required: true },
		desc: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const ExpenseSchema = mongoose.model("expense", Expense);
export default ExpenseSchema;
