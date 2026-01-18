interface TextInterface {
    text: string
}

export function InputHeadline ({text}: TextInterface){
    return (
            <h1 className=" font-semibold text-gray-500 text-sm  tracking-wide ">
                {text}
            </h1>     
    )
}