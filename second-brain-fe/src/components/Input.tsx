import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    type?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps> (
    ({type, placeholder, ...rest}, ref) => {
    return (
        <input 
        ref={ref}
        type={type} 
        placeholder={placeholder} 
        className="border-2 border-gray-400 bg-gray-200 font-semibold px-2.5 py-2 w-full rounded-lg"
        {...rest}
         />
    )
})


Input.displayName = 'Input'