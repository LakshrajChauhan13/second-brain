import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { signInUser } from '../api/auth.api'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../store/toastHook'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { safeSignInSchema, type SignInInput } from '../zod'
import { zodResolver } from '@hookform/resolvers/zod'
import InputError from '../components/InputError'

interface SignUpProps {
    SignUpToggle : () => void
}

interface userData {
    email: string;
    password: string
}

export interface ErrorMessage {
    message: string
}

const Signin = ({SignUpToggle}: SignUpProps) => {
   const {register, handleSubmit, formState: { errors } } = useForm<SignInInput>({
    resolver: zodResolver(safeSignInSchema)
   })
    const toast = useToast()
    const navigate = useNavigate()

    async function submitHandler(data: SignInInput){
        signInMutation.mutate(data)
    }

    const signInMutation = useMutation({
        mutationFn: (data: SignInInput) => signInUser(data.email, data.password),

        onSuccess: (data) => {
            const message = data.data.message;
            console.log(message);
            toast.success(message)
            navigate({to : '/dashboard'})
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
     initial={{x:-20, opacity:0}}
     animate={{x:0, opacity: 1}}
    //  exit={{x:-20, opacity: 0, transition: {duration: 0.3, ease: "easeInOut"}}}
    //  transition={{}}
     className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-4 rounded-xl border-black h-90 w-100 flex-col flex gap-6 justify-center items-center p-5">
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-3xl font-bold'> Welcome Back</h1>
                <h1> Sign in to your account</h1>
            </div>
            
            <form onSubmit={handleSubmit(submitHandler)} className=" flex flex-col gap-5 w-80 " action="">
                <div className='flex flex-col gap-0.5'>
                    <Input placeholder="Enter email" type="email" {...register("email")} />
                    {errors.email && <InputError message={errors.email.message} />}
                </div>

                <div className='flex flex-col gap-0.5'>
                    <Input placeholder="Enter password" type="password" {...register("password")}  />
                    {errors.password && <InputError message={errors.password.message} />}
                </div>

                <Button variant="primary" text={signInMutation.isPending? 'Signing in...' : 'Sign In'} size="lg" disabled={signInMutation.isPending} />
            </form>
            <h1> Don't have an account? <span onClick={SignUpToggle} className='font-semibold cursor-pointer'> Sign Up</span></h1>
        </motion.div>
    </AnimatePresence>
    </>
  )
}

export default Signin