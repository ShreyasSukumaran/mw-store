import Cookies from 'universal-cookie';

export async function AuthHandling(data, type) {
	if (type === 'register') data.role = 'customer';

	const json = { ...data };
	const cookies = new Cookies();

	let token = cookies.get('TOKEN');
	const headers = {
		'Content-Type': 'application/json',
		...(token && { Authorization: `Bearer ${token}` }),
	};


	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_ENDPOINT}/${type}`,
			{
				method: 'POST',
				headers,
				body: JSON.stringify(json),
			}
		);

		if (!response.ok) {
			throw new Error(
				`Network Error: ${response.status} ${response.statusText}`
			);
		}

		const result = await response.json();

		if (type === 'token-check') {
			return response.ok && result.isLogin
				? { error: false, ...result }
				: { error: true, ...result };
		}

		if (response.ok && result.accessToken) {
			setAuthCookies(cookies, result.accessToken, 3600);
			setAuthCookies(cookies, result.id, 3600, 'ID');
			storeUserInSession(result.user);


			window.location.href = type === 'token-check' ? '/profile/password-update' : '/dashboard'

			//return { isLogin: true, redirectTo: type === 'token-check' ? '/profile/password-update' : '/dashboard' };
		} else {
			return result;
		}
	} catch (error) {
		console.error('Error:', error);
		return { error: 'An error occurred during the authentication process.' };
	}
}

const setAuthCookies = (cookies, value, timeoutInSeconds, name = 'TOKEN') => {
	const expires = new Date();
	expires.setSeconds(expires.getSeconds() + timeoutInSeconds);
	cookies.set(name, value, { path: '/', expires, secure: true, sameSite: 'Strict' });
};

export const storeUserInSession = (user) => {
	sessionStorage.setItem('user', JSON.stringify(user));
	Object.keys(user).forEach(key => {
		sessionStorage.setItem(key, user[key]);
	});
};
