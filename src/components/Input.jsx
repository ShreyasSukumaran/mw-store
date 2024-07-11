import cn from "classnames";
import { findInputError, isFormInvalid } from "../utils";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

export const Input = ({ name, label, type, id, placeholder, validation }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, id);
	const isInvalid = isFormInvalid(inputError);

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

const InputError = ({ message }) => {
	return (
		<motion.p
			className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md mb-2"
			{...framer_error}
		>
			<MdError />
			{message}
		</motion.p>
	);
};

const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
};

InputError.propTypes = {
	message: PropTypes.string,
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
