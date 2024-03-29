import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import fallbackRender from "./utils/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "react-js-loader";

import Navbar from "./components/Navbar/Navbar";
const LazyHome = lazy(() => import("./pages/Home/Home"));
const LazyIncome = lazy(() => import("./pages/Income/Income"));
const LazyExpenses = lazy(() => import("./pages/Expenses/Expenses"));
const LazyRegister = lazy(() => import("./pages/Register/Register"));
const LazyLogin = lazy(() => import("./pages/Login/Login"));

function App() {

	return (
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={fallbackRender} onReset={() => {}}>
				<Suspense
					fallback={
						<div className="loader__class">
							<Loader
								type="bubble-loop"
								bgColor={"red"}
								color={"red"}
								title-color="red"
								loader-color="red"
								size={100}
							/>
						</div>
					}
				>
					<Routes>
						<Route path="/login" element={<LazyLogin />} />
						<Route path="/register" element={<LazyRegister />} />
						<Route
							element={
								<>
									<Navbar />
									<Outlet />
								</>
							}
						>
							<Route path="/" element={<LazyHome />} />
							<Route path="/incomes" element={<LazyIncome />} />
							<Route path="/expenses" element={<LazyExpenses />} />
						</Route>
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
