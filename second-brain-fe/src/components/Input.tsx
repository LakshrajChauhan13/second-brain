import { forwardRef, useState, type InputHTMLAttributes } from "react"


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    type?: string;
    focused: string;
    setFocused: (value: string) => void ;
    name : string
}

export const Input = forwardRef<HTMLInputElement, InputProps> (
    ({type, placeholder,focused, setFocused, ...rest}, ref) => {

        const inputName = rest.name      //name is included in register from RFH, no need to explicitly  
        
    return (
        <input 
        ref={ref}
        type={type} 
        placeholder={placeholder} 
        onFocus={() => setFocused(inputName)}
        onBlur={() => setFocused('')}
        className={`border-2 duration-200 text-sm bg-gray-200 font-semibold px-2.5 py-2 w-full rounded-lg ${inputName === focused ? 'border-gray-500 text-black/80 scale-103 duration-500 outline-none ' : 'text-gray-500 hover:border-gray-400/80 border-gray-300' }`}
        {...rest}
         />
    )
})


Input.displayName = 'Input'