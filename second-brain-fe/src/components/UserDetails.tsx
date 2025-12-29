import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { signOutUser } from "../api/auth.api";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useToast } from "../store/toastHook";
import { removeUser } from "../store/slice/userSlice";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import type { ErrorMessage } from "../pages/Signin";
import LogoutIcon from "../icons/LogoutIcon";
import MoonIcon from "../icons/MoonIcon";
import { useState } from "react";
import UserLogOutModal from "./UserLogOutModal";
import UserIcon from "../icons/UserIcon";

const UserDetails = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.user.userData)
    const toast = useToast()
    const navigate = useNavigate()
    const [logOutModal , setLogOutModal] = useState(false) 

    const signOutMutation = useMutation({
        mutationFn: () => signOutUser(),
        onSuccess: (data) => {
            console.log(data.data.message);
            dispatch(removeUser())
            toast.logout(data.data.message)
            navigate({ to: '/auth'})
        },
        onError: (error: AxiosError<ErrorMessage>) => {
            const err = error.response?.data?.message || "Something went wrong" 
            console.log(error)
            toast.error(err)
        }
    })

    function signOutModalToggle(){
        setLogOutModal(c => !c)
    }

    function LogOutConfirm(){
        signOutMutation.mutate()
        localStorage.removeItem("isAuthenticated")
    }

    return (
    <>
        <div  className="w-full h-13 bg-black/5 hover:bg-black/8 duration-500 mt-auto mb-2 px-1  rounded flex justify-start items-center gap-1.5"> 
            <div className="h-9 w-9 rounded-full border-2 flex items-center justify-center text-black/80" >
                <UserIcon />
            </div>

            <div className=" h-11 w-45 text-white items-start  flex flex-col leading-6.5 ">
                <h4 className="break-all line-clamp-1 text-md cursor-default  text-black/90"> {userData?.username} </h4> 
                <h6 className="break-all line-clamp-1 text-xs font-semibold cursor-default text-gray-900/50 "> {userData?.email} </h6>
            </div>

            <div className="h-11 gap-1.5 w-20 rounded flex justify-center items-center  ">
                <div className="bg-slate-900/15 hover:bg-slate-900/30 rounded">
                    <motion.button
                        whileHover={{scale:1.1, backgroundColor:"rgba(239, 68, 68, 1)", color:"#ffffff" }}
                        transition={{ scale: {duration: 0.4} , color:{duration:0.2} , backgroundColor: {duration: 0.2} }}
                        whileTap={{scale:0.95}}
                        className=" cursor-pointer py-2 px-1.6 h-7.5 w-8 flex justify-center items-center rounded"
                        onClick={signOutModalToggle}>
                            <LogoutIcon />
                    </motion.button>
                </div>

                <div className="bg-slate-900/15 hover:bg-slate-900/30 rounded">
                    <motion.button 
                        whileHover={{scale:1.25 , rotate:-12}}
                        transition={{ scale: { duration: 0.3}, rotate: { duration: 0.2}}}
                        whileTap={{scale:0.95}}
                        className=" cursor-pointer py-2 px-1.6 h-7.5 w-8 flex justify-center items-center rounded">
                            <MoonIcon />
                    </motion.button>
                </div>
            </div>

        </div>

        <UserLogOutModal open={logOutModal} logoutConfirm={LogOutConfirm} onClose={signOutModalToggle} />
        
    </>
    )
}

export default UserDetails;