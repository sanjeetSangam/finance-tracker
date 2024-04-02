import { useContext, useEffect } from "react";
import { BasicContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, deleteIncome } from "../../redux/actions/dataCrudActions";
import { getAggData } from "../../redux/actions/dataActions";
import { resetCrud } from "../../redux/slices/dataCrudSlice";
import { toast } from "react-toastify";
import "./ModalComp.scss";

const ModalComp = () => {
	const { setIsModalOpen, isModalOpen, setItemId, itemId, modalAction } =
		useContext(BasicContext);
	const { error, deleteRecord } = useSelector((state) => state.dataCrud);
	const dispatch = useDispatch();
	const closeModal = () => {
		setIsModalOpen(false);
		setItemId(null);
	};
	const handleModalSubmit = () => {
		if (modalAction === "income") {
			dispatch(deleteIncome({ recordId: itemId }));
		} else {
			dispatch(deleteExpense({ recordId: itemId }));
		}
	};

	useEffect(() => {
		if (deleteRecord && !error) {
			toast.success("🦄 Success!");
			dispatch(getAggData());
			dispatch(resetCrud());
			closeModal();
		} else if (deleteRecord && error) {
			closeModal();
			toast.error("Something went wrong!");
			dispatch(resetCrud());
		}
	}, [deleteRecord]);

	return (
		<>
			<div className={`${isModalOpen ? "pop-up visible" : "pop-up"}`}>
				<div className="pop-up__title">
					Delete
					<svg
						className="close"
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						onClick={closeModal}
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M15 9l-6 6M9 9l6 6" />
					</svg>
				</div>
				<div className="pop-up__subtitle">Are you sure you want to delete!</div>
				<div className="content-button-wrapper">
					<button
						onClick={handleModalSubmit}
						className="content-button status-button"
						style={{ background: "red" }}
						disabled={itemId === null}
					>
						Delete
					</button>
				</div>
			</div>

			<div className={`${isModalOpen ? "overlay-app is-active" : "overlay-app"}`}></div>
		</>
	);
};

export default ModalComp;
