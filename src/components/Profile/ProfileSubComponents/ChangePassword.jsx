import { Input } from '../../Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import {
	password_validation,
	repeat_password_validation,
	old_password_validation,
} from '../../../utils/inputValidations'
import { AuthHandling } from '../../ApiRequests/Auth/AuthHandling'
import { InputError } from '../../Input/InputError'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import '../../Auth/Auth.scss'
import Cookies from 'universal-cookie'
import { useDialogTrigger } from '../../../hooks/Dialog/useDialog'

export const ChangePassword = () => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')
	const triggerDialog = useDialogTrigger()
	const tokenLogin = sessionStorage.getItem('tokenLogin')

	const onSubmit = methods.handleSubmit(async data => {
		let password = document.getElementById('password').value
		let repeatPassword = document.getElementById('repeat_password').value
		const cookies = new Cookies()
		data.id = cookies.get('ID')
		if (password === repeatPassword) {
			AuthHandling(data, 'password-update').then(response => {
				if (response.isUpdated) {
					triggerDialog('Password Updated Successfully')
				} else {
					setIsInvalid(true)
					setInputError(response.message)
				}
			})
		} else {
			setIsInvalid(true)
			setInputError('Please repeat the password')
		}
	})

	const setInvalidFalse = () => setIsInvalid(false)

	return (
		<div className="body">
			<div className="auth-container">
				<FormProvider {...methods}>
					<form
						onSubmit={e => e.preventDefault()}
						noValidate
						className="form-container"
					>
						<AnimatePresence mode="wait" initial={false}>
							{isInvalid && (
								<div className="form-error-container">
									<InputError message={inputError} key={inputError} />
								</div>
							)}
						</AnimatePresence>
						<div className="form-inputs">
							{!tokenLogin && (
								<>
									<h2 className='old-pass-text'>Old Passoword</h2>
									<Input
										{...old_password_validation}
										setInvalidFalse={setInvalidFalse}
									/>
									<h2 id='new-pass-text'>New Password</h2>
								</>
							)}
							<Input
								{...password_validation}
								setInvalidFalse={setInvalidFalse}
							/>
							<Input
								{...repeat_password_validation}
								setInvalidFalse={setInvalidFalse}
							/>
						</div>
						<div className="text-center form-submit">
							<div className="mt-5">
								<button
									onClick={onSubmit}
									className="btn btn-primary submit-btn"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
