import { useState } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { signInUser } from '../api/auth.api'
import { useNavigate } from '@tanstack/react-router'

interface SignUpProps {
    SignUpToggle : () => void
}

const Signin = ({SignUpToggle}: SignUpProps) => {
    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')
    const navigate = useNavigate()

    async function submitHandler(e:any){
        e.preventDefault()
        try{
            const response = await signInUser(email , password)
            console.log(response.data.message)
            navigate({to : '/dashBoard'})    
        }
        catch(err: any){
            console.log(err.response.data.message)
        }

    }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-4 rounded-xl border-black h-90 w-100 flex-col flex gap-6 justify-center items-center p-5">
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-3xl font-bold'> Welcome Back</h1>
                <h1> Sign in to your account</h1>
            </div>
            <form onSubmit={(e) =>submitHandler(e)} className=" flex flex-col gap-5 w-80 " action="">
                <Input placeholder="Enter email" type="email" value={email} func={(e)=>setEmail(e.target.value)}/>
                <Input placeholder="Enter password" type="password" value={password} func={(e)=> setPassword(e.target.value)}  />
    
                <Button variant="primary" text="Sign In" size="lg" />
            </form>
            <h1> Don't have an account? <span onClick={SignUpToggle} className='font-semibold cursor-pointer'> Sign Up</span></h1>
        </div>
  )
}

export default Signin