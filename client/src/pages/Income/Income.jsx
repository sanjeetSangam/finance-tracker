import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAggData } from "../../redux/actions/dataActions";
import DoughnutChart from "../../components/Doughnut/DoughnutChart";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { prepareChartData } from "../../utils/prepareChartData";
import { addIncome } from "../../redux/actions/dataCrudActions";
import { resetCrud } from "../../redux/slices/dataCrudSlice";
import { toast } from "react-toastify";
import nodata from "../../assets/nodata.png";
import { BasicContext } from "../../context";
import Loader from "react-js-loader";
import "./Income.scss";

const Income = () => {
	const dispatch = useDispatch();
	const { selectedMonth } = useContext(BasicContext);
	const { data, totalIncome, loading, dataLoaded } = useSelector((state) => state.data);
	const { createIncome, error, actionLoading } = useSelector((state) => state.dataCrud);
	const { incomes } = data;
	const [inputFields, setInputFields] = useState({
		title: "",
		amount: "",
		date: "",
		category: "",
		desc: "",
	});
	const [chartData, setChartData] = useState({});
	const { title, amount, date, category, desc } = inputFields;
	const handleChange = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value });
	};

	const addIncomeData = (event) => {
		event.preventDefault();
		if (loading) return;
		dispatch(addIncome(inputFields));
		setInputFields({
			title: "",
			amount: "",
			date: "",
			category: "",
			desc: "",
		});
	};

	useEffect(() => {
		if (dataLoaded) {
			setChartData(prepareChartData(incomes));
		}
	}, [dataLoaded]);

	useEffect(() => {
		if (createIncome && !error) {
			toast.success("🦄 Success!");
			dispatch(getAggData(selectedMonth));
			dispatch(resetCrud());
		} else if (createIncome && error) {
			toast.error("Something went wrong!");
			dispatch(resetCrud());
		}
	}, [createIncome]);

	if (loading)
		return (
			<div className="loader__className">
				<Loader
					type="bubble-loop"
					bgColor={"	#36454F"}
					color={"	#36454F"}
					title-color="	#36454F"
					loader-color="	#36454F"
					title={"{Please wait..."}
					size={100}
				/>
			</div>
		);

	return (
		<section>
			<div className="create__income form-chart">
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
						placeholder="Amount (₹)"
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
					<button className="submit" type="submit" disabled={actionLoading}>
						{actionLoading ? "Adding Income" : "Add Income"}
					</button>
				</form>

				<div className="chart" style={{ width: "40%" }}>
					{incomes?.length > 0 ? (
						!loading && <DoughnutChart data={chartData} />
					) : (
						<div className="app-card no__data">
							{" "}
							<img className="nodata__img" src={nodata} /> No Chart data
						</div>
					)}
				</div>
			</div>

			<div className="income__title">
				<p>
					Total Income :{" "}
					<span className="amount">
						₹ <span>{totalIncome}</span>
					</span>
				</p>
			</div>

			<div className="content-section">
				<div className="content-section-title">Recent History</div>
				<ul>
					{incomes?.length > 0 ? (
						incomes.map((history) => (
							<HistoryCard dataItem={history} key={history?._id} />
						))
					) : (
						<div className="no__records">No Data yet</div>
					)}
				</ul>
			</div>
		</section>
	);
};

export default Income;
