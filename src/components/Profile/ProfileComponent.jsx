import '../Auth/Auth.scss'
import { ChangePassword } from './changePassword/ChangePassword'
import { Link, Route, Routes, useMatch } from 'react-router-dom'

export const ProfileComponent = () => {
	let match = useMatch('/profile/*');
	console.log(match);
	return (
		<div className="body">
			<div className="auth-container">
				<div>
					<h1>Profile Page</h1>
					<nav>
						<ul>
							<li>
								<Link to={`${match.pathname}/change-password`}>Order</Link>
							</li>
							{/*<li>
								<Link to={`${match.url}/addresses`}>Addresses</Link>
							</li>*/}
						</ul>
					</nav>
					<Routes>
						<Route path="/" element={<h3>Please select a sub-component.</h3>} />
						<Route path="change-password" element={<ChangePassword />} />
						{/*<Route path="addresses" element={<AddressComponent />} />*/}
					</Routes>
				</div>
			</div>
		</div>
	)
}
