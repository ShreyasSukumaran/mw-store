import { findInputError, isFormInvalid } from '../../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'
import { InputError } from './InputError'
import PropTypes from 'prop-types'
import './Input.scss'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'

export const Input = ({
	name,
	type,
	id,
	placeholder,
	validation,
	setInvalidFalse,
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const [passwordShown, setPasswordShown] = useState(false)

	const inputError = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputError)

	const handleChange = () => setInvalidFalse()

	const handlePasswordShown = () => setPasswordShown(!passwordShown)

	if (id === 'password') {
		return (
			<div className="flex-grid password">
				<div className="flex-space-btw">
					<AnimatePresence mode="wait" initial={false}>
						{isInvalid && (
							<InputError
								message={inputError.error.message}
								key={inputError.error.message}
							/>
						)}
					</AnimatePresence>
				</div>
				<div className="password-input">
					<input
						id={id}
						type={!passwordShown ? 'password' : 'text'}
						name={name}
						className="input"
						placeholder={placeholder}
						{...register(id, { ...validation, onChange: handleChange })}
					/>
					{!passwordShown && (
						<FaRegEyeSlash className="eye" onClick={handlePasswordShown} />
					)}
					{passwordShown && (
						<FaRegEye className="eye" onClick={handlePasswordShown} />
					)}
				</div>
			</div>
		)
	} else if (id === 'repeat_password') {
		return (
			<div className="flex-grid password">
				<div className="flex-space-btw">
					<AnimatePresence mode="wait" initial={false}>
						{isInvalid && (
							<InputError
								message={inputError.error.message}
								key={inputError.error.message}
							/>
						)}
					</AnimatePresence>
				</div>
				<div className="password-input">
					<input
						id={id}
						type={!passwordShown ? 'password' : 'text'}
						name={name}
						className="input"
						placeholder={placeholder}
						{...register(id, { ...validation, onChange: handleChange })}
					/>
					{!passwordShown && (
						<FaRegEyeSlash className="eye" onClick={handlePasswordShown} />
					)}
					{passwordShown && (
						<FaRegEye className="eye" onClick={handlePasswordShown} />
					)}
				</div>
			</div>
		)
	} else {
		return (
			<div className="flex-grid">
				<div className="flex-space-btw">
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
					{...register(id, { ...validation, onChange: handleChange })}
				/>
			</div>
		)
	}
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	setInvalidFalse: PropTypes.func.isRequired,
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
}
