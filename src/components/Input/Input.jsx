import cn from "classnames";
import { findInputError, isFormInvalid } from "../../utils";
import { useFormContext } from "react-hook-form";
import { AnimatePresence} from "framer-motion";
import {InputError} from "./InputError";
import PropTypes from "prop-types";

export const Input = ({ name, label, type, id, placeholder, validation }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, id);
	const isInvalid = isFormInvalid(inputError);

	//document.getElementById(`${id}`).onblur(e => {
		
	//})

	const input_tailwind =
		"p-3 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 bg-white";

	return (
		<div className="flex flex-col w-full gap-2">
			<div className="flex justify-between">
				<label htmlFor={id} className="font-semibold capitalize">
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
				className={cn(input_tailwind)}
				placeholder={placeholder}
				{...register(id, validation)}
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
