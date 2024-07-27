import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import "./Navigation.css";

export const Navigation = ({token}) => {
	return (
		<div className="navigation-container">
			<ul className="flex-gap">
				<li>
					{token !== "false" && <Link to="/logout">Logout</Link>}
				</li>
				<li>
					{token !== "false" && <Link to="/dashboard">Dashboard</Link>}
				</li>
				<li>
					{token !== "false" && <Link to="/home">Home</Link>}
				</li>
			</ul>
		</div>
	)
}

Navigation.propTypes = {
	token: PropTypes.string,
};
