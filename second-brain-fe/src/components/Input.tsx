export function Input({type, value , func, placeholder}: {type : string ,func?: (e: any)=>any, value?: string , placeholder: string}) {
    return (
        <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={func}
        className="border-2 border-gray-400 bg-gray-200 font-semibold px-2.5 py-2 w-full rounded-lg" />
    )
}