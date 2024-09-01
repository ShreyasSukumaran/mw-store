import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import './Prompt.scss';
import { isMobile } from 'react-device-detect'

export const PromptContext = createContext();

export const PromptProvider = ({ children }) => {

	const [promptMessage, setPromptMessage] = useState(null);
	const [postiveText, setPostiveText] = useState('Yes')
	const [negativeText, setNegativeText] = useState('No')
	const [savepromptDecistion, setSavePromptDecision] = useState(null)

	const openPrompt = (message, postiveText, negativeText, setPromptDecision) => {
		setPostiveText(postiveText)
		setNegativeText(negativeText)
		setSavePromptDecision (() => setPromptDecision)
		setPromptMessage(message)
	};

	const onChoose = (choice) => {
		setPromptMessage(null)
		if (savepromptDecistion) {
			savepromptDecistion(choice)
		}
	}

	useEffect(() => {
		let promptElement = document.getElementById('prompt');
		if (promptElement) {
			let promptHeight = promptElement.offsetHeight
			if (isMobile) {
				promptElement.style.bottom = promptHeight
			}
		}
		document.getElementById("body").addEventListener('click', e => {
			let $this = e.target
			if (!(($this.classList.value).includes('prompt') || ($this.classList.value).includes('delete-button'))) {
				setPromptMessage(null)
			}
		})
		document.getElementById("navigation-container").addEventListener("mouseenter", () => setPromptMessage(null))
	})

	return (
		<PromptContext.Provider value={{ promptMessage, openPrompt }}>
			{children}
			{promptMessage && (
				<motion.div className="prompt" id="prompt"  key={promptMessage} {...framer}>
					<div>{promptMessage}</div>
					<div className='prompt-buttons'>
						<button onClick={() => onChoose(true)}>{postiveText}</button>
						<button onClick={() => onChoose(false)}>{negativeText}</button>
					</div>
				</motion.div>
			)}
		</PromptContext.Provider>
	);
};

const framer = {
	initial: { opacity: 0, y: "-50%", x: "-50%" },
	animate: { opacity: 1, y: 10, x: "-50%" },
	exit: { opacity: 0, y: "-50%", x: "-50%" },
	transition: { duration: 0.4 },
}

PromptProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

