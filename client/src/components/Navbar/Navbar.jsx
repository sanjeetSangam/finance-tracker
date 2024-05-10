import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { resetData } from "../../redux/slices/dataSlice";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import { useContext, useEffect, useState } from "react";
import { BasicContext } from "../../context";
import "./Navbar.scss";
import { getAggData } from "../../redux/actions/dataActions";

const Navbar = () => {
	const [selectedMonthData, setSelectedMonthData] = useState({
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const { setSelectedMonth, setLineChartDates } = useContext(BasicContext);
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function getDateRange(monthData) {
		const { month, year } = monthData;
		let startMonth = month;
		let startYear = year;
		let endMonth, endYear;

		if (month === 12) {
			endMonth = 1;
			endYear = year + 1;
		} else {
			endMonth = month + 1;
			endYear = year;
		}

		const startDate = new Date(startYear, startMonth - 1, 1);
		const endDate = new Date(endYear, endMonth - 1, 1);
		const dates = { startDate, endDate };
		setSelectedMonth(dates);
		dispatch(getAggData(dates));
		return dates;
	}

	useEffect(() => {
		getDateRange(selectedMonthData);
		setLineChartDates(selectedMonthData);
	}, [selectedMonthData]);

	return (
		<nav>
			<div className="header">
				<div className="menu-circle"></div>
				<div className="header-menu">
					<h3 className="menu-link-main">My Financial Tracker</h3>
				</div>
				<div className="header-profile">
					<div className="calender__custom">
						<MonthInput
							selected={selectedMonthData}
							setShowMonthPicker={setIsPickerOpen}
							showMonthPicker={isPickerOpen}
							size="small"
							bgColor="#36454F"
							textColor="white"
							bgColorHover="#353935"
						/>
						{isPickerOpen ? (
							<MonthPicker
								setIsOpen={setIsPickerOpen}
								selected={selectedMonthData}
								onChange={setSelectedMonthData}
								size="small"
								bgColorPicker="#36454F"
								textColor="white"
								bgColorMonthHover="#023020"
							/>
						) : null}
					</div>
					<RiLogoutBoxRLine
						title="Logout"
						style={{ fontSize: "30px", cursor: "pointer", color: "var(--theme-color)" }}
						onClick={() => {
							localStorage.removeItem("user");
							dispatch(resetUser());
							dispatch(resetData());
							navigate("/auth/login");
						}}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
