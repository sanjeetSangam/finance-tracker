import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { db } from "./db/db.js";
import { userRouter } from "./routes/userRoute.js";
import { incomeRouter } from "./routes/incomeRoute.js";
import { expenseRouter } from "./routes/expenseRoute.js";
import { aggDataRouter } from "./routes/dataRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/agg", aggDataRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to Server!",
	});
});

const PORT = 8000;

const server = async () => {
	await db(process.env.MONGO_DB_URL);
	app.listen(PORT, () => {
		console.log("listening on port");
	});
};

server();
