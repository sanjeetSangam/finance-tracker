import { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/actions/authActions";
import { resetError } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
	const [intialMsg, setIntialMsg] = useState("Logging...");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, isAuthenticated, token } = useSelector((state) => state.auth);

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
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			toast.success("🦄 Login Success!");
			navigate("/");
			return;
		}
	}, [token]);

	useEffect(() => {
		setTimeout(() => {
			if (loading) setIntialMsg("Server is sleeping! Please wait...");
		}, 5000);
	}, [loading]);

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
					autoComplete="username"
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
					autoComplete="current-password"
					value={inputFields.password}
					onChange={(e) => {
						handleChange(e);
					}}
					required
				></input>
				<button disabled={loading} className="submit" type="submit">
					{loading ? intialMsg : "Login"}
				</button>
				{error && <p style={{ color: "red", marginBottom: "5px" }}>{error.message}</p>}
				<p
					type="button"
					style={{ textAlign: "center", cursor: "pointer" }}
					onClick={() => {
						dispatch(resetError());
						navigate("/auth/register");
					}}
				>
					Not have an account, Register!
				</p>
			</form>
		</div>
	);
};

export default Login;
