import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { registerUser } from "../../redux/actions/authActions";
import Loader from "react-js-loader";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);

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
				<h3
					style={{
						textAlign: "center",
						marginBottom: "20px",
						textTransform: "uppercase",
					}}
				>
					My Financial App
				</h3>
				<input
					type="text"
					name="fullName"
					placeholder="Full Name"
					required
					value={inputFields.fullName}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
				<input
					type="text"
					name="userName"
					placeholder="User Name"
					required
					value={inputFields.userName}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
				<input
					type="email"
					name="email"
					placeholder="Email Address"
					required
					value={inputFields.email}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
				<input
					type="password"
					name="password"
					placeholder="password"
					value={inputFields.password}
					onChange={(e) => {
						handleChange(e);
					}}
					required
				></input>
				<button disabled={isLoading} className="submit" type="submit">
					{isLoading ? (
						<Loader
							type="spinner-default"
							bgColor={"white"}
							color={"white"}
							size={100}
						/>
					) : (
						"Register"
					)}
				</button>
				<p
					type="button"
					style={{ textAlign: "center", cursor: "pointer" }}
					onClick={() => navigate("/login")}
				>
					Already have an account, Login!
				</p>
			</form>
		</div>
	);
};

export default Register;
