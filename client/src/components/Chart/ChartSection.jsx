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

const ChartSection = () => {
	const { data } = useSelector((state) => state.data);
	const { incomes, expenses } = data;
	const chartData = {
		labels: incomes.map((inc) => {
			const { date } = inc;
			const newDate = new Date(date);
			// let time =
			// 	newDate.getHours() > 12
			// 		? `${newDate.getHours() - 12}:${newDate.getMinutes()} PM`
			// 		: `${newDate.getHours()}:${newDate.getMinutes()} AM`;
			return newDate.toLocaleDateString();
		}),
		datasets: [
			{
				label: "Income",
				data: [
					...incomes.map((income) => {
						const { amount } = income;
						return amount;
					}),
				],
				backgroundColor: "green",
				tension: 0.2,
			},
			{
				label: "Expenses",
				data: [
					...expenses.map((expense) => {
						const { amount } = expense;
						return amount;
					}),
				],
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
