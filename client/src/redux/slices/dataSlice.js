import { createSlice } from "@reduxjs/toolkit";
import { getIncome, getExpenses, addIncome, addExpense } from "../actions/dataActions";
import { totalAmount, totalBalance, transactionHistory } from "../../utils/totalAmount";

const initialState = {
	loading: false,
	data: { incomes: [], expenses: [] },
	totalIncome: 0,
	totalExpense: 0,
	transactionHistory: [],
	totalBalance: 0,
	error: null,
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getIncome.pending, (state) => {
				state.loading = true;
			})
			.addCase(getIncome.fulfilled, (state, action) => {
				state.loading = false;
				state.data.incomes = action.payload;
				state.totalIncome = totalAmount(action.payload);
				state.transactionHistory = transactionHistory(
					action.payload,
					state.transactionHistory
				);
				state.totalBalance = totalBalance(state.totalIncome, state.totalExpense);
			})
			.addCase(getIncome.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getExpenses.pending, (state) => {
				state.loading = true;
			})
			.addCase(getExpenses.fulfilled, (state, action) => {
				state.loading = false;
				state.data.expenses = action.payload;
				state.totalExpense = totalAmount(action.payload);
				state.transactionHistory = transactionHistory(
					action.payload,
					state.transactionHistory
				);
				state.totalBalance = totalBalance(state.totalIncome, state.totalExpense);
			})
			.addCase(getExpenses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addIncome.pending, (state) => {
				state.loading = true;
			})
			.addCase(addIncome.fulfilled, (state, action) => {
				state.loading = false;
				state.data.incomes = action.payload;
			})
			.addCase(addIncome.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addExpense.pending, (state) => {
				state.loading = true;
			})
			.addCase(addExpense.fulfilled, (state, action) => {
				state.loading = false;
				state.data.expenses = action.payload;
			})
			.addCase(addExpense.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default dataSlice.reducer;
