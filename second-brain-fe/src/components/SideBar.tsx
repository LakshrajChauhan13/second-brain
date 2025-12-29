import { type ReactElement } from "react"
import { DocumentIcon } from "../icons/DocumentIcon"
import { LinkIcon } from "../icons/LinkIcon"
import { TagIcon } from "../icons/TagIcon"
import SideBarItem from "./SideBarItem"
import { TwitterIcon } from "../icons/TwitterIcon"
import { VideoIcon } from "../icons/VideoIcon"
import { BrainIcon } from "../icons/BrainIcon"
import UserDetails from "./UserDetails"

const SideBar = () => {

    interface ItemsInterface {
        icon: ReactElement,
        text: string
    }
    const items: ItemsInterface[] = [
        {
            icon : <DocumentIcon />,
            text : "Documents"
        },
        {
            icon : <VideoIcon />,
            text : "Video"
        },
        {
            icon : <TwitterIcon />,
            text : "Tweets"
        },
        {
            icon : <LinkIcon />,
            text : "Links"
        },
        {
            icon : <TagIcon />,
            text : "Tags"
        },
    ]

    

  return (
    <div className="flex flex-col gap-5 px-2 w-82 fixed h-screen">
        <div className="text-2xl font-bold py-1.5 flex gap-1 items-center"> 
            <span className="text-blue-700"> <BrainIcon /> </span> 
            Second Brain
        </div>
        <div className="flex flex-col gap-2 text-slate-600  px-2">
            { items.map((elem , index) => {
               return <SideBarItem icon={elem.icon} text={elem.text} key={index}/>
            })}
        </div>

        <UserDetails />
        
       
    </div>
  )
}

export default SideBar