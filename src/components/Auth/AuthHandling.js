import Cookies from 'universal-cookie'

export async function AuthHandling(data, type) {
	if (type == 'register') data.role = 'customer'
	const json = { ...data }
	const cookies = new Cookies()

	console.log('user data : ', data)

	try {
		const response = await fetch(
			import.meta.env.VITE_API_ENDPOINT + `/${type}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(json),
			},
		)

		if (!response.ok) {
			console.log('Error : ', response)
			throw new Error('Network response was not ok')
		}

		const result = await response.json()
		console.log(result.accessToken)

		if (type == 'login') {
			const setCookieWithTimeout = (name, value, timeoutInSeconds) => {
				const expires = new Date()
				expires.setSeconds(expires.getSeconds() + timeoutInSeconds)

				cookies.set(name, value, { path: '/', expires })
			}

			// Example usage
			setCookieWithTimeout('TOKEN', result.accessToken, 10000) 
			window.location.href = '/dashboard'
		} else window.location.href = '/auth'
	} catch (error) {
		console.log(error)
	}
}
