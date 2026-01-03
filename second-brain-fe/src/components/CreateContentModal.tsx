import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button"
import { Input } from "./Input"
import { createContent } from "../api/content.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputHeadline } from "./InputHeadline";
import { CrossIcon } from "../icons/CrossIcon";
import { useToast } from "../store/toastHook";
import { useForm } from "react-hook-form";
import { safeCreateContentSchema, type CreateContentInput } from "../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "./InputError";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const contentType = ['Video' , 'Tweet'] 

const CreateContentModal = ({open,onClose}: CreateContentModalProps) => {
  const queryClient = useQueryClient()
  const { register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },} = useForm<CreateContentInput>({
      resolver: zodResolver(safeCreateContentSchema),
      // defaultValues:{
      //   type: "Tweet"
      // }
    })

    const [isVisible, setIsVisible] = useState(false);
    const toast = useToast()
    const currentType = watch("type")
    const [autoType, setAutoType] = useState('')
    
    const createMutation = useMutation({
          mutationFn: (data: CreateContentInput) => 
            createContent(data.title , data.link , data.type),

          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents']}) // to refetch the data, as soon as content is created
            toast.success('Content added successfully!!') 
            onClose();
            reset()
            },

          onError: (err) => {
            toast.error('Failed to add content')
            console.error(err)
          }

        })

     async function submitHandler(data: CreateContentInput) {
        createMutation.mutate(data)
    }

    
    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      if(val) {
        if(val.includes("youtube.com")||val.includes("youtu.be")){
          setValue("type" , "Video");
          setAutoType("Video")
        }
        if(val.includes("twitter.com") ||val.includes("x.com")  ){
          setValue("type" , "Tweet");
          setAutoType("Tweet")
        }
      }
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
    <AnimatePresence>
        {open && 
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{ opacity: {duration: 0.3} }}
        onClick={() => {onClose(); reset()}} 
        className="w-dvw h-dvh z-20 bg-slate-900/50 backdrop-blur-xs fixed inset-0 transition-opacity duration-300 ">  </motion.div>}
        
        {open && 
        <motion.form 
        initial={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%" }}
        animate={{ opacity:1, scale: 1, x: "-50%", y: "-50%"}}
        exit={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%"}}
        transition={{ opacity: { duration: 0.2}, scale: { duration: 0.3} }}
        onSubmit={handleSubmit(submitHandler)} 
        className= "bg-white fixed z-30 top-1/2 left-1/2 text-black flex flex-col justify-center items-center gap-3 w-80 px-5 py-5 rounded-lg">
            <div className="w-full flex justify-end "> 
              <span onClick={() => {onClose(); reset(); setAutoType('')}} className=" hover:cursor-pointer hover:text-red-600 transition-all duration-170 ease-in-out  "> 
                <CrossIcon size={5} /> 
              </span>
            </div>

            <div className="w-full ">
              <InputHeadline text="Title"/>
              <Input placeholder={'Add Title'} type='text' {...register("title")}  />
              {errors.title && <InputError message={errors.title.message} />}
            </div>

            <div className="w-full">
              <InputHeadline text="Link"/>
              <Input placeholder={'Drop Link'} type='text' {...register("link",{ onChange: (e) => handleLinkChange(e)})} />
              {errors.link && <InputError message={errors.link.message} />}
            </div>

              {/* <InputHeadline text="Type" /> */}
            <div className="grid grid-cols-2 gap-2 shrink-0 mt-2 ">
              {contentType.map((type) => (
                <button
                  key={type}
                  type="button" // Prevent form submission
                  onClick={() => setValue("type", type)} // Manually set RHF value
                  className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer  hover:shadow-black/40 shadow-md  transition-all duration-200 ${
                    currentType === type
                      ? "text-purple-600 bg-purple-300 border dur "
                      : "bg-gray-200 text-gray-700/50 hover: border-gray-700/40 hover:text-gray-500  border"
                  }`}
                >
                  {type}
                </button>))}
            </div>
            <input type="hidden" {...register("type")} />

            {currentType !== autoType && 
              <span className="flex gap-1 "> 
                <InputError message="Make sure to choose right type" /> 
                <span onClick={() => setAutoType(currentType)} className="size-2 cursor-pointer text-red-400 hover:text-red-500">
                  <CrossIcon size={4} />
                </span>
              </span> }
            
            {/* <div className="w-full"> 
              <InputHeadline text="Type"/>
              <Input placeholder={'Type'} type='text' {...register("type")} />
              {errors.type && <InputError message={errors.type.message} />}
            </div> */}
            
            <span className="pt-3  " ><Button variant="primary" text={createMutation.isPending ? 'Submitting...' : 'Submit'} size="lg" disabled={createMutation.isPending} /></span>
        </motion.form> }
        </AnimatePresence>
    </>
  )
}

export default CreateContentModal

