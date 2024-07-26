
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import cn from "classnames";


const framer_error = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
};




export const InputError = ({ message }) => {
	let input_tailwind = ''
	if (['User Not found.', "Invalid Password!"].includes(message)) {
		input_tailwind = 'flex bg-red-100 text-red-500 font-semibold items-center gap-1 mb-2 px-2 rounded-md absolute top-[-2.5rem] translate-x-2/4 translate-y-0 w-max';
	} else {
		input_tailwind = "flex bg-red-100 text-red-500 font-semibold items-center gap-1 mb-2 px-2 rounded-md";
	}
	return (
		<motion.p
			className={cn(input_tailwind)}
			{...framer_error}
		>
			{!['User Not found.', "Invalid Password!"].includes(message) && <MdError /> }
			{message}
		</motion.p>
	);
};


InputError.propTypes = {
	message: PropTypes.string,
};