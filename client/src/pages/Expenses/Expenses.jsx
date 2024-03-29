import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, getExpenses } from "../../redux/actions/dataActions";
import { dateFormat } from "../../utils/dateFormatter";
import { MdDateRange } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const Expenses = () => {
	const dispatch = useDispatch();
	const { data, totalExpense } = useSelector((state) => state.data);
	const { expenses } = data;

	const [inputFields, setInputFields] = useState({
		title: "",
		amount: "",
		date: "",
		category: "",
		desc: "",
	});
	const { title, amount, date, category, desc } = inputFields;
	const handleChange = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value });
	};

	const addExpenseData = async (event) => {
		event.preventDefault();
		await dispatch(addExpense(inputFields));
		await dispatch(getExpenses());
	};

	useEffect(() => {
		const getExpenseData = async () => {
			await dispatch(getExpenses());
		};

		getExpenseData();
	}, []);

	return (
		<section>
			<p className="main__title">Expenses</p>

			<div className="income__title">
				<p>
					Total Expense :{" "}
					<span className="amount expense">
						$ <span className="">-{totalExpense}</span>
					</span>
				</p>
			</div>

			<div className="create_history">
				<div className="create__income">
					<form onSubmit={addExpenseData}>
						<input
							type="text"
							name="title"
							placeholder="Salary Title"
							required
							value={title}
							onChange={(e) => {
								handleChange(e);
							}}
						></input>
						<input
							type="number"
							name="amount"
							placeholder="Salary Amount"
							value={amount}
							onChange={(e) => {
								handleChange(e);
							}}
							required
						></input>
						<select
							required
							value={category}
							name="category"
							id="category"
							onChange={handleChange}
						>
							<option value="" disabled>
								Select Option
							</option>
							<option value="salary">Salary</option>
							<option value="freelancing">Freelancing</option>
							<option value="investments">Investiments</option>
							<option value="stocks">Stocks</option>
							<option value="bitcoin">Bitcoin</option>
							<option value="bank">Bank Transfer</option>
							<option value="youtube">Youtube</option>
							<option value="other">Other</option>
						</select>
						<input
							type="date"
							name="date"
							placeholder="Salary Amount"
							value={date}
							onChange={(e) => {
								handleChange(e);
							}}
							required
						></input>
						<input
							type="text"
							name="desc"
							placeholder="Add Desc"
							value={desc}
							onChange={(e) => {
								handleChange(e);
							}}
							required
						></input>
						<button className="submit" type="submit">
							Add Expense
						</button>
					</form>
				</div>

				<div className="income_lists">
					{expenses?.length > 0 &&
						expenses.map((expense) => {
							return (
								<div className="income__card card" key={expense._id}>
									<div className="details-logo">
										<div
											className=""
											style={{
												fontSize: "20px",
												color: "red",
												padding: "10px",
											}}
										>
											<FaMinusCircle />
										</div>
										<div className="details">
											<p className="income__label">{expense.title}</p>
											<div className="amounts__details">
												<p className="amount expense">
													${" "}
													<span className="expense">
														{expense.amount}
													</span>
												</p>
												<p className="date">
													<MdDateRange />
													{dateFormat(expense.date)}
												</p>
												<p className="desc">
													<FaComment />

													{expense.desc}
												</p>
											</div>
										</div>
									</div>
									<div className="delete">Delete</div>
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default Expenses;
