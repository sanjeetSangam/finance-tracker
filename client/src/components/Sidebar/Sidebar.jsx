import Avatar from "react-avatar";
import "./Sidebar.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="left-side">
			<Avatar name={user?.user?.fullName} size="150" round={true} />
			<h3 className="side-title">{user?.user?.fullName}</h3>
		</div>
	);
};

export default Sidebar;
