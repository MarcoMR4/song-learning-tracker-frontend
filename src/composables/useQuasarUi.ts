// composables/useUi.ts
import { 
  Dialog, 
  Notify 
} from 'quasar'

interface dialogInterface {
  title: string;
  message: string;
  okLabel?: string;
  cancelLabel?: string;
  okColor?: string;
  cancelColor?: string;
  persistent?: boolean;
}

interface notifyInterface {
  type?: 'positive' | 'negative' | 'info' | 'warning';
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  timeout?: number;
}

const BAD_NOTIFY_TIMEOUT = 5000;
const GOOD_NOTIFY_TIMEOUT = 2000;

export function useQuasarUi() {
  // --- DIALOG GENERAL ---
  const showDialog = ({
    title,
    message,
    okLabel = 'OK',
    cancelLabel = 'Cancel',
    okColor = 'primary',
    cancelColor = 'grey',
    persistent = false,
  }: dialogInterface) => {
    return Dialog.create({
      title,
      message,
      persistent,
      cancel: {
        label: cancelLabel,
        color: cancelColor
      },
      ok: {
        label: okLabel,
        color: okColor
      }
    })
  }

  // --- NOTIFY GENERAL ---
  const notify = ({
    type = 'info',
    message,
    position = 'bottom',
    timeout
  }: notifyInterface) => {
    Notify.create({
      type,
      message,
      position,
      timeout
    })
  }

  // --- SHORTCUT: CONFIRMACIONES ---
  const confirmAction = (title: string, message: string) => {
    return showDialog({
      title,
      message,
      okLabel: 'OK',
      cancelLabel: 'Cancel',
      okColor: 'negative',
      cancelColor: 'primary'
    })
  }

  // --- SHORTCUTS ESPECÍFICOS (debajo de esto puedes extender) ---
  const showError = (msg: string) => {
    notify({
      type: 'negative',
      message: msg,
      timeout: BAD_NOTIFY_TIMEOUT
    })
  }

  const showWarning = (msg: string) => {
    notify({
      type: 'warning',
      message: msg,
      timeout: BAD_NOTIFY_TIMEOUT
    })
  }

  const showSuccess = (msg: string) => {
    notify({
      type: 'positive',
      message: msg,
      timeout: GOOD_NOTIFY_TIMEOUT
    })
  }

  return {
    showDialog,
    confirmAction,
    showError,
    showSuccess,
    showWarning,
  }
}
