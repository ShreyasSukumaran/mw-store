import { findInputError, isFormInvalid } from '../../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'
import { IoIosArrowDown } from "react-icons/io";
import { InputError } from './InputError'
import PropTypes from 'prop-types'
import './Input.scss'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export const Input = ({
	name,
	type,
	id,
	placeholder,
	validation,
	setInvalidFalse,
	value,
	options,
}) => {
	const {
		register,
		formState: { errors },
		setValue
	} = useFormContext()

	const [passwordShown, setPasswordShown] = useState(false)

	const inputError = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputError)

	const handleChange = () => setInvalidFalse()

	if (type == 'select') {
		value = options[0]['value']
	}

	useEffect(() => {
		setValue(id, value);
	}, [setValue, value, id])

	const handlePasswordShown = () => setPasswordShown(!passwordShown)

	if (id.includes('password')) {
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
	} else if (type === 'select') {
		// Dropdown input for gender
		return (
			<div className="flex-grid" style={{ position: 'relative', height: 'min-content', margin: "15px auto 0"}}>
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
				<select
					id={id}
					name={name}
					className="input"
					{...register(id, { ...validation, onChange: handleChange })}
				>
					{options?.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<IoIosArrowDown className='dropdown-arrow' />
			</div>
		)
	} else if (type === 'date') {
		// Date selector for DOB
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
					type="date"
					name={name}
					className="input"
					placeholder={placeholder}
					{...register(id, { ...validation, onChange: handleChange })}
				/>
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
	value: PropTypes.string,
	options: PropTypes.array,
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
