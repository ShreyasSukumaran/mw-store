import Cookies from 'universal-cookie'

export function Logout() {
	const cookies = new Cookies()
	cookies.remove('TOKEN')
	window.location.href = '/'
}
