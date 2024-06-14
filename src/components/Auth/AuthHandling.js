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
			throw new Error('Network response was not ok')
		}

		const result = await response.json()
		console.log(result.accessToken)

		window.location.href = '/dashboard'

		cookies.set('TOKEN', result.accessToken)
	} catch (error) {
		console.log(error)
	}
}
