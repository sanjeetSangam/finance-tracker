import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addExpenseRoute, addIncomeRoute, getExpenseRoute, getIncomeRoute } from "../../routes/routes";

export const getIncome = createAsyncThunk(
	"auth/income",
	async (param, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token, userId } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(`${getIncomeRoute}/${userId}`, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const getExpenses = createAsyncThunk(
	"auth/expense",
	async (param, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token, userId } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(`${getExpenseRoute}/${userId}`, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

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