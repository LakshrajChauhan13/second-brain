import { motion } from "framer-motion"

interface TextInterface{
    text: string
}

const Tag = ({text}: TextInterface) => {
  return (
    <motion.span className="px-2 py-0.5 rounded-full flex justify-between items-center gap-px text-purple-600 bg-purple-300 border border-indigo-400 font-semibold text-xs">
        <span className="font-bold"> # </span> 
        <span className="mb-0.5">{text}</span> 
    </motion.span>
  )
}

export default Tag