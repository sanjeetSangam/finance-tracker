import React, { useEffect } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExpenses, getIncome } from "../../redux/actions/dataActions";
import ChartSection from "../../components/Chart/ChartSection";
import { MdDateRange } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { dateFormat } from "../../utils/dateFormatter";

const Home = () => {
	const { auth, data } = useSelector((state) => state);
	const { isAuthenticated } = auth;
	const { transactionHistory, totalIncome, totalExpense, totalBalance } = data;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}
		const getData = async () => {
			await dispatch(getIncome());
			await dispatch(getExpenses());
		};

		getData();
	}, []);
	return (
		<section>
			<div className="home__container">
				<div className="chart__total-details">
					<ChartSection />

					<div className="total__details">
						<div className="total__income ">
							<p>Total Income</p>
							<h1 className="income">
								$ <span>{totalIncome}</span>
							</h1>
						</div>
						<div className="total__expense">
							<p>Total Expense</p>
							<h1 className="expense">
								$ <span>-{totalExpense}</span>
							</h1>
						</div>
						<div className="total__balance">
							<p>Total Balance</p>
							<h1 className={totalBalance < 0 ? "expense" : "balance"}>
								$ <span>{totalBalance}</span>
							</h1>
						</div>
					</div>
				</div>

				<div className="recent__history">
					<h2>Recent History</h2>
					{transactionHistory?.length > 0 &&
						transactionHistory.map((history, i) => (
							<div className="income__card card" key={history._id}>
								<div className="details-logo">
									<div
										className=""
										style={{
											fontSize: "20px",
											color: "green",
											padding: "10px",
											border: "1px solid",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											borderRadius: "5px",
										}}
									>
										<FaHistory />
									</div>
									<div className="details">
										<p className="income__label">{history.title}</p>
										<div className="amounts__details">
											<p className="amount expense">
												$ <span className="expense">{history.amount}</span>
											</p>
											<p className="date">
												<MdDateRange />
												{dateFormat(history.date)}
											</p>
											<p className="desc">
												<FaComment />

												{history.desc}
											</p>
										</div>
									</div>
								</div>
								<div className="delete">Delete</div>
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default Home;
