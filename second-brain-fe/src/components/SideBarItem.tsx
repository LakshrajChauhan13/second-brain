import type { ReactElement } from "react"

interface SideBarItemsInterface {
    icon : ReactElement;
    text : string
}

const SideBarItem = (props: SideBarItemsInterface) => {
  return (
    <div className="flex gap-3 py-2 px-1.5 items-center  font-semibold hover:cursor-pointer hover:bg-gray-200 rounded hover:text-gray-800 ">
        <span className="size-5"> {props.icon} </span>
        {props.text}
    </div>
  )
}

export default SideBarItem