import IncomeSchema from "../models/incomeModel.js";

const addIncome = async (req, res, next) => {
	try {
		const { title, amount, date, category, desc } = req.body;
		if (!title || !amount || !category || !desc) {
			return res.sendStatus(404);
		}

		const newIncome = {
			title,
			amount,
			category,
			desc,
			date,
			user: req.user._id,
		};

		let income = await IncomeSchema.create(newIncome);
		income = await income.populate("user", "fullName userName email");

		if (income) {
			return res.json(income).status(201);
		}

		return res.json({ message: "Failed to add income to the database" });
	} catch (error) {
		next(error);
	}
};

const getIncomes = async (req, res, next) => {
	try {
		let incomes = await IncomeSchema.find({ user: req.params.userId })
			.populate("user", "fullName userName email")
			.lean()
			.exec();

		return res.json(incomes).status(200);
	} catch (error) {
		next(error);
	}
};

const deleteIncome = async (req, res, next) => {
	try {
		const recordId = req.params.recordId;
		await IncomeSchema.findOneAndDelete({ _id: recordId });
		return res.json({ message: "Deleted Successfully" }).status(200);
	} catch (error) {
		next(error);
	}
};

export { addIncome, getIncomes, deleteIncome };
