import Cookies from 'universal-cookie'
import { storeUserInSession } from '../Auth/AuthHandling'

export async function UserRequest(data, type) {
	const json = { ...data }
	const cookies = new Cookies()

	let token = cookies.get('TOKEN')
	const getMethods = ['get-user', 'get-seller']

	let method = getMethods.includes(type) ? 'GET' : 'POST'


	const headers = token
		? {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}
		: {
				'Content-Type': 'application/json',
			}

	try {

		let response = '';
		if (method == 'POST') {
			response = await fetch(
				`${import.meta.env.VITE_API_ENDPOINT}/${type}`,
				{
					method,
					headers,
					body: JSON.stringify(json),
				},
			)
		} else if (method == 'GET' && data.id) {
			response = await fetch(
				`${import.meta.env.VITE_API_ENDPOINT}/${type ? type+'/' : ''}${data.id ? data.id : ''}`,
				{
					method,
					headers,
				},
			)
		} else {
			return false;
		}
		if (!response.ok) {
			throw new Error('Network Error, Please try again later')
		}

		const result = await response.json()


		if (type == 'get-user') {
			console.log("USER DETAILS : ".result)
			storeUserInSession(result)
		}

		return result
	} catch (error) {
		console.error('Error:', error)
		return { error: 'An error occurred during the authentication process.' }
	}
}
