//import { BsGithub, BsTwitter } from 'react-icons/bs'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Navigation = ({ formState }) => {
	return (
		<div className="container">
			<div className="container-fluid">
				<ul>
					<li>
						<a onClick={() => formState(false)} href="#">
							Login
						</a>
					</li>
					<li>
						<a onClick={() => formState(true)} href="#">
							Register
						</a>
					</li>
					<li>
						<Link to="/logout">Logout</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

Navigation.propTypes = {
	formState: PropTypes.func.isRequired,
}
