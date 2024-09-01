import {
	Navigation,
	HomeComponent,
	DashboardComponent,
	ErrorComponent,
	MobileNavigation,
} from './components'
import { RegisterForm } from './components/Auth/RegisterForm'
import { LoginForm } from './components/Auth/LoginForm'
import { Logout } from './components/Auth/Logout'
import { ProfileComponent, ProfileComponentGateway } from './components/Profile'
import { Route, Navigate, Routes } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { DialogProvider } from './hooks/Dialog/DialogContext'
import { PromptProvider } from './hooks/Prompt/PromptContext'
import { UserProvider } from './hooks/UserContext/UserContext'

import Cookies from 'universal-cookie'
import AdminMobileNavigation from './components/Navigation/Admin/Mobile/AdminMobileNavigation'
import { AdminNavigation } from './components/Navigation/Admin/Desktop/AdminNavigation'
import AdminDashboardComponent from './components/Dashboard/AdminDashboard/AdminDashboard'
const cookies = new Cookies()

function App() {
	const token = cookies.get('TOKEN') ? cookies.get('TOKEN') : 'false'

	const isAdmin = sessionStorage.getItem('isAdmin');

	return (
		<>
			<UserProvider>
				<DialogProvider>
					<PromptProvider>
						{isMobile ?
							(isAdmin == 'true' ? <AdminMobileNavigation token={token} /> : <MobileNavigation token={token} />) :
							(isAdmin == 'true' ? <AdminNavigation token={token} /> : <Navigation token={token} />)
						}
						<Routes>
							<Route
								path="/"
								element={
									token == 'false' ? (
										<Navigate to="/login" />
									) : (
										<Navigate to="/home" />
									)
								}
							/>
							<Route
								path="/register"
								element={
									token == 'false' ? <RegisterForm /> : <Navigate to="/home" />
								}
							/>
							<Route
								path="/login"
								element={token == 'false' ? <LoginForm /> : <Navigate to="/home" />}
							/>
							<Route
								path="/home"
								element={
									token !== 'false' ? <HomeComponent /> : <Navigate to="/login" />
								}
							/>
							<Route path="/logout" element={<Logout />} />
							<Route
								path="/dashboard"
								element={
									token !== 'false' ? (
										(isAdmin == 'true' ? <AdminDashboardComponent /> :  <DashboardComponent />)
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route
								path="/password-change"
								element={<ProfileComponentGateway />}
							/>
							<Route
								path="/profile/*"
								element={
									token !== 'false' ? (
										<ProfileComponent />
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route path="/*" element={<ErrorComponent />} />
						</Routes>
					</PromptProvider>
				</DialogProvider>
			</UserProvider >
		</>
	)
}

export default App
