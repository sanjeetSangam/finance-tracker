import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BasicContext } from "./context";
import { useSelector } from "react-redux";
import Auth from "./Routings/Auth";
import Authenticated from "./Routings/Authenticated";
import Bubble from "./components/Bubble/Bubble";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [itemId, setItemId] = useState(null);
	const [modalAction, setModalAction] = useState(null);
	const [selectedMonth, setSelectedMonth] = useState({ startDate: null, endDate: null });
	const [lineChartDates, setLineChartDates] = useState([]);
	const navigate = useNavigate();

	const loggedOuts = ["/auth/login", "/auth/register"];

	useEffect(() => {
		if (!isAuthenticated && !loggedOuts.includes(window.location.pathname)) {
			navigate("/auth/login");
			return;
		}
	}, []);

	return (
		<BasicContext.Provider
			value={{
				setIsModalOpen,
				isModalOpen,
				itemId,
				setItemId,
				modalAction,
				setModalAction,
				selectedMonth,
				setSelectedMonth,
				lineChartDates,
				setLineChartDates,
			}}
		>
			<Bubble />
			<Routes>
				<Route path="/auth/*" element={<Auth />} />
				<Route path="/*" element={<Authenticated />} />
			</Routes>
		</BasicContext.Provider>
	);
}

export default App;
