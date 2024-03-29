import ExpenseSchema from "../models/expenseModel.js";

const addExpense = async (req, res, next) => {
	try {
		const { title, amount, date, category, desc } = req.body;
		if (!title || !amount || !category || !desc) {
			return res.sendStatus(404);
		}

		const newExpense = {
			title,
			amount,
			category,
			desc,
			date,
			user: req.user._id,
		};

		let expense = await ExpenseSchema.create(newExpense);
		expense = await expense.populate("user", "fullName userName email");

		if (expense) {
			return res.json(expense).status(201);
		}

		return res.json({ msg: "Failed to add expense to the database" });
	} catch (error) {
		next(error);
	}
};

const getExpenses = async (req, res, next) => {
	try {
		let expenses = await ExpenseSchema.find({ user: req.params.userId })
			.populate("user", "fullName userName email")
			.lean()
			.exec();

		return res.json(expenses).status(200);
	} catch (error) {
		next(error);
	}
};

export { addExpense, getExpenses };
