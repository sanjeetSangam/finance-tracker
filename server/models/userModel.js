import mongoose from "mongoose";

const User = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		userName: { type: String, required: true },
		email: { type: String, required: true, max: 50, unique: true },
		password: { type: String, required: true, min: 8 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const UserSchema = mongoose.model("user", User);
export default UserSchema;
