import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAggData } from "../../redux/actions/dataActions";
import DoughnutChart from "../../components/Doughnut/DoughnutChart";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { prepareChartData } from "../../utils/prepareChartData";
import { addExpense } from "../../redux/actions/dataCrudActions";
import { toast } from "react-toastify";
import { resetCrud } from "../../redux/slices/dataCrudSlice";
import nodata from "../../assets/nodata.png";
import { BasicContext } from "../../context";
import Loader from "react-js-loader";

const Expenses = () => {
	const dispatch = useDispatch();
	const { selectedMonth } = useContext(BasicContext);
	const { data, totalExpense, loading, dataLoaded } = useSelector((state) => state.data);
	const { createExpense, error } = useSelector((state) => state.dataCrud);
	const { expenses } = data;
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

	const addExpenseData = (event) => {
		event.preventDefault();
		dispatch(addExpense(inputFields));
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
			setChartData(prepareChartData(expenses));
		}
	}, [dataLoaded]);

	useEffect(() => {
		if (createExpense && !error) {
			toast.success("🦄 Success!");
			dispatch(getAggData(selectedMonth));
			dispatch(resetCrud());
		} else if (createExpense && error) {
			toast.error("Something went wrong!");
			dispatch(resetCrud());
		}
	}, [createExpense, selectedMonth]);

	if (loading)
		return (
			<div className="loader__className">
				<Loader
					type="bubble-loop"
					bgColor={"	#36454F"}
					color={"	#36454F"}
					title-color="	#36454F"
					loader-color="	#36454F"
					title={"Please Wait..."}
					size={100}
				/>
			</div>
		);

	return (
		<section>
			<div className="create__income form-chart">
				<form onSubmit={addExpenseData}>
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
						<option value="education">Education</option>
						<option value="groceries">Groceries</option>
						<option value="health">Health</option>
						<option value="subscriptions">Subscriptions</option>
						<option value="takeaways">Takeaways</option>
						<option value="clothing">Clothing</option>
						<option value="travelling">Travelling</option>
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
					<button disabled={loading} className="submit" type="submit">
						{loading ? "Adding Expense" : "Add Expense"}
					</button>
				</form>

				<div className="chart" style={{ width: "40%" }}>
					{expenses?.length > 0 ? (
						<DoughnutChart data={chartData} />
					) : (
						<div className="app-card no__data">
							<img className="nodata__img" src={nodata} />
							No Chart data
						</div>
					)}
				</div>
			</div>

			<div className="income__title">
				<p>
					Total Expense :{" "}
					<span className="amount expense">
						₹ <span className="">{totalExpense}</span>
					</span>
				</p>
			</div>

			<div className="content-section">
				<div className="content-section-title">Recent History</div>
				<ul>
					{expenses?.length > 0 ? (
						expenses.map((history) => (
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

export default Expenses;
