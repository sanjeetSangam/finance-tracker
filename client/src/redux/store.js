import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";

const persistConfig = {
	key: "root",
	storage,
};

export const store = configureStore({
	reducer: {
		auth: authReducer,
		data: dataReducer,
	},
});
