import { Navigation, HomeComponent, DashboardComponent } from './components'
import { RegisterForm } from './components/Auth/RegisterForm'
import { LoginForm } from './components/Auth/LoginForm'
import { Logout } from './components/Auth/Logout'
import { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

function App() {
	const [register, setRegister] = useState(true)
	const token = cookies.get('TOKEN')

	return (
		<>
			<Navigation />
			<div className="body">
				<Routes>
					<Route
						path="/"
						element={token ? <Navigate to="/home" /> : <Navigate to="/auth" />}
					/>
					<Route
						path="/auth"
						element={
							register && !token ? (
								<RegisterForm formState={setRegister} />
							) : (
								<LoginForm formState={setRegister} />
							)
						}
					/>
					<Route
						path="/home"
						element={token ? <HomeComponent /> : <Navigate to="/auth" />}
					/>
					<Route path="/logout" element={<Logout />} />
					<Route
						path="/dashboard"
						element={token ? <DashboardComponent /> : <Navigate to="/auth" />}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
