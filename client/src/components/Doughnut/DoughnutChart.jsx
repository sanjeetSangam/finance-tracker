import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
	const { dataset, background, chartLabels } = data;
	const config = {
		data: {
			datasets: [
				{
					data: dataset,
					borderColor: background,
					backgroundColor: background,
					hoverOffset: 4,
					borderRadius: 30,
					spacing: 10,
				},
			],
		},
		options: {
			cutout: 115,
		},
	};

	if (chartLabels) {
		config.data.labels = chartLabels;
	}
	return (
		<div>
			<Doughnut data={config.data} />
		</div>
	);
};

export default DoughnutChart;
