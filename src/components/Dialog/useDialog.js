//import { useDialog } from '../../hooks/DialogContext'
import { DialogContext } from '../../hooks/DialogContext'
import { useContext } from 'react'

export const useDialogTrigger = () => {
	const { openDialog } = useContext(DialogContext)

	const triggerDialog = message => {
		openDialog(message)
	}

	return triggerDialog
}
