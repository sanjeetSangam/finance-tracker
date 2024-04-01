import { useContext, useEffect, useRef, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { dateFormat } from "../../utils/dateFormatter";
import { BasicContext } from "../../context";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const HistoryCard = ({ dataItem }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { setIsModalOpen, setItemId, setModalAction } = useContext(BasicContext);
	const menuRef = useRef(null);

	const openDeleteModal = () => {
		setModalAction(dataItem.type);
		setItemId(dataItem._id);
		setIsModalOpen(true);
	};

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<li className="adobe-product">
			<div className="products">
				<RiMoneyDollarCircleFill size={25} color={dataItem.type === "income" ? "#5bc75b" : "red"}/>
				{dataItem.title}
			</div>

			<span className={dataItem.type === "income" ? "income status" : "expense status"}>
			₹ {dataItem.amount}
			</span>
			<span className="status">
				{/* <span className="status-circle green"></span> */}
				<MdDateRange />
				{dateFormat(dataItem.date)}
			</span>
			<span className="status" style={{ display: "flex", alignItems: "center" }}>
				<FaComment />
				{dataItem.desc}
			</span>
			<div className="button-wrapper" ref={menuRef}>
				<div
					className="menu__container"
					onClick={() => {
						setMenuOpen(!menuOpen);
					}}
				>
					<HiDotsHorizontal />
				</div>

				<button className={`${menuOpen ? "dropdown is-active " : "dropdown"}`}>
					<ul>
						{/* <li><FaRegEdit style={{ margin: "0" }} /> Edit</li> */}

						<li onClick={openDeleteModal}>
							<MdDelete style={{ margin: "0" }} /> Delete
						</li>
					</ul>
				</button>
			</div>
		</li>
	);
};

export default HistoryCard;
