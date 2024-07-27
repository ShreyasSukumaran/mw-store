import { Route, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
import PropTypes from 'prop-types'

export default function ProtectedRoutes({ element: Element, ...rest }) {
	return (
		<Route
			{...rest}
			element={props => {
				const token = cookies.get('TOKEN')

				if (token) {
					return <Element {...props} />
				} else {
					return (
						<Navigate
							to={{
								pathname: '/home',
								state: {
									from: props.path,
								},
							}}
						/>
					)
				}
			}}
		/>
	)
}

ProtectedRoutes.propTypes = {
	element: PropTypes.object.isRequired,
	path: PropTypes.string.isRequired,
}
