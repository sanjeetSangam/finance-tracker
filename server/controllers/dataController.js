import ExpenseSchema from "../models/expenseModel.js";
import IncomeSchema from "../models/incomeModel.js";

const getAllData = async (req, res, next) => {
	try {
		const { startDate, endDate } = req.query;
		let dateQuery = {};

		if (startDate && endDate) {
			dateQuery = {
				date: {
					$gte: startDate,
					$lt: endDate,
				},
			};
		}
		const incomes = await IncomeSchema.find({
			user: req.params.userId,
			...dateQuery,
		})
			.sort({ date: -1 })
			.populate("user", "fullName userName email")
			.lean()
			.exec();

		const expenses = await ExpenseSchema.find({
			user: req.params.userId,
			...dateQuery,
		})
			.sort({ date: -1 })
			.populate("user", "fullName userName email")
			.lean()
			.exec();

		const allData = [...incomes, ...expenses];

		const data = {
			incomes,
			expenses,
		};

		const recentHistoryData = allData
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 5);

		let totalBalance = 0;
		let totalIncomes = 0;
		let totalExpenses = 0;

		allData.forEach((item) => {
			if (item.amount) {
				if (item.type === "income") {
					totalIncomes += item.amount;
				} else if (item.type === "expense") {
					totalExpenses += item.amount;
				}
			}
		});
		totalBalance = totalIncomes - totalExpenses;

		return res
			.json({
				data,
				recentHistoryData,
				totalBalance,
				totalIncomes,
				totalExpenses,
			})
			.status(200);
	} catch (error) {
		next(error);
	}
};

const aggregateData = async (req, res, next) => {
	try {
		const userId = req.params.userId;

		const combinedData = await IncomeSchema.aggregate([
			{
				$match: { user: userId }, // Filter by the specific userId
			},
			{
				$lookup: {
					from: "expenses",
					localField: "user",
					foreignField: "user",
					as: "result",
				},
			},
			{
				$unwind: "$result",
			},
		]);

		// Do further processing if needed, such as storing the result in an array
		const resultArray = combinedData.map((item) => ({
			type: item.type,
			amount: item.amount,
			date: item.date,
		}));

		return res.json(combinedData).status(200);

		// Now you can do whatever you want with the resultArray
	} catch (error) {
		console.error("Error while aggregating data:", error);
	}
};

export { aggregateData, getAllData };
