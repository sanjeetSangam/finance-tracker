import mongoose from "mongoose";

export const db = async (url) => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(url);
		console.log("DB Connection established");
	} catch (error) {
		console.log("DB connection error", error);
	}
};
