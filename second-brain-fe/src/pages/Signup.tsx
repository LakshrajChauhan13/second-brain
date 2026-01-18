import { AnimatePresence, motion } from "framer-motion"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { signUpUser } from "../api/auth.api"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../store/toastHook"
import type { AxiosError } from "axios"
import { useForm } from 'react-hook-form'
import { safeSignUpSchema, type SignUpInput } from "../zod"
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from "../components/InputError"
import { useState } from "react"


const Signup = ({SignUpToggle}: {SignUpToggle :() => void}) => {
    const [focused, setFocused] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
        resolver: zodResolver(safeSignUpSchema)
    })
    const toast =  useToast()

    // interface userData {
    //     userName: string;
    //     email: string;
    //     password: string;
    // }

    interface ErrorMessage {
        message: string
    }

    async function submitHandler(data: SignUpInput){
        signUpMutation.mutate(data)
    }

    const signUpMutation = useMutation({
        mutationFn: (data: SignUpInput) => signUpUser(data.username, data.email, data.password),

        onSuccess: (data) => {
            console.log(data.data.message);
            const message = data.data.message;
            toast.success(message)
            SignUpToggle()
        },

        onError: (error: AxiosError<ErrorMessage>) => {
            const err = error.response?.data?.message || 'Something went wrong';
            console.log(err);
            toast.error(err)
        }
    })
        

  return ( 
    <>
    <AnimatePresence>
        <motion.div
        initial={{x:20, opacity:0, transition:{duration: 0.15, ease: "easeOut"}}}
        animate={{x:0, opacity: 1}}
        // exit={{x:20, opacity: 0, transition: {duration: 0.3, ease: "easeInOut"}}}
        className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-4 rounded-xl border-black h-110 w-100 flex-col flex gap-6 justify-center items-center p-5">
            <div className=" flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">Join us </h1>
                <h1 className="">Let's create an account</h1>
                </div>
                
            <form className=" flex flex-col gap-5 w-80 " onSubmit={handleSubmit(submitHandler)} action="">

                <div className="flex flex-col gap-0.5">
                    <Input focused={focused} setFocused={setFocused} placeholder="Username" type="text" {...register("username")} />
                    {errors.username && <InputError message={errors.username.message} />}
                </div>

                <div className="flex flex-col gap-0.5">
                    <Input focused={focused} setFocused={setFocused} placeholder="Enter email" type="email" {...register("email")} />
                    {errors.email && <InputError message={errors.email.message} />}
                </div>

                <div className="flex flex-col gap-0.5">
                    <Input focused={focused} setFocused={setFocused} placeholder="Enter password" type="password"  {...register("password")} />
                    {errors.password && <InputError message={errors.password.message} />}
                </div>


                <Button width="full" variant="primary" text={signUpMutation.isPending ? 'Signing Up...' : 'Sign Up'} size="lg" disabled={signUpMutation.isPending} />
            </form>
            <h1> Already have an account? <span onClick={SignUpToggle} className='font-semibold cursor-pointer'> Sign In</span></h1>
        
        </motion.div>
    </AnimatePresence>
    </>
  )
}

export default Signup




// /*
// const [userName , setUserName] = useState('')
//     const [password , setPassword] = useState('')
//     const [email , setEmail] = useState('')
//     const toast =  useToast()

//     interface userData {
//         userName: string;
//         email: string;
//         password: string;
//     }

//     interface ErrorMessage {
//         message: string
//     }

//     async function submitHandler(e: any){
//         e.preventDefault();
//         signUpMutation.mutate({userName, email, password})
//     }

//     const signUpMutation = useMutation({
//         mutationFn: ({userName, email, password}: userData) => signUpUser(userName, email, password),

//         onSuccess: (data) => {
//             console.log(data.data.message);
//             const message = data.data.message;
//             toast.success(message)
//             SignUpToggle()
//         },

//         onError: (error: AxiosError<ErrorMessage>) => {
//             const err = error.response?.data?.message || 'Something went wrong';
//             console.log(err);
//             toast.error(err)
//         }
//     })
        

//   return ( 
//     <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-4 rounded-xl border-black h-110 w-100 flex-col flex gap-6 justify-center items-center p-5">
//         <div className=" flex flex-col justify-center items-center">
//             <h1 className="text-3xl font-bold">Join us </h1>
//             <h1 className="">Let's create an account</h1>
//             </div>
            
//         <form className=" flex flex-col gap-5 w-80 " onSubmit={(e) => submitHandler(e)} action="">
//             <Input placeholder="Username" type="text" value={userName} func={(e) => setUserName(e.target.value)} />
//             <Input placeholder="Enter email" type="email" value={email} func={(e) => setEmail(e.target.value)}/>
//             <Input placeholder="Enter password" type="password" value={password} func={(e) => setPassword(e.target.value)}/>

//             <Button variant="primary" text={signUpMutation.isPending ? 'Signing Up...' : 'Sign Up'} size="lg" disabled={signUpMutation.isPending} />
//         </form>
//         <h1> Already have an account? <span onClick={SignUpToggle} className='font-semibold cursor-pointer'> Sign In</span></h1>

//     </div>
//   )
//  */