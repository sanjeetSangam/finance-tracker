export const getRandomColor = () => {
	const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
	const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
	return randomRGB();
};

export const prepareChartData = (data) => {
	const dataset = [];
	const chartLabels = [];
	const background = [];
	data &&
		data?.forEach((item) => {
			dataset.push(item.amount);
			chartLabels.push(item.category);
			background.push(getRandomColor());
		});

	return { dataset, chartLabels, background };
};
