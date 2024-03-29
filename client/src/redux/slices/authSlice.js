import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, registerUser } from "../actions/authActions";

const initialState = {
	loading: false,
	user: null,
	userId: JSON.parse(localStorage.getItem("user"))?.user?._id || null,
	token: JSON.parse(localStorage.getItem("user"))?.token || null,
	isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
				state.userId = action.payload.user._id;
				state.token = action.payload.token;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			})
			.addCase(LoginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(LoginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
				state.userId = action.payload.user._id;
				state.token = action.payload.token;
			})
			.addCase(LoginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			});
	},
});

export default authSlice.reducer;
