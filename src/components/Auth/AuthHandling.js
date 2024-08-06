import Cookies from 'universal-cookie';

export async function AuthHandling(data, type) {
    if (type === 'register') data.role = 'customer';
    const json = { ...data };
    const cookies = new Cookies();

    let token = cookies.get('TOKEN');
    console.log(`Bearer ${token}`);

    const headers = token
        ? {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
        : {
              'Content-Type': 'application/json',
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
            throw new Error('Network Error, Please try again later');
        }

        const result = await response.json();

        if (response.ok && result.accessToken) {
            const setCookieWithTimeout = (name, value, timeoutInSeconds) => {
                const expires = new Date();
                expires.setSeconds(expires.getSeconds() + timeoutInSeconds);
                cookies.set(name, value, { path: '/', expires });
            };

            setCookieWithTimeout('TOKEN', result.accessToken, 3600);
            if (data.email) setCookieWithTimeout('EMAIL', data.email, 3600);
            window.location.href = '/dashboard';
        } else {
            return result;
        }
    } catch (error) {
        console.error('Error:', error);
        return { error: 'An error occurred during the authentication process.' };
    }
}
