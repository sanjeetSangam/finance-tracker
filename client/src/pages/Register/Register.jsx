import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { registerUser } from "../../redux/actions/authActions";
import { resetError } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, token, isAuthenticated } = useSelector((state) => state.auth);

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
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			toast.success("🦄 User Created Successfully");
			navigate("/");
			return;
		}
	}, [token]);

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
					autoComplete
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
					autoComplete
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
					autoComplete
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
					autoComplete
					value={inputFields.password}
					onChange={(e) => {
						handleChange(e);
					}}
					required
				></input>
				<button disabled={loading} className="submit" type="submit">
					{loading ? "Creating new user..." : "Register"}
				</button>
				{error && <p style={{ color: "red", marginBottom: "5px" }}>{error.message}</p>}
				<p
					type="button"
					style={{ textAlign: "center", cursor: "pointer" }}
					onClick={() => {
						dispatch(resetError());
						navigate("/auth/login");
					}}
				>
					Already have an account, Login!
				</p>
			</form>
		</div>
	);
};

export default Register;
