import { Input } from "..";
import { FormProvider, useForm } from "react-hook-form";
import {
	email_validation,
	password_validation,
} from "../../utils/inputValidations";
//import { GrMail } from "react-icons/gr";
import { AuthHandling } from "./AuthHandling";
import PropTypes from "prop-types";
//import http2 from 'http2'
//import { useState } from 'react'
// import { BsFillCheckSquareFill } from 'react-icons/bs'

export const LoginForm = ({ formState }) => {
	const methods = useForm();

	const onSubmit = methods.handleSubmit(async (data) =>
		AuthHandling(data, "login")
	);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={(e) => e.preventDefault()}
				noValidate
				className="absolute-center"
			>
				<div className="grid gap-5 md:grid-cols-2">
					<Input {...email_validation} />
					<Input {...password_validation} />
				</div>
				<div className="text-center">
					<div className="mt-5">
						<button onClick={onSubmit} className="btn btn-primary">
							Submit Form
						</button>
					</div>
					<p className="mt-5">
						<span className="mr-2">New user?</span>
						<a
							href="#"
							onClick={() => formState(true)}
							className="primary-link"
						>
							Click here.
						</a>
					</p>
				</div>
			</form>
		</FormProvider>
	);
};

LoginForm.propTypes = {
	formState: PropTypes.func.isRequired,
};
