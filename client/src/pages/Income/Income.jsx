import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, getIncome } from "../../redux/actions/dataActions";
import { MdDateRange } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { dateFormat } from "../../utils/dateFormatter";
import { IoAddCircle } from "react-icons/io5";

const Income = () => {
	const dispatch = useDispatch();
	const { data, totalIncome, loading } = useSelector((state) => state.data);
	const { incomes } = data;

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

	const addIncomeData = async (event) => {
		event.preventDefault();
		await dispatch(addIncome(inputFields));
		await dispatch(getIncome());
	};

	useEffect(() => {
		const getIncomeData = async () => {
			await dispatch(getIncome());
		};

		getIncomeData();
	}, []);

	return (
		<section>
			<p className="main__title">Income</p>

			<div className="income__title">
				<p>
					Total Income :{" "}
					<span className="amount">
						$ <span>{totalIncome}</span>
					</span>
				</p>
			</div>

			<div className="create_history">
				<div className="create__income">
					<form onSubmit={addIncomeData}>
						<input
							type="text"
							name="title"
							placeholder="Title"
							required
							value={title}
							onChange={(e) => {
								handleChange(e);
							}}
						></input>
						<input
							type="number"
							name="amount"
							placeholder="Amount ($)"
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
							{loading ? "Adding Income" : "Add Income"}
						</button>
					</form>
				</div>

				<div className="income_lists">
					{incomes?.length > 0 &&
						incomes.map((income) => {
							return (
								<div className="income__card card" key={income._id}>
									<div className="details-logo">
										<div
											className=""
											style={{
												fontSize: "20px",
												color: "green",
												padding: "10px",
											}}
										>
											<IoAddCircle />
										</div>
										<div className="details">
											<p className="income__label">{income.title}</p>
											<div className="amounts__details">
												<p className="amount">
													$ <span>{income.amount}</span>
												</p>
												<p className="date">
													<MdDateRange />
													{dateFormat(income.date)}
												</p>
												<p className="desc">
													<FaComment />

													{income.desc}
												</p>
											</div>
										</div>
									</div>
									{/* <div className="delete">Delete</div> */}
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default Income;
