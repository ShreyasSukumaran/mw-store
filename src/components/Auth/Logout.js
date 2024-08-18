import Cookies from 'universal-cookie'

export function Logout() {
	const cookies = new Cookies()
	cookies.remove('TOKEN')
	cookies.remove('ID')
	sessionStorage.clear()
	if (cookies.get('TOKEN')) {
		cookies.remove('TOKEN')
		window.location.href = "/logout"
	} else {
		window.location.href = '/'
	}
}
