import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginRoute, registerRoute } from "../../routes/routes";

export const registerUser = createAsyncThunk(
	"auth/register",
	async (useDetails, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(registerRoute, useDetails);
			if (data.status) {
				localStorage.setItem("user", JSON.stringify(data));
			}
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error);
		}
	}
);

export const LoginUser = createAsyncThunk("auth/login", async (useDetails, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(loginRoute, useDetails);
		if (data.status) {
			localStorage.setItem("user", JSON.stringify(data));
		}
		return data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error);
	}
});
