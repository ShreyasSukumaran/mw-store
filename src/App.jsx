import { Navigation, HomeComponent, DashboardComponent } from './components'
import { RegisterForm } from './components/Auth/RegisterForm'
import { LoginForm } from './components/Auth/LoginForm'
import { Logout } from './components/Auth/Logout'
import { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import { ErrorComponent } from './components'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

function App() {
	const [register, setRegister] = useState(true);
	const token = cookies.get('TOKEN') ? cookies.get('TOKEN') : 'false';

	return (
		<>
			<Navigation token={token}/>
			<div className="body">
				<Routes>
					<Route
						path="/"
						element={token !== 'false' ? <Navigate to="/home" /> : <Navigate to="/auth" />}
					/>
					<Route
						path="/auth"
						element={token == 'false' ? 
							(register ? (
								<RegisterForm formState={setRegister} />
							) : (
								<LoginForm formState={setRegister} />
							)) : <Navigate to="/auth" />
						}
					/>
					<Route
						path="/home"
						element={token !== "false" ? <HomeComponent /> : <Navigate to="/auth" />}
					/>
					<Route path="/logout" element={<Logout />} />
					<Route
						path="/dashboard"
						element={token !== "false" ? <DashboardComponent /> : <Navigate to="/auth" />}
					/>
					<Route
						path="/*"
						element={<ErrorComponent />}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
