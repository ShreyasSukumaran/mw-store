import Cookies from 'universal-cookie'

export async function AuthHandling(data, type) {
	if (type == 'register') data.role = 'customer'
	const json = { ...data }
	const cookies = new Cookies()

	console.log('user data : ', data)

	try {
		const response = await fetch(`http://localhost:8081/${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(json),
		})

		if (!response.ok) {
			console.log('Error : ', response)
			throw new Error('Network response was not ok')
		}

		const result = await response.json()
		console.log(result.accessToken)

		if (type == 'login') {
			cookies.set('TOKEN', result.accessToken)
			window.location.href = '/dashboard'
		} else window.location.href = '/auth'
	} catch (error) {
		console.log(error)
	}
}
