import type { ReactElement } from "react";

interface ButtonPropsInterface {
    variant : 'primary' | 'secondary' | 'tertiary';
    text : string;
    icon? : ReactElement;
    size : 'sm' | 'md' | 'lg';
    disabled?: boolean
}

export const Button = (props: ButtonPropsInterface) => {

    const variantStyles = {
        primary : 'text-purple-100 bg-purple-600',
        secondary : 'text-purple-600 bg-purple-300',
        tertiary : 'bg-red-500/90 text-white'
        
    }

    const size = {
        sm : 'px-1.5 py-1.5 ',
        md : 'px-3 py-2.5',
        lg : 'px-3.5 py-2.5',
    }

    const iconSize = {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5'
    }

    const textSize = {
        sm: 'text-[12px] tracking-wide',
        md: 'text-sm',
        lg: 'text-md'
    }

    const defaultStyles = 'font-semibold rounded-lg shadow flex justify-center items-center gap-1.5 px-1.5 py-0.5 hover:cursor-pointer disabled:bg-purple-300 disabled:shadow-none disabled:cursor-default disabled:text-purple-900/50 disabled:bg-purple-300 hover:shadow-lg  hover:shadow-gray-400 transition duration-200 ease-in-out' 

  return (
    <button className={`  ${defaultStyles} ${variantStyles[props.variant]}  ${size[props.size]}   `} 
    disabled={props.disabled} >
        {props.icon && <span className={`${iconSize[props.size]} `}> {props.icon} </span>}
        <span className={` ${textSize[props.size]} `}> {props.text} </span>  
    </button>
  )
}
