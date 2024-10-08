import { useState, useEffect, useRef } from 'react'
import { Input } from '../Input/Input'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { InputError } from '../Input/InputError'
import { AuthHandling } from '../ApiRequests/Auth/AuthHandling'
import {
	firstName_validation,
	lastName_validation,
	email_validation,
	password_validation,
} from '../../utils/inputValidations'
import './Auth.scss'
import { ImageComponent } from '../ImageComponent'

export const RegisterForm = () => {
	const methods = useForm()
	const [isInvalid, setIsInvalid] = useState(false)
	const [inputError, setInputError] = useState('')
	const logoImageClass = useRef('logo-image')
    const navigate = useNavigate()

	const onSubmit = methods.handleSubmit(async data =>
		AuthHandling(data, 'register').then(response => {

			if (response.error){
				setIsInvalid(true)
				setInputError(response.message)
			}

			if (response.isLogin) {
				navigate(response.redirectTo)
			}
		}),
	)

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

	useEffect(() => {
		if (isInvalid) {
			logoImageClass.current = 'logo-image error'
		} else {
			logoImageClass.current = 'logo-image'
		}
	}, [isInvalid])

	const setInvalidFalse = () => setIsInvalid(false)

	return (
		<div className="body">
			<div className="auth-container">
				<div className="image-container">
					<div className="absolute-center">
						<ImageComponent
							src="/showcase.svg"
							alt="Showcase of clothes - illustration"
							className="showcase-img"
						/>
					</div>
				</div>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						className="form-container register-form"
					>
						<div className={logoImageClass.current}>
							<ImageComponent
								src="/haute-couture-logo.svg"
								alt="Haute Couture Logo"
								className="logo-img"
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
							<Input {...firstName_validation} setInvalidFalse={setInvalidFalse} />
							<Input {...lastName_validation} setInvalidFalse={setInvalidFalse} />
							<Input {...email_validation} setInvalidFalse={setInvalidFalse} />
							<Input {...password_validation} setInvalidFalse={setInvalidFalse} />
						</div>
						<div className="text-center">
							<div className="mt-5">
								<button type="submit" className="btn btn-primary submit-btn">
									Register
								</button>
							</div>
							<p className="mt-5 user-check">
								<span className="mr-2">Existing user?</span>
								<Link to="/login" className="primary-link user-check-link">
									Click here.
								</Link>
							</p>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
