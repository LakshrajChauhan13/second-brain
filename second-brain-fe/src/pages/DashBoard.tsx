import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import SideBar from "../components/SideBar";
import { PlusIcon } from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { deleteContent, getContent } from "../api/content.api";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeContent, setContent } from "../store/slice/contentSlice";
import DeleteContentModal from "../components/DeleteContentModal";
import { useToast } from "../store/toastHook";
import { motion, AnimatePresence } from "framer-motion";


const DashBoard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [contentToDelete , setContentToDelete] =  useState<string | null>(null)
    const dispatch = useAppDispatch()   // to dispatch an event to the reducer to update the store's value
    const contents = useAppSelector((state) => state.content.contents)      // to get the store's value
    const toast = useToast()
    const queryClient = useQueryClient()

    const { data, isLoading , error } = useQuery({
        queryKey : ['contents'],
        queryFn : getContent,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0
    })
    
    useEffect(() => {
        if(data){
            dispatch(setContent(data))
        }
    } , [data , dispatch])

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteContent(id),
        onMutate: (id) => {
            dispatch(removeContent(id))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents'] })
            toast.deleted('Content deleted !!')
        },
            
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: ['contents'] })
            toast.error('Error occurred , Deletion failed')
            console.log(error)
        }
    })
    
    async function onDelete(id: string){
        setContentToDelete(id)   
    }
            
    function onConfirmDelete(){
        if(contentToDelete){
            deleteMutation.mutate(contentToDelete)
            setContentToDelete(null)
        }
    }
    
    function onDeleteModalClose(){
        setContentToDelete(null)
    }
    
    function onClose(){
        setIsOpen(c => !c)
    }

   
    // function handleEsc(event: KeyboardEvent){
    //     if(event.key === 'Escape'){
    //         onDeleteModalClose()
    //     }
    // }

  return (
    <>
      <div className="flex w-full h-screen">
            <div className="w-82 h-full bg-white border-r-2 border-gray-300">
                <SideBar />
            </div>

            <div className="flex-1 h-screen bg-gray-200 relative overflow-y-auto">

            
                <header className="flex justify-between h-16 p-2 pl-7 items-center gap-2 sticky top-0 left-0 right-0 z-10 backdrop-blur-sm bg-white/50  " >
                    <span className="text-black font-bold text-4xl">All Notes</span>
                    <span className="flex justify-end gap-2 p-1">
                        <span onClick={() => setIsOpen(c => !c)}>
                            <Button text="Add Content" icon={<PlusIcon />} size="lg" variant="primary" />
                        </span>
                        <Button text="Share Brain" icon={<ShareIcon />} size="lg" variant="secondary" />
                    </span>
                </header>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center items-center mt-8 pl-7">
                        <p className="text-gray-600">Loading contents...</p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="flex justify-center items-center mt-8 pl-7">
                        <p className="text-red-600">Error loading contents</p>
                    </div>
                )}

                {/* Display contents from Redux */}
                {!isLoading && !error && (
                    <AnimatePresence>
                    <motion.div 
                    initial={{scale: 0.8}}
                    animate={{scale: 1}}
                    exit={{scale:0.8}}
                    className="grid grid-cols-4 gap-3 mt-8 pl-7 pr-3">
                        {contents && contents.length > 0 ? (
                            contents.map((content) => (
                                <Card
                                    key={content._id}
                                    id = {content._id}
                                    title={content.title}
                                    type={content.type}
                                    link={content.link}
                                    tags={content.tags}
                                    onDelete = {onDelete}
                                    isDeleting = {deleteMutation.isPending && deleteMutation.variables === content._id}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600 text-5xl">No content yet. Add some!</p>
                        )}
                    </motion.div>
                    </AnimatePresence>
                )}
                <DeleteContentModal open={contentToDelete !== null} deleteConfirm={onConfirmDelete} onClose={onDeleteModalClose}  />
                <CreateContentModal open={isOpen} onClose={onClose} />

                
            </div>
        </div>
            {/* <div className=" fixed bottom-5 right-5 w-80 z-9999 pointer-events-none">
                    <AnimatePresence mode="popLayout">
                        {
                            toasts && toasts.map((toast, index) => ( 
                                <ToastNotification message={toast.message} type={toast.type} key={toast.id} zIndex={9999 - index}
                                index={index}  />
                            ))
                        }
                    </AnimatePresence>
            </div> */}
    </>
    );
};

export default DashBoard;









//  <div className=" flex h-screen  ">
//         <div className="w-[20%]  h-screen bg-white border-r-2 border-gray-300">
//             <SideBar />
//         </div>

//         <div className="w-[80%] pl-7 p-2 h-screen bg-gray-200">
//             <header className="flex justify-between items-center  gap-2 p-1">
//             <span className="text-black font-bold text-3xl"> All Notes </span>
//                 <span className="flex justify-end gap-2 p-1">
//                     <span onClick={() => setIsOpen(c => !c)}> <Button text="Add Content" icon={ <PlusIcon /> } size="lg" variant="primary" /></span>
//                     <Button text="Share Brain" icon={ <ShareIcon /> } size="lg" variant="secondary" />
//                 </span>
//             </header>

//             <div className="grid grid-cols-4 mt-8">
//                 { contents.map((elem , index) => {
//                     return <Card title={elem.title} type={elem.type} link={elem.link} key={index}/>
//                 }) }
//                 {/* <Card title="yt video" type="Video" link="https://youtu.be/cUIRxFvAOqE" />
//                 <Card title="tweet" type="Tweet" link="https://x.com/akshaymarch7/status/1998638095642800513?s=20" />
//                 <Card title="yt video" type="Video" link="https://youtu.be/9rp_1TYDlkY?si=8LXOnEfvHMnmIVuz" /> */}
//             </div>
            
//             <CreateContentModal open={isOpen} onClose={onClose} />
//         </div>
        
//     </div>