import ErrorIcon from "../icons/ErrorIcon";
import { motion } from "framer-motion";
import { TickIcon2 } from "../icons/TickIcon2";
import { DeleteIcon } from "../icons/DeleteIcon";
import type { ToastType } from "../store/slice/toastSlice";
import LogoutIcon from "../icons/LogoutIcon";

interface ToastNotificationProps {
    message: string;
    type: ToastType;
    zIndex?: number;
    index?: number
}

export const ToastNotification = ( {message , type, zIndex, index = 0 }: ToastNotificationProps) => {
    const iconVariants = {
        error: <ErrorIcon />,
        success:  <TickIcon2 />,
        copied: <TickIcon2 />,
        deleted: <DeleteIcon />,
        logout: <LogoutIcon />
    }

    const messageStyles = {
        success: "text-green-500 bg-green-50",
        error: "text-red-500/80 bg-red-50",
        copied: "text-green-500/90 bg-green-50",
        deleted: "text-red-500/80 bg-red-50",
        logout: "bg-white text-black"
    }

    const scale = 1 - (index * 0.04 );
    const yOffset = index * -10;
    const opacity = Math.max(0.3, 1 - index * 0.2);

  return (
    <>
      <motion.div
      style={{zIndex: zIndex , position: 'absolute', bottom: 0 , right: 0}}
      initial={{opacity: 0 , y:20  }}
      animate={{opacity: opacity , y: yOffset, scale: scale}}
      exit={{opacity: 0 , y:-40, scale: 0.85, transition: { duration: 0.25}}}
      transition={{type: "spring", stiffness: 400, damping: 30}}
        className={`flex gap-1 items-start justify-start rounded-lg font-semibold shadow-md shadow-black/40  max-h-20 
        break-normal w-75 ${messageStyles[type]}  px-2.5 py-3 
  `}>
             <span className="size-4 " > {iconVariants[type]} </span>
            <p className="text-xs "> {message} </p>
        </motion.div>
    </>
  );
};

/*
className="  backdrop-blur-[5px]  bg-white/5  
            shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1)]
            border border-white/10 
            px-2.5 py-1.5"  
*/