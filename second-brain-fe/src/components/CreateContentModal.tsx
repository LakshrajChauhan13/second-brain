import { useEffect, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { createContent } from "../api/content.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputHeadline } from "./InputHeadline";
import { CrossIcon } from "../icons/CrossIcon";
import { useToast } from "../store/toastHook";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

interface CreateContentInterface {
  title: string; 
  link: string; 
  type: string;
}

const CreateContentModal = ({open,onClose}: CreateContentModalProps) => {
  const queryClient = useQueryClient()
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const toast = useToast()

    const createMutation = useMutation({
          mutationFn: ({title, link, type}: CreateContentInterface) => 
            createContent(title , link , type),

          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents']}) // to refetch the data, as soon as content is created
            toast.success('Content added successfully!!') 
            onClose();
            setLink(''); setTitle(''); setType('')},

          onError: (err) => {
            toast.error('Failed to add content')
            console.error(err)
          }

        })

     async function submitHandler(e: any){
        e.preventDefault();
        createMutation.mutate({title , link , type})
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
    <>
        {open && <div className={`w-dvw h-dvh z-20 bg-slate-900/50 backdrop-blur-xs fixed inset-0 transition-opacity duration-300 ${ isVisible ? 'opacity-100' : 'opacity-0'} `}>  </div>}
        
        {open && 
        <form onSubmit={(e) =>submitHandler(e)} className={`bg-white fixed z-30 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-black flex flex-col justify-center items-center gap-3 w-80 px-5 py-5 rounded-lg
        transition-all duration-500 ${ isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90' } `}>
            <div className="w-full flex justify-end "> 
              <span onClick={onClose} className=" hover:cursor-pointer hover:text-red-600 transition-all duration-170 ease-in-out  "> 
                <CrossIcon /> 
              </span>
            </div>

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
            
            <span className="pt-3  " ><Button variant="primary" text={createMutation.isPending ? 'Creating...' : 'Submit'} size="lg"  /></span>
        </form> }
    </>
  )
}

export default CreateContentModal

