import React, { useEffect, useState } from 'react'
import { Message, Portal, Transition, TransitionGroupProps } from 'semantic-ui-react'
import CONFIG from 'src/config'

import './ToastPortal.scss'

export enum ToastType {
  Error = 'red',
  Success = 'green',
}

export interface Toast {
  type: ToastType
  title: string
}

interface ToastPortalProps {
  toasts: Toast[]
}

const transition: TransitionGroupProps = {
  duration: CONFIG.animateDuration,
  animation: 'fade down',
}

const ToastPortal: React.FC<ToastPortalProps> = ({ toasts }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (toasts.length > 0) setOpen(true)
    else {
      setTimeout(() => {
        if (toasts.length === 0) setOpen(false)
      }, CONFIG.animateDuration)
    }
  }, [toasts.length])

  return <Portal open={open}>
    <div className='ToastPortal'>
      <Transition.Group {...transition}>
        {toasts.map((toast, index) =>
          <Message key={index} color={toast.type}>
            {toast.title}
          </Message>)}
      </Transition.Group>
    </div>
  </Portal>
}

export default ToastPortal
