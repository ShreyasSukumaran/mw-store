import { useContext } from 'react'
import { UserContext } from './UserContext'
import { AuthHandling } from '../../components/ApiRequests/Auth/AuthHandling'
import { useDialogTrigger } from '../../hooks/Dialog/useDialog'

export const useContent = () => {
	const { user, setUser } = useContext(UserContext)
	const triggerDialog = useDialogTrigger()

	const getUserDetails = () => {
		return user
	}

	const setUserDetails = async (user) => {
		setUser(user)

		console.log("SET USER DETAILS USER ", user)

		try {
			const response = await AuthHandling(user, 'profile-update');
			triggerDialog(response.message);
			sessionStorage.removeItem('user')
			sessionStorage.setItem('user', JSON.stringify(user));
			return response;
		} catch (error) {
			triggerDialog("An error occurred on updating profile, please try again later")
			return { error }
		}
	}

	return { getUserDetails, setUserDetails }
}
