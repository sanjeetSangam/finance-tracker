import { createSlice } from "@reduxjs/toolkit";
import { addExpense, addIncome, deleteExpense, deleteIncome } from "../actions/dataCrudActions";

const initialState = {
	actionLoading: false,
	message: "",
	error: false,
	status: false,
	createIncome: false,
	createExpense: false,
	deleteRecord: false,
};

const dataCrudSlice = createSlice({
	name: "crud",
	initialState,
	reducers: {
		resetCrud(state) {
			state.status = false;
			state.error = false;
			state.createIncome = false;
			state.createExpense = false;
			state.deleteRecord = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addIncome.pending, (state) => {
				state.actionLoading = true;
				state.status = false;
				state.error = false;
				state.createIncome = false;
			})
			.addCase(addIncome.fulfilled, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.status = true;
				state.createIncome = true;
			})
			.addCase(addIncome.rejected, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.error = true;
				state.status = true;
				state.createIncome = true;
			})
			.addCase(addExpense.pending, (state) => {
				state.actionLoading = true;
				state.status = false;
				state.error = false;
				state.createExpense = false;
			})
			.addCase(addExpense.fulfilled, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.status = true;
				state.createExpense = true;
			})
			.addCase(addExpense.rejected, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.error = true;
				state.status = true;
				state.createExpense = true;
			})
			.addCase(deleteExpense.pending, (state) => {
				state.actionLoading = true;
				state.status = false;
				state.error = false;
				state.deleteRecord = false;
			})
			.addCase(deleteExpense.fulfilled, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.status = true;
				state.deleteRecord = true;
			})
			.addCase(deleteExpense.rejected, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.error = true;
				state.status = true;
				state.deleteRecord = true;
			})
			.addCase(deleteIncome.pending, (state) => {
				state.actionLoading = true;
				state.status = false;
				state.deleteRecord = false;
			})
			.addCase(deleteIncome.fulfilled, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.status = true;
				state.deleteRecord = true;
			})
			.addCase(deleteIncome.rejected, (state, action) => {
				state.actionLoading = false;
				state.message = action.payload;
				state.error = true;
				state.status = true;
				state.deleteRecord = true;
			});
	},
});

export const { resetCrud } = dataCrudSlice.actions;
export default dataCrudSlice.reducer;
