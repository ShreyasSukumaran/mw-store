import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie';

import { UserRequest } from '../../components/ApiRequests/User/UserRequest'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

	const [user, setUser] = useState(() => {
        const savedUser = JSON.parse(sessionStorage.getItem('user'));
        return savedUser || {};
    });

	useEffect(() => {
        const fetchUser = async () => {
            const cookies = new Cookies();
            const id = cookies.get('ID');
            if (id && !sessionStorage.getItem('user')) {
                try {
                    const fetchedUser = await UserRequest({ id }, 'get-user');
                    setUser(fetchedUser || {});
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
        };

        fetchUser();
    }, []);

	useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
