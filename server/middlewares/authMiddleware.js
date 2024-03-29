import jwt from "jsonwebtoken";
import UserSchema from "../models/userModel.js";

const protect = async (req, res, next) => {
	let token;

	try {
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			try {
				token = req.headers.authorization.split(" ")[1];
				const decoded = jwt.verify(token, process.env.HASH_WORD);
				req.user = await UserSchema.findById(decoded.user._id).select("-password");
				next();
			} catch (error) {
				res.status(401);
				throw new Error("Not authorized, no token found");
			}
		}

		if (!token) {
			res.status(401);
			throw new Error("Not authorized, no token found");
		}
	} catch (error) {
		return res.send(error.message).status(400);
	}
};

export default protect;
