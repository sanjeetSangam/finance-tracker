import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<nav>
			{/* <div className="logo">Logo</div> */}
			<ul className="nav__buttons">
				<li>
					<Link to={"/"}>Home</Link>
				</li>
				<li>
					<Link to={"/incomes"}>Income</Link>
				</li>
				<li>
					<Link to={"/expenses"}>Expenses</Link>
				</li>
			</ul>
			<div
				onClick={() => {
					localStorage.removeItem('user');
					navigate("/login");
				}}
				className=""
				style={{ cursor: "pointer" }}
			>
				Logout
			</div>
		</nav>
	);
};

export default Navbar;
