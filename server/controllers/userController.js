import UserSchema from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const newToken = (user) => {
	return jwt.sign({ user: user }, process.env.HASH_WORD);
};

const register = async (req, res, next) => {
	try {
		const { fullName, email, password, userName } = req.body;
		const userNameCheck = await UserSchema.findOne({ userName });
		if (userNameCheck) {
			return res.json({ message: "UserName already used", status: false });
		}
		const emailNameCheck = await UserSchema.findOne({ email });
		if (emailNameCheck) {
			return res.json({ message: "Email already used", status: false });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await UserSchema.create({
			fullName,
			email,
			userName,
			password: hashedPassword,
		});

		const token = newToken(user);

		const userWithoutPassword = {
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			userName: user.userName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		return res.json({ status: true, user: userWithoutPassword, token });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { userName, password } = req.body;
		const user = await UserSchema.findOne({ userName });
		if (!user) {
			return res.json({ status: false, message: "User does not exist!" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.json({
				status: false,
				message: "Incorrect Password! Please try with correct password",
			});
		}

		const token = newToken(user);
		const userWithoutPassword = {
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			userName: user.userName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		return res.json({ status: true, user : userWithoutPassword, token });
	} catch (error) {
		next(error);
	}
};

export { login, register };
