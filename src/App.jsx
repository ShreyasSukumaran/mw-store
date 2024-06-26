import { Navigation, HomeComponent, DashboardComponent } from './components'
import { RegisterForm } from './components/Auth/RegisterForm'
import { LoginForm } from './components/Auth/LoginForm'
import { Logout } from './components/Auth/Logout'
import { useState } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'

import Cookies from 'universal-cookie'
//import ProtectedRoutes from './components/ProtectedRouter'
const cookies = new Cookies()

function App() {
	const [register, setRegister] = useState(true)
	const token = cookies.get('TOKEN')

	return (
		<div>
			<Navigation formState={setRegister} />
			<Routes>
				<Route
					path="/"
					element={token ? <Navigate to="/home" /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/auth"
					element={
						register ? (
							<RegisterForm formState={setRegister} />
						) : (
							<LoginForm formState={setRegister} />
						)
					}
				/>
				<Route path="/home" element={<HomeComponent />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/dashboard" element={<DashboardComponent />} />
			</Routes>
		</div>
	)
}

export default App
