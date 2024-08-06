import { motion } from 'framer-motion'
//import { MdError } from "react-icons/md";
import PropTypes from 'prop-types'
import './Input.scss'

const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
}

export const InputError = ({ message }) => {
	let input_tailwind = ''
	if (['User Not found', 'Invalid Password!'].includes(message)) {
		input_tailwind = 'inputError formError'
	} else {
		input_tailwind = 'inputError'
	}
	console.log('message ', message)
	return (
		<motion.p className={input_tailwind} {...framer_error}>
			{/*{!['User Not found', "Invalid Password!"].includes(message) && <MdError /> }*/}
			{message}
		</motion.p>
	)
}

InputError.propTypes = {
	message: PropTypes.string,
}
