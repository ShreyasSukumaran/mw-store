//import { usePrompt } from '../../hooks/PromptContext'
import { PromptContext } from './PromptContext'
import { useContext } from 'react'

export const usePromptTrigger = () => {
	const { openPrompt } = useContext(PromptContext)

	const triggerPrompt = (message, postiveText, negativeText, setPromptDecision) => {
		openPrompt(message, postiveText, negativeText, setPromptDecision)
	}

	return triggerPrompt
}
