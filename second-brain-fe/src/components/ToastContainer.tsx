import { AnimatePresence } from 'framer-motion'
import { useAppSelector } from '../store/hook'
import { ToastNotification } from './ToastNotification'

const ToastContainer = () => {
    const toasts = useAppSelector(state => state.toast.toasts)
  return (
    <>
        <div className=" fixed bottom-5 right-5 w-80 z-9999 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {
                    toasts && toasts.map((toast, index) => ( 
                        <ToastNotification message={toast.message} type={toast.type} key={toast.id} zIndex={9999 - index}
                        index={index}  />
                    ))
                }
            </AnimatePresence>
        </div>
    </>
  )
}

export default ToastContainer