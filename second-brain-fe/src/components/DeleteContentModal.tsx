import { useEffect, useState } from "react";
import { Button } from "./Button"

interface DeleteModalProps {
    open: boolean ;
    onClose: () => void;
    deleteConfirm: () => void
}

const DeleteContentModal = ({open , onClose , deleteConfirm}: DeleteModalProps) => {
  const [isVisible , setIsVisible] = useState(false)

  useEffect(() => {
    if(open){
      setTimeout(() => {
        setIsVisible(true)
      } , 10)
    }else{
      setIsVisible(false)
    }
  } , [open])

  if(!open) return null;

  return ( <> 
    {open && <div className={`w-screen h-screen z-20 bg-slate-800/50 backdrop-blur-xs fixed inset-0 
    transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>  </div> }
    {open && <div className={` bg-white fixed z-22 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-black flex flex-col justify-center items-center gap-7 py-5 px-8 rounded-2xl
    transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90' } `}>
        <h1 className="text-xl font-semibold"> Are you sure you want to delete? </h1>
        <div className=" flex justify-end items-center gap-2 w-full  ">
            <span onClick={deleteConfirm}> <Button variant="tertiary" text="Delete" size="md" /></span>
            <span onClick={onClose}> <Button variant="primary" text="Cancel" size="md" /> </span>
        </div>  
    </div> }
  </>
  )
}

export default DeleteContentModal