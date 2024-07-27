import Cookies from 'universal-cookie'

export async function AuthHandling(data, type) {
	if (type == 'register') data.role = 'customer'
	const json = { ...data }
	const cookies = new Cookies()

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
			throw new Error('Network Error, Please try again later');
		}

		const result = await response.json()
		if (response.ok && result.accessToken) {
			if (type == 'login') {
				const setCookieWithTimeout = (name, value, timeoutInSeconds) => {
					const expires = new Date()
					expires.setSeconds(expires.getSeconds() + timeoutInSeconds)

					cookies.set(name, value, { path: '/', expires })
				}

				setCookieWithTimeout('TOKEN', result.accessToken, 86400) 
				window.location.href = '/dashboard'
			} else window.location.href = '/auth'
		} else {
			return result;
		}
	} catch (error) {
		console.log(error)
	}
}
