import { createPortal } from "react-dom"
import { Button } from "./Button"
import { AnimatePresence, motion } from "framer-motion";

interface LogoutModalProps {
    open?: boolean ;
    onClose?: () => void;
    logoutConfirm?: () => void
}

const UserLogOutModal = ({open , onClose , logoutConfirm}: LogoutModalProps) => {
    if(open){
        document.body.style.overflow = "hidden"
    }else{
        document.body.style.overflow = "unset"
    }
 
  return createPortal( 
  
  <AnimatePresence>
    {open && <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{ opacity: {duration: 0.3} }}
      onClick={onClose}
      className={`w-screen h-screen z-20 bg-slate-800/50 backdrop-blur-xs fixed inset-0`}>  
    </motion.div> }

    {open && <motion.div 
    initial={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%" }}
    animate={{ opacity:1, scale: 1, x: "-50%", y: "-50%"}}
    exit={{ opacity:0, scale: 0.9, x: "-50%", y: "-50%"}}
    transition={{ opacity: { duration: 0.2}, scale: { duration: 0.3} }}
    className={` bg-white fixed z-22 top-1/2 left-1/2 text-black flex flex-col justify-center items-center gap-7 py-5 px-8 rounded-2xl `}>
        <h1 className="text-xl font-semibold"> Are you sure you want to logout? </h1>
        <div className=" flex justify-end items-center gap-2 w-full  ">
            <span onClick={logoutConfirm}> <Button variant="tertiary" text="Log Out" size="md" /></span>
            <span onClick={onClose}> <Button variant="primary" text="Cancel" size="md" /> </span>
        </div>  
    </motion.div> }
    </AnimatePresence>,
  
    document.body
  )
}

export default UserLogOutModal