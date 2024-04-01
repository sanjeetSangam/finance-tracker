import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, registerUser } from "../actions/authActions";

const initialState = {
	loading: false,
	user: JSON.parse(localStorage.getItem("user")) || null,
	userId: JSON.parse(localStorage.getItem("user"))?.user?._id || null,
	token: JSON.parse(localStorage.getItem("user"))?.token || null,
	isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetUser(state) {
			state.user = null;
			state.userId = null;
			state.isAuthenticated = false;
			state.token = null;
		},
		resetError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.status) {
					state.user = action.payload;
					state.isAuthenticated = true;
					state.userId = action.payload?.user?._id;
					state.token = action.payload.token;
				} else {
					state.error = action.payload;
					state.isAuthenticated = false;
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			})
			.addCase(LoginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(LoginUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.status) {
					state.user = action.payload;
					state.isAuthenticated = true;
					state.userId = action.payload?.user?._id;
					state.token = action.payload.token;
				} else {
					state.error = action.payload;
					state.isAuthenticated = false;
				}
			})
			.addCase(LoginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			});
	},
});

export const { resetUser, resetError } = authSlice.actions;
export default authSlice.reducer;
