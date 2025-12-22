import type { ReactElement } from "react";

interface ButtonPropsInterface {
    variant : 'primary' | 'secondary' | 'tertiary';
    text : string;
    icon? : ReactElement;
    size : 'sm' | 'md' | 'lg'
}

export const Button = (props: ButtonPropsInterface) => {

    const variantStyles = {
        primary : 'text-purple-100 bg-purple-600',
        secondary : 'text-purple-600 bg-purple-300',
        tertiary : 'bg-red-500 text-white'
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
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-md'
    }

    const defaultStyles = 'font-semibold rounded-lg shadow flex justify-center items-center gap-1.5 px-1.5 py-0.5 hover:cursor-pointer  ' 

  return (
    <button className={` ${defaultStyles} ${variantStyles[props.variant]}  ${size[props.size]} hover:shadow-lg hover:shadow-gray-400 transition duration-200 ease-in-out `}>
        {props.icon && <span className={`${iconSize[props.size]} `}> {props.icon} </span>}
        <span className={` ${textSize[props.size]} `}> {props.text} </span>  
    </button>
  )
}
