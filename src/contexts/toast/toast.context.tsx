import React, { createContext, useContext, useState } from 'react'
import CONFIG from 'src/config'
import ToastPortal, { Toast, ToastType } from 'src/contexts/toast/ToastPortal'

interface ToastContextState {
  success: (title: string) => void
  error: (title: string) => void
}

const ToastContext = createContext<ToastContextState>({} as ToastContextState)

export const ToastProvider: React.FC<React.PropsWithChildren> = props => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (type: ToastType, title: string) => {
    setToasts(toasts => [...toasts, { type, title }])
    setTimeout(() => {
      setToasts(toasts => toasts.slice(1))
    }, CONFIG.toastDuration)
  }

  const state = {
    success: (title: string) => toast(ToastType.Success, title),
    error: (title: string) => toast(ToastType.Error, title),
  }

  return <ToastContext.Provider value={state}>
    {props.children}

    <ToastPortal toasts={toasts} />
  </ToastContext.Provider>
}

const useToast = () => useContext(ToastContext)

export default useToast
