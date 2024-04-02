import { useSelector } from "react-redux";
import ChartSection from "../../components/Chart/ChartSection";
import DoughnutChart from "../../components/Doughnut/DoughnutChart";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import Loader from "react-js-loader";
import nodata from "../../assets/nodata.png";
import homeImage from "../../assets/home_png.png";
import "./Home.scss";

const Home = () => {
	const { transactionHistory, totalIncome, totalExpense, totalBalance, loading } = useSelector(
		(state) => state.data
	);

	const totalExpenseChartData = {
		dataset: [totalIncome, totalExpense],
		background: ["rgb(8, 78, 136)", "rgb(230, 87, 22)"],
		chartLabels: ["Total Income", "Total Expense"],
	};
	const totalBalanceChartData = {
		dataset: [totalIncome, totalBalance],
		background: ["rgb(8, 78, 136)", "rgb(112, 2, 103)"],
		chartLabels: ["Total Income", "Total Balance"],
	};

	if (loading)
		return (
			<div className="loader__className">
				<Loader
					type="bubble-loop"
					bgColor={"	#36454F"}
					color={"	#36454F"}
					title-color="	#36454F"
					loader-color="	#36454F"
					title={"Please wait..."}
					size={100}
				/>
			</div>
		);

	return (
		<section>
			<div className="home__container">
				<div className="content-wrapper-header">
					<ChartSection />
					<img className="content-wrapper-img" src={homeImage} alt="" />
				</div>

				<div className="content-section">
					<div className="content-section-title">Amount Explore</div>
					<div className="apps-card">
						<div className="app-card">
							{totalExpense > 0 || totalIncome > 0 ? (
								<DoughnutChart data={totalExpenseChartData} />
							) : (
								<div className="no__data">
									{" "}
									<img className="nodata__img" src={nodata} /> No Expense Graph
								</div>
							)}

							<div className="app-card-buttons">
								<button
									className="content-button status-button"
									style={{ background: "red" }}
								>
									Expense
								</button>
							</div>
						</div>
						<div className="app-card">
							<div className="summary__details">
								<div
									className="app-card no__data"
									style={{ color: "#5bc75b", fontWeight: "700" }}
								>
									Total Income : ₹ {totalIncome}
								</div>
								<div
									className="app-card no__data"
									style={{ color: "red", fontWeight: "700" }}
								>
									Total Expense : ₹ {totalExpense}
								</div>
								<div
									className="app-card no__data"
									style={{
										color: `${totalBalance < 0 ? "red" : "#5bc75b"}`,
										fontWeight: "700",
									}}
								>
									Total Balance : ₹ {totalBalance}
								</div>
							</div>

							<div className="app-card-buttons">
								<button
									className="content-button status-button"
									style={{ background: "#5bc75b" }}
								>
									Summary
								</button>
							</div>
						</div>
						<div className="app-card">
							{totalExpense > 0 || totalIncome > 0 ? (
								<DoughnutChart data={totalBalanceChartData} />
							) : (
								<div className="no__data">
									<img className="nodata__img" src={nodata} />
									No Balance Graph
								</div>
							)}

							<div className="app-card-buttons">
								<button
									className="content-button status-button"
									style={{ background: "rgb(112, 2, 103)" }}
								>
									Balance
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="content-section">
					<div className="content-section-title">Recent History</div>
					<ul>
						{transactionHistory?.length > 0 ? (
							transactionHistory.map((history) => (
								<HistoryCard dataItem={history} key={history?._id} />
							))
						) : (
							<div className="no__records">No Data yet</div>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Home;
