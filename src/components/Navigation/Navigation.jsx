import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export const Navigation = ({token}) => {
	return (
		<div className="absolute top-0 left-0 w-100 content-center bg-white p-2">
			<ul className="flex gap-3">
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
