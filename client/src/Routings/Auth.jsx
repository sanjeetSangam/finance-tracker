import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
const Auth = () => {
	return (
		<Routes>
			{/* <Route element={<div style={{ border: "1px solid red", height: "200px" }}></div>}> */}
			{/* <Route index element={<Navigate to="login" replace />} /> */}
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			{/* </Route> */}
		</Routes>
	);
};

export default Auth;
