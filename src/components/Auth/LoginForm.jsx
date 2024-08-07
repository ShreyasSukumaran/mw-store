import { Input } from '../Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import {
	email_validation,
	password_validation,
} from '../../utils/inputValidations'
import { AuthHandling } from './AuthHandling'
import { InputError } from '../Input/InputError'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.scss'
import { useEffect } from 'react'
import { useDialogTrigger } from '../Dialog/useDialog'
import ImageComponent from '../ImageComponent'

export const LoginForm = () => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')
	const [passForgot, setPassForgot] = useState(false)
	const triggerDialog = useDialogTrigger()

	console.log("VITE : ",import.meta.env.VITE_API_ENDPOINT);
	const onSubmit = methods.handleSubmit(async data => {
		const method = !passForgot ? 'login' : 'password-reset'
		AuthHandling(data, method).then(response => {
			console.log(response);
			if (method == 'password-reset' && response.isEmailSent) {
				triggerDialog('A link has been to your Email')
			} else {
				setIsInvalid(true)
				setInputError(response.message)
			}
		})
	})

	//const forgotAuthHandline = () => {
	//	AuthHandling()
	//}

	useEffect(() => {
		const navElements = document.getElementsByClassName('navigation-container')
		for (let i = 0; i < navElements.length; i++) {
			navElements[i].classList.add('display-none')
		}

		return () => {
			for (let i = 0; i < navElements.length; i++) {
				navElements[i].classList.remove('display-none')
			}
		}
	}, [])

	const setInvalidFalse = () => setIsInvalid(false)

	const handleContextMenu = e => {
		e.preventDefault()
	}

	const handleDragStart = e => {
		e.preventDefault()
	}

	return (
			<div className="body">
				<div className="auth-container">
					<div className="image-container">
						<div className="absolute-center">
							<ImageComponent
								src={import.meta.env.VITE_ENV == "production" ? import.meta.env.VITE_CDN_ENDPOINT+"/showcase.svg" : "./src/assets/images/showcase.svg"}
								alt="Showcase of clothes - illustration"
								className="showcase-img"
								onContextMenu={handleContextMenu}
								onDragStart={handleDragStart}
							/>
						</div>
					</div>
					<FormProvider {...methods}>
						<form
							onSubmit={e => e.preventDefault()}
							noValidate
							className="form-container"
						>
							<div className="logo-image">
								<img
									src={import.meta.env.VITE_ENV == "production" ? import.meta.env.VITE_CDN_ENDPOINT+"/haute-couture-logo.svg" : "./src/assets/images/haute-couture-logo.svg"}
									alt="Haute Couture Logo"
									className="logo-img"
									onContextMenu={handleContextMenu}
									onDragStart={handleDragStart}
								/>
							</div>
							<AnimatePresence mode="wait" initial={false}>
								{isInvalid && (
									<div className="form-error-container">
										<InputError message={inputError} key={inputError} />
									</div>
								)}
							</AnimatePresence>
							<div className="form-inputs">
								<Input
									{...email_validation}
									setInvalidFalse={setInvalidFalse}
								/>
								{!passForgot && (
									<Input
										{...password_validation}
										setInvalidFalse={setInvalidFalse}
									/>
								)}
							</div>
							<div className="text-center form-submit">
								<div className="mt-5">
									<button
										onClick={onSubmit}
										className="btn btn-primary submit-btn"
									>
										{!passForgot ? 'Login' : 'Submit'}
									</button>
								</div>
								{!passForgot && (
									<div
										className="primary-link mt-5 user-check-link forgot-password"
										onClick={() => setPassForgot(true)}
									>
										Forgot password?
									</div>
								)}
								{passForgot && (
									<div
										className="primary-link mt-5 user-check-link forgot-password"
										onClick={() => setPassForgot(false)}
									>
										go to login
									</div>
								)}
								{!passForgot && (
									<p className="user-check">
										<span className="mr-2">New user?</span>
										<Link
											to="/register"
											className="primary-link user-check-link"
										>
											Click here.
										</Link>
									</p>
								)}
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
	)
}
