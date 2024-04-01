import { lazy, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainWrapper from "./MainWrapper";
import { getAggData } from "../redux/actions/dataActions";
import { BasicContext } from "../context";
import { useDispatch } from "react-redux";
const LazyHome = lazy(() => import("../pages/Home/Home"));
const LazyIncome = lazy(() => import("../pages/Income/Income"));
const LazyExpenses = lazy(() => import("../pages/Expenses/Expenses"));

const Authenticated = () => {
	const { selectedMonth } = useContext(BasicContext);
	const dispatch = useDispatch();
	useEffect(() => {
		const getData = (selectedMonthData) => {
			dispatch(getAggData(selectedMonthData));
		};
		if (selectedMonth.startDate) {
			getData(selectedMonth);
		}
	}, [selectedMonth]);
	return (
		<Routes>
			<Route element={<MainWrapper />}>
				<Route path="" element={<LazyHome />} />
				<Route path="incomes" element={<LazyIncome />} />
				<Route path="expenses" element={<LazyExpenses />} />
			</Route>
		</Routes>
	);
};

export default Authenticated;
