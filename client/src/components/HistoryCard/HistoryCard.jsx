import { useContext, useEffect, useRef, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { FaComment, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { dateFormat } from "../../utils/dateFormatter";
import { BasicContext } from "../../context";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import "./HistoryCard.scss";

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
		<li className="history__card">
			<div className="title__logo">
				<RiMoneyDollarCircleFill
					size={25}
					color={dataItem.type === "income" ? "#5bc75b" : "red"}
				/>
			</div>

			<div className="title__card">
				<p>{dataItem.title}</p>

				<div className="card__info">
					<span className={dataItem.type === "income" ? "income " : "expense "}>
						₹ {dataItem.amount}
					</span>
					<span className="">
						<MdDateRange style={{ margin: "0" }} />
						{dateFormat(dataItem.date)}
					</span>
					<span className="desc" style={{ display: "flex", alignItems: "center" }}>
						<FaComment style={{ margin: "0" }} />
						{dataItem.desc}
					</span>
				</div>
			</div>

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
						<li><FaRegEdit style={{ margin: "0" }} /> Edit</li>

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
