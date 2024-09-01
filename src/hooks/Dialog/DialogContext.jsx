import { createContext, useState } from 'react';
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import './Dialog.scss';

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {

	const [dialogMessage, setDialogMessage] = useState(null);
	
	const openDialog = (message) => {
		setDialogMessage(message);
		setTimeout(() => {
			setDialogMessage(null);
		}, 5000);
	};

    return (
        <DialogContext.Provider value={{ dialogMessage, openDialog }}>
            {children}
            {dialogMessage && (
                <motion.div className="dialog" key={dialogMessage} {...framer}>
                    {dialogMessage}
                </motion.div>
            )}
        </DialogContext.Provider>
    );
};

const framer = {
	initial: { opacity: 0, y: "-50%", x: "-50%" },
	animate: { opacity: 1, y: 10, x: "-50%" },
	exit: { opacity: 0, y: "-50%", x: "-50%" },
	transition: { duration: 0.2 },
}

DialogProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

