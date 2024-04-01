import { createSlice } from "@reduxjs/toolkit";
import { getAggData } from "../actions/dataActions";

const initialState = {
	loading: false,
	data: { incomes: [], expenses: [] },
	dataLoaded: false,
	totalIncome: 0,
	totalExpense: 0,
	transactionHistory: [],
	totalBalance: 0,
	error: null,
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		resetData(state) {
			state.loading = false;
			state.data = { incomes: [], expenses: [] };
			state.totalIncome = 0;
			state.totalExpense = 0;
			state.transactionHistory = [];
			state.totalBalance = 0;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAggData.pending, (state) => {
				state.loading = true;
				state.dataLoaded = false;
			})
			.addCase(getAggData.fulfilled, (state, action) => {
				state.loading = false;
				const result = action.payload;
				state.data = result.data;
				state.transactionHistory = result.recentHistoryData;
				state.totalBalance = result.totalBalance;
				state.totalIncome = result.totalIncomes;
				state.totalExpense = result.totalExpenses;
				state.dataLoaded = true;
			})
			.addCase(getAggData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.dataLoaded = true;
			});
	},
});

export const { resetData } = dataSlice.actions;
export default dataSlice.reducer;
