import { findInputError, isFormInvalid } from "../../utils";
import { useFormContext } from "react-hook-form";
import { AnimatePresence} from "framer-motion";
import {InputError} from "./InputError";
import PropTypes from "prop-types";
import "./Input.css"

export const Input = ({ name, label, type, id, placeholder, validation, setIsInvalid }) => {
	const {
		register,
		formState: { errors },
		trigger
	} = useFormContext();

	const inputError = findInputError(errors, id);
	const isInvalid = isFormInvalid(inputError);

	//document.getElementById(`${id}`).onblur(e => {
		
	//})
	
	const handleChange = async () => {
		setIsInvalid();
		const result = await trigger(id);
		if (result) setIsInvalid();
	};

	return (
		<div className="flex-grid">
			<div className="flex-space-btw">
				<label htmlFor={id} className="font-capital">
					{label}
				</label>
				<AnimatePresence mode="wait" initial={false}>
					{isInvalid && (
						<InputError
							message={inputError.error.message}
							key={inputError.error.message}
						/>
					)}
				</AnimatePresence>
			</div>
			<input
				id={id}
				type={type}
				name={name}
				className="input"
				placeholder={placeholder}
				{...register(id, {validation, onChange:handleChange})}
			/>
		</div>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	setIsInvalid: PropTypes.func.isRequired,
	validation: PropTypes.shape({
		required: PropTypes.shape({
			value: PropTypes.any,
			message: PropTypes.string,
		}),
		maxLength: PropTypes.shape({
			value: PropTypes.any,
			message: PropTypes.string,
		}),
	}).isRequired,
};
