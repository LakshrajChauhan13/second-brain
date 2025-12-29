import { useAppDispatch } from "./hook"
import { addToast, removeToast, type ToastType } from "./slice/toastSlice"


export const useToast = () => {
    const dispatch = useAppDispatch()

    const showToast = (message: string , type: ToastType) => {
        const id = Math.random().toString(36).substring(2,9)

        dispatch(addToast({message , type , id}));

        setTimeout(() => {
            dispatch(removeToast(id))
        }, 3000);
    }

    return {
        success: (message: string) => showToast(message , 'success'),
        error: (message: string) => showToast(message , 'error'),
        copied: (message: string) => showToast(message , "copied"),
        deleted: (message: string) => showToast(message , "deleted"),
        logout: (message: string) => showToast(message, 'logout')
    }

}