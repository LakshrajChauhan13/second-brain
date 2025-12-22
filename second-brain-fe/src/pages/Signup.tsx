import { useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { signUpUser } from "../api/auth.api"


const Signup = ({SignUpToggle}: {SignUpToggle :() => void}) => {
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')

    async function submitHandler(e: any){
        e.preventDefault();
        try{
            const response = await signUpUser(userName , email , password)
            console.log(response.data.message)
            SignUpToggle()
        }
        catch(err: any){
            console.log(err.response.data.message)
        }
    }
        

  return ( 
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] border-4 rounded-xl border-black h-110 w-100 flex-col flex gap-6 justify-center items-center p-5">
        <div className=" flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Join us </h1>
            <h1 className="">Let's create an account</h1>
            </div>
            
        <form className=" flex flex-col gap-5 w-80 " onSubmit={(e) => submitHandler(e)} action="">
            <Input placeholder="Username" type="text" value={userName} func={(e) => setUserName(e.target.value)} />
            <Input placeholder="Enter email" type="email" value={email} func={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Enter password" type="password" value={password} func={(e) => setPassword(e.target.value)}/>

            <Button variant="primary" text="Sign Up" size="lg" />
        </form>
        <h1> Already have an account? <span onClick={SignUpToggle} className='font-semibold cursor-pointer'> Sign In</span></h1>

    </div>
  )
}

export default Signup