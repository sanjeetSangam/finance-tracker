import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../redux/actions/authActions";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputFields, setInputFields] = useState({
		userName: "",
		password: "",
	});
	const handleChange = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value });
	};

	const loginUser = async (event) => {
		event.preventDefault();
		try {
			await dispatch(LoginUser(inputFields));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login">
			<form onSubmit={loginUser}>
				<label htmlFor="userName">User Name</label>
				<input
					type="text"
					name="userName"
					required
					value={inputFields.userName}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={inputFields.password}
					onChange={(e) => {
						handleChange(e);
					}}
					required
				></input>
				<button type="submit">Login</button>
				<button type="button" onClick={() => navigate("/register")}>
					Register!
				</button>
			</form>
		</div>
	);
};

export default Login;
