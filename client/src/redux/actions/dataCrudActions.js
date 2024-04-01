import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
	addExpenseRoute,
	addIncomeRoute,
	deleteExpenseRoute,
	deleteIncomeRoute,
} from "../../routes/routes";

export const addIncome = createAsyncThunk(
	"auth/add-income",
	async (incomeDetails, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.post(`${addIncomeRoute}`, incomeDetails, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const addExpense = createAsyncThunk(
	"auth/add-expense",
	async (expenseDetails, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.post(`${addExpenseRoute}`, expenseDetails, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const deleteExpense = createAsyncThunk(
	"auth/delete-expense",
	async (expenseDetails, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.delete(
				`${deleteExpenseRoute}/${expenseDetails.recordId}`,
				config
			);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const deleteIncome = createAsyncThunk(
	"auth/delete-income",
	async (incomeDetails, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.delete(
				`${deleteIncomeRoute}/${incomeDetails.recordId}`,
				config
			);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);
