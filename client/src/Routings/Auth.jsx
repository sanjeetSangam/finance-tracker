import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
const Auth = () => {
	return (
		<div className="auth-container">
			<div className="auth-container-overlay"></div>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</div>
	);
};

export default Auth;
