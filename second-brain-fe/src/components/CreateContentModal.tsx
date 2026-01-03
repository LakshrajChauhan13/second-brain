import React, { useEffect, useState } from "react"
import { AnimatePresence, easeOut, motion } from "framer-motion";
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
import { TagInput } from "./TagInput";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const contentType = ['Video', 'Tweet', 'Document', 'Link', 'Linkedin'] 

const CreateContentModal = ({open,onClose}: CreateContentModalProps) => {
  const queryClient = useQueryClient()
  const { register,
      handleSubmit,
      reset,
      setValue,
      watch,
      control,
      formState: { errors },} = useForm<CreateContentInput>({
      resolver: zodResolver(safeCreateContentSchema),
      defaultValues:{
        title: "",
         link: "",
        //  type: "", // or generic empty string if you prefer
         tags: [] 
      }
    })

    const [isVisible, setIsVisible] = useState(false);
    const toast = useToast()
    const currentType = watch("type")
    const [autoType, setAutoType] = useState('')
    const [focused, setFocused] = useState('')
    
    
    const createMutation = useMutation({
          mutationFn: (data: CreateContentInput) => 
            createContent(data.title , data.link , data.type, data.tags),

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
        else if(val.includes("twitter.com") ||val.includes("x.com")  ){
          setValue("type" , "Tweet");
          setAutoType("Tweet")
        }
        else if(val.includes("Linkedin.com")){
          setValue("type" , "Linkedin");
          setAutoType("Linkedin")
        }
        else if(val.includes(".pdf") ||val.includes(".word")  ){
          setValue("type" , "Document");
          setAutoType("Document")
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
        transition={{ opacity: {duration: 0.7}}}
        onClick={() => {onClose(); reset()}} 
        className={`z-20 bg-black/50 fixed inset-0  `}>  </motion.div> }
        
        {open && 
        <motion.form 
        initial={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%" }}
        animate={{ opacity:1, scale: 1, x: "-50%", y: "-50%"}}
        exit={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%"}}
        transition={{ opacity: { duration: 0.2}, scale: { duration: 0.3} }}
        onSubmit={handleSubmit(submitHandler)} 
        className= "bg-white fixed z-30 top-1/2 left-1/2 text-black flex flex-col justify-center items-center gap-3 w-100 px-5 py-5 rounded-lg ">
            <div className="w-full flex justify-between items-start"> 
            <h1 className="text-2xl text-black/70  font-bold tracking-tighter hover:bg-black/7 cursor-default duration-200  bg-black/5 px-3 py-2 rounded-lg ">Let's Add Content . . .</h1>
              <span onClick={() => {onClose(); reset(); setAutoType(''); setFocused('')}} className=" h-max-1px  hover:cursor-pointer hover:text-red-600 transition-all duration-170 ease-in-out  "> 
                <CrossIcon size={5} /> 
              </span>
            </div>


            <div className="w-full ">
              <InputHeadline text="Title"/>
              <Input focused={focused} setFocused={setFocused} placeholder={'Add Title'} type='text' {...register("title")}  />
              {errors.title && <InputError message={errors.title.message} />}
            </div>

            <div className="w-full">
              <InputHeadline text="Link"/>
              <Input focused={focused} setFocused={setFocused} placeholder={'Drop Link'} type='text' {...register("link",{ onChange: (e) => handleLinkChange(e)})} />
              {errors.link && <InputError message={errors.link.message} />}
            </div>

            <TagInput
              name="tags"
              control={control}
              error={errors.tags?.message}
             />

            <div className="flex flex-col gap-2 w-full">
              <InputHeadline text="Type" />
                <div className="grid grid-cols-3 justify-start gap-2">  
              {contentType.map((type) => (
                <button 
                  key={type}
                  type="button" // Prevent form submission
                  onClick={() => setValue("type", type)} // Manually set RHF value
                  className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer  hover:shadow-black/40 shadow-md  transition-all duration-200 ${
                    currentType === type
                      ? "text-purple-600 bg-purple-300 border"
                      : "bg-gray-200 text-gray-700/50 hover: border-gray-700/40 hover:text-gray-500  border"
                  }`}
                >
                  {type}
                </button>))}
                </div>
            </div>
            <input type="hidden" {...register("type")} />

            {currentType !== autoType && 
              <span className="flex gap-1 items-start justify-between"> 
                <InputError message="Make sure to choose right type" /> 
                <motion.span 
                  whileTap={{scale:0.8}} 
                  whileHover={{scale: 1.2}}
                  // type="button" 
                  onClick={() => setAutoType(currentType)} className="  pt-0.5  cursor-pointer text-red-300 hover:scale-120 hover:text-red-400 ">
                    <CrossIcon size={4} />
                </motion.span>
              </span> }
            
            {/* <div className="w-full"> 
              <InputHeadline text="Type"/>
              <Input placeholder={'Type'} type='text' {...register("type")} />
              {errors.type && <InputError message={errors.type.message} />}
            </div> */}
            
            <motion.span whileTap={{scale: 0.9}} className="pt-3 w-full " ><Button width="full" variant="primary" text={createMutation.isPending ? 'Submitting...' : 'Submit'} size="md" disabled={createMutation.isPending} /></motion.span>
        </motion.form> }
        </AnimatePresence>
    </>
  )
}

export default CreateContentModal

