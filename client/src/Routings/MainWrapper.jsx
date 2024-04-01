import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "../utils/ErrorBoundary";
import { Suspense } from "react";
import Loader from "react-js-loader";
import { ToastContainer } from "react-toastify";
import ModalComp from "../components/ModalComp/ModalComp";

const MainWrapper = () => {
	return (
		<div className="app">
			<Navbar />
			<div className="wrapper">
				<Sidebar />
				<div className="main-container">
					<div className="header-menu">
						<Link
							className={
								location.pathname === "/" ? "menu-link is-active" : "menu-link"
							}
							to={"/"}
						>
							Home
						</Link>
						<Link
							className={
								location.pathname.startsWith("/incomes")
									? "menu-link is-active"
									: "menu-link"
							}
							to={"/incomes"}
						>
							Income
						</Link>
						<Link
							className={
								location.pathname.startsWith("/expenses")
									? "menu-link is-active"
									: "menu-link"
							}
							to={"/expenses"}
						>
							Expenses
						</Link>
					</div>
					<div className="content-wrapper" id="scrollableDiv">
						<ErrorBoundary FallbackComponent={fallbackRender} onReset={() => {}}>
							<Suspense
								fallback={
									<div className="loader__className">
										<Loader
											type="bubble-loop"
											bgColor={"green"}
											color={"green"}
											title-color="green"
											loader-color="green"
											size={100}
										/>
									</div>
								}
							>
								<Outlet />
							</Suspense>
						</ErrorBoundary>
					</div>
				</div>
			</div>

			<ModalComp />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition:Bounce
			/>
		</div>
	);
};

export default MainWrapper;
