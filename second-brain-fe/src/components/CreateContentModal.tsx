import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { createContent } from "../api/content.api";
import { useQueryClient } from "@tanstack/react-query";
import { InputHeadline } from "./InputHeadline";
import { CrossIcon } from "../icons/CrossIcon";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({open,onClose}: CreateContentModalProps) => {
  const queryClient = useQueryClient()
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [isVisible, setIsVisible] = useState(false);

     async function submitHandler(e: any){
        e.preventDefault();
        await createContent(title , link , type);
        // console.log(response);
        await queryClient.invalidateQueries({ queryKey: ['contents']})  // to refetch the data, as soon as content is created
        onClose();
        setLink(''); setTitle(''); setType('')
    }

    useEffect(() => {
      if(open){
        setIsVisible(true)
      }
      else{
        setIsVisible(false)
      }
    } , [open])

  return (
    <div>
        {open && <div className={`w-dvw h-dvh z-20 bg-slate-900/50 backdrop-blur-xs fixed inset-0 transition-opacity duration-300 ${ isVisible ? 'opacity-100' : 'opacity-0'} `}>  </div>}
        
        {open && 
        <form onSubmit={(e) =>submitHandler(e)} className={`bg-white fixed z-22 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-black flex flex-col justify-center items-center gap-3 w-80 px-5 py-5 rounded-lg
        transition-all duration-500 ${ isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90' } `}>
            <div onClick={onClose} className=" flex justify-end w-full hover:cursor-pointer hover:text-red-600 transition-all duration-150 ease-in-out"> 
              <CrossIcon /> </div>

            <div className="w-full ">
              <InputHeadline text="Title"/>
              <Input placeholder={'Add Title'} type='text' value={title} func={(e)=> setTitle(e.target.value)} />
            </div>

            <div className="w-full">
              <InputHeadline text="Link"/>
              <Input placeholder={'Drop Link'} type='text' value={link} func={(e)=> setLink(e.target.value)}/>
            </div>

            <div className="w-full"> 
              <InputHeadline text="Type"/>
              <Input placeholder={'Type'} type='text' value={type} func={(e)=> setType(e.target.value)}/>
            </div>
            
            <span className="pt-3"><Button variant="secondary" text="Submit" size="lg"  /></span>
        </form> }
    </div>
  )
}

export default CreateContentModal

