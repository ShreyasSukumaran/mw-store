import { Input } from '..'
import { FormProvider, useForm } from 'react-hook-form'
import {
	first_name_validation,
	last_name_validation,
	email_validation,
	password_validation,
} from '../../utils/inputValidations'
import { GrMail } from 'react-icons/gr'
import { AuthHandling } from './AuthHandling'
import PropTypes from 'prop-types'
//import http2 from 'http2'
//import { useState } from 'react'
// import { BsFillCheckSquareFill } from 'react-icons/bs'

export const RegisterForm = ({ formState }) => {
	const methods = useForm()

	const onSubmit = methods.handleSubmit(async data =>
		AuthHandling(data, 'register'),
	)

	return (
		<FormProvider {...methods}>
			<form onSubmit={e => e.preventDefault()} noValidate className="container">
				<div>
					<Input {...first_name_validation} />
					<Input {...last_name_validation} />
					<Input {...email_validation} />
					<Input {...password_validation} />
				</div>
				<div className="mt-5">
					<button onClick={onSubmit} className="btn btn-primary">
						<GrMail />
						Submit Form
					</button>
				</div>
				<p>
					Existing user?
					<a
						href="javascript:void(0)"
						onClick={() => formState(false)}
						className="primary-link"
					>
						Click here.
					</a>
				</p>
			</form>
		</FormProvider>
	)
}

RegisterForm.propTypes = {
	formState: PropTypes.func.isRequired,
}
