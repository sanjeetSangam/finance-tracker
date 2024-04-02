import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import "./ChartSection.scss";
import { useContext, useEffect, useState } from "react";
import { BasicContext } from "../../context";

const ChartSection = () => {
	const { data } = useSelector((state) => state.data);
	const { incomes, expenses } = data;
	const { selectedMonth } = useContext(BasicContext);
	const [dates, setDates] = useState([]);
	const [incomeAmounts, setIncomeAmounts] = useState([]);
	const [expenseAmounts, setExpenseAmounts] = useState([]);

	const updateDataMap = (data, type) => {
		let updatedDataMap = {};
		data.forEach((item) => {
			const date = item.date.split("T")[0];
			const amount = item.amount;

			if (updatedDataMap[date]) {
				updatedDataMap[date][type] += amount;
			} else {
				updatedDataMap[date] = { income: 0, expense: 0, [type]: amount };
			}
		});
		return updatedDataMap;
	};

	useEffect(() => {
		const updatedDataMap = updateDataMap(incomes, "income");
		const updatedDataMapWithExpenses = updateDataMap(expenses, "expense");

		const mergedDataMap = {};
		for (const key in updatedDataMap) {
			mergedDataMap[key] = updatedDataMap[key];
		}
		for (const key in updatedDataMapWithExpenses) {
			if (mergedDataMap[key]) {
				mergedDataMap[key].expense = updatedDataMapWithExpenses[key].expense;
			} else {
				mergedDataMap[key] = updatedDataMapWithExpenses[key];
			}
		}

		const sortedDates = Object.keys(mergedDataMap).sort();
		setDates(sortedDates);

		const updatedIncomeAmounts = sortedDates.map((date) => mergedDataMap[date].income);
		const updatedExpenseAmounts = sortedDates.map((date) => mergedDataMap[date].expense);
		setIncomeAmounts(updatedIncomeAmounts);
		setExpenseAmounts(updatedExpenseAmounts);
	}, [selectedMonth]);

	const chartData = {
		labels: dates,
		datasets: [
			{
				label: "Income",
				data: incomeAmounts,
				backgroundColor: "green",
				tension: 0.2,
			},
			{
				label: "Expenses",
				data: expenseAmounts,
				backgroundColor: "red",
				tension: 0.2,
			},
		],
	};
	return (
		<div className="chart__container">
			{incomes?.length > 0 || expenses?.length > 0 ? (
				<Line data={chartData} />
			) : (
				<div className=" no__data">No data</div>
			)}
		</div>
	);
};

export default ChartSection;
