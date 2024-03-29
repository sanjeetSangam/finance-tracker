export const totalAmount = (data) => {
	let total = 0;
	data.forEach((item) => {
		total = total + item.amount;
	});

	return total;
};

export const transactionHistory = (data, stateData) => {
	const history = [...data, ...stateData];
	history.sort((a, b) => {
		return new Date(b.createdAt) - new Date(a.createdAt);
	});

	return history.slice(0, 5);
};

export const totalBalance = (income, expense) => {
	return income - expense;
};
