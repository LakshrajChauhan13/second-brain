interface MessageInterface{
    message: string | undefined
}

const InputError = ({message} : MessageInterface) => {
  return (
    <span className="font-semibold text-red-600/80 text-xs pl-2 tracking-wide"> {message} </span>
  )
}

export default InputError