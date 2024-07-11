import { Link } from 'react-router-dom'

export const Navigation = () => {
	return (
		<div className="absolute top-0 left-0 w-100 content-center bg-white p-2">
			<ul className="flex gap-3">
				<li>
					<Link to="/logout">Logout</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
			</ul>
		</div>
	)
}
