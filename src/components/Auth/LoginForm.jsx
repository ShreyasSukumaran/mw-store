import { Input } from "../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
	email_validation,
	password_validation,
} from "../../utils/inputValidations";
import { AuthHandling } from "./AuthHandling";
import PropTypes from "prop-types";
import {InputError} from "../Input/InputError";
import { AnimatePresence} from "framer-motion";
import { useState } from "react";

export const LoginForm = ({ formState }) => {
	const methods = useForm();
	const [isInvalid, setIsInvalid] = useState(false);
	const [inputError, setInputError] = useState('');

	const onSubmit = methods.handleSubmit(async (data) =>
		AuthHandling(data, "login").then((error) => {
			setIsInvalid(true);
			setInputError(error.message);
		})
	);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={(e) => e.preventDefault()}
				noValidate
				//className="absolute-center"
			>
				<div className="grid gap-5 md:grid-cols-2">
					<Input {...email_validation} />
					<Input {...password_validation} />
				</div>
				<AnimatePresence mode="wait" initial={false}>
					{isInvalid && (
						<InputError
							message={inputError}
							key={inputError}
						/>
					)}
				</AnimatePresence>
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
