import { useDialog } from '../../context/DialogContext';

export const useDialogTrigger = () => {
    const { openDialog } = useDialog();

    const triggerDialog = (message) => {
        openDialog(message);
    };

    return triggerDialog;
};
