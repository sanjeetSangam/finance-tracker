import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions/authActions";
import Loader from "react-js-loader";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
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
					name="userName"
					placeholder="User Name"
					required
					value={inputFields.userName}
					onChange={(e) => {
						handleChange(e);
					}}
				></input>
				<input
					placeholder="Password"
					type="password"
					name="password"
					value={inputFields.password}
					onChange={(e) => {
						handleChange(e);
					}}
					required
				></input>
				<button className="submit" type="submit">
				{isLoading ? (
						<Loader
							type="spinner-default"
							bgColor={"white"}
							color={"white"}
							size={100}
						/>
					) : (
						"Login"
					)}
				</button>
				<p
					type="button"
					style={{ textAlign: "center", cursor: "pointer" }}
					onClick={() => navigate("/register")}
				>
					Not have an account, Register!
				</p>
			</form>
		</div>
	);
};

export default Login;
