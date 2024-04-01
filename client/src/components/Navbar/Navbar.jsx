import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { resetData } from "../../redux/slices/dataSlice";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import { useContext, useEffect, useState } from "react";
import { BasicContext } from "../../context";
import "./Navbar.scss";

const Navbar = () => {
	const [selectedMonthData, setSelectedMonthData] = useState({
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	});
	const { setSelectedMonth } = useContext(BasicContext);
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
		setSelectedMonth({ startDate, endDate });
		return { startDate, endDate };
	}

	useEffect(() => {
		getDateRange(selectedMonthData);
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
						style={{ fontSize: "30px", cursor: "pointer" }}
						onClick={() => {
							localStorage.removeItem("user");
							dispatch(resetUser());
							dispatch(resetData());
							navigate("/auth/login");
						}}
					/>
					{/* <img
						className="profile-img"
						src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
						alt=""
					/> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
