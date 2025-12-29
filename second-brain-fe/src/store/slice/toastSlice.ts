import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToastType = 'error' | 'success' | 'copied' | 'deleted' | 'logout'

interface ToastMessage {
    message: string;
    type: ToastType;
    id : string
}

interface ToastState  {
    toasts : ToastMessage[]
}

const initialState: ToastState = {
    toasts : []
}

export const toastSlice = createSlice({
    name : "toast",
    initialState,
    reducers: {
        addToast: (state , action: PayloadAction<ToastMessage>) => {
            state.toasts.unshift(action.payload);

            if(state.toasts.length > 3) {
                state.toasts.pop()
            }
        },

        removeToast: (state , action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
        }
    }
})

export const { addToast , removeToast} = toastSlice.actions;
export default toastSlice.reducer;