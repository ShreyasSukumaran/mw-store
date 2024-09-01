import Cookies from 'universal-cookie'

export async function AdminAccess(data, type) {
	if (type === 'register') data.role = 'customer'

	const json = { ...data }
	const cookies = new Cookies()
	const getMethods = ['get-all-seller']
	const putMethods = ['verify-seller', 'deactivate-seller']

	let method = getMethods.includes(type)
		? 'GET'
		: putMethods.includes(type)
			? 'PUT'
			: 'POST'

	let token = cookies.get('TOKEN')
	const headers = {
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` }),
	}

	try {
		let response = ''
		if (method == 'POST') {
			response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/${type}`, {
				method,
				headers,
				body: JSON.stringify(json),
			})
		} else if (['GET', 'PUT'].includes(method)) {
			response = await fetch(
				`${import.meta.env.VITE_API_ENDPOINT}/${type ? type + '/' : ''}${data.id ? data.id : ''}`,
				{
					method,
					headers,
				},
			)
		} else {
			return false
		}

		if (!response.ok) {
			throw new Error(
				`Network Error: ${response.status} ${response.statusText}`,
			)
		}

		const result = await response.json()

		return result
	} catch (error) {
		console.error('Error:', error)
		return { error: 'An error occurred during the authentication process.' }
	}
}
