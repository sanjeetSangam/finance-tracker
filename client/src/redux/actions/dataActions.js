import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
	addIncomeRoute,
	getAggDataRoute,
	getExpenseRoute,
	getIncomeRoute,
} from "../../routes/routes";

export const getAggData = createAsyncThunk(
	"auth/aggData",
	async (param, { rejectWithValue, getState }) => {
		try {
			const { auth } = getState();
			const { token, userId } = auth;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					startDate: param.startDate,
					endDate: param.endDate,
				},
			};
			const { data } = await axios.get(`${getAggDataRoute}/${userId}`, config);
			return data;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

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
			console.error(error);
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
			console.error(error);
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
			console.error(error);
			return rejectWithValue(error);
		}
	}
);
