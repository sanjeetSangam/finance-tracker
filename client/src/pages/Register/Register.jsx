import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { registerUser } from "../../redux/actions/authActions";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.auth.loading);

	const [inputFields, setInputFields] = useState({
		userName: "",
		password: "",
		fullName: "",
		email: "",
	});
	const handleChange = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value });
	};

	const Register = async (event) => {
		event.preventDefault();
		try {
			await dispatch(registerUser(inputFields));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="register">
			<form onSubmit={Register}>
				<label htmlFor="fullName">Full Name</label>
				<input
					type="text"
					name="fullName"
					required
					value={inputFields.fullName}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
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
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					required
					value={inputFields.email}
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
				<button type="submit">Register</button>
				<button type="button" onClick={() => navigate("/login")}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Register;
