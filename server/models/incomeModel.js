import mongoose from "mongoose";

const Income = new mongoose.Schema(
	{
		title: { type: String, required: true },
		amount: { type: Number, required: true },
		date: { type: Date, required: true },
		category: { type: String, required: true },
		desc: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		type: { type: String, default: "income" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const IncomeSchema = mongoose.model("income", Income);
export default IncomeSchema;
