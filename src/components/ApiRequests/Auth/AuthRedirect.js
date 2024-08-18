import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { AuthHandling } from './AuthHandling';

const useAuthRedirect = () => {
	const location = useLocation();
    const navigate = useNavigate(); 
	
    useEffect(() => {
		const cookies = new Cookies();
		const queryParams = new URLSearchParams(location.search);
		
        const token = queryParams.get('token');
        const email = queryParams.get('email');

        if (token && email) {
            AuthHandling({ token, email }, 'token-check').then(response => {
                if (response.isLogin) {
                    const setCookieWithTimeout = (name, value, timeoutInSeconds) => {
                        const expires = new Date();
                        expires.setSeconds(expires.getSeconds() + timeoutInSeconds);
                        cookies.set(name, value, { path: '/', expires });
                    };

                    setCookieWithTimeout('TOKEN', token, 3600);
                    setCookieWithTimeout('EMAIL', email, 3600);
                    navigate('/profile/password-update');
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [location, navigate]);
};

export default useAuthRedirect;
