import cn from 'classnames'
import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import PropTypes from 'prop-types'

export const Input = ({ name, label, type, id, placeholder, validation }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputError = findInputError(errors, label)
	const isInvalid = isFormInvalid(inputError)

	const input_tailwind = 'form-control'

	return (
		<div className="form-group">
			<label htmlFor={id}>{label}</label>
			<AnimatePresence mode="wait" initial={false}>
				{isInvalid && (
					<InputError
						message={inputError.error.message}
						key={inputError.error.message}
					/>
				)}
			</AnimatePresence>
			<input
				id={id}
				type={type}
				className={cn(input_tailwind)}
				placeholder={placeholder}
				{...register(name, validation)}
			/>
		</div>
	)
}

const InputError = ({ message }) => {
	console.log('Input error : ', message)
	return (
		<motion.p
			className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
			{...framer_error}
		>
			<MdError />
			{message}
		</motion.p>
	)
}

const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
}

InputError.propTypes = {
	message: PropTypes.string,
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	validation: PropTypes.shape({
		required: PropTypes.shape({
			value: PropTypes.bool,
			message: PropTypes.string,
		}),
		maxLength: PropTypes.shape({
			value: PropTypes.number,
			message: PropTypes.string,
		}),
	}).isRequired,
}
