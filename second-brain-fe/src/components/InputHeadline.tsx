interface TextInterface {
    text: string
}

export function InputHeadline ({text}: TextInterface){
    return (
            <h1 className=" font-semibold text-sm pb-0.5 ">
                {text}
            </h1>     
    )
}