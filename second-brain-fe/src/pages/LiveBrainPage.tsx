import { useQuery } from "@tanstack/react-query"
import Card from "../components/Card"
import {liveBrain} from "../api/livebrain.api"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { setContent } from "../store/slice/contentSlice"
import { useParams } from "@tanstack/react-router"


export const LiveBrainPage = () => {
 
    const contents = useAppSelector(state => state.content.contents)
    const dispatch = useAppDispatch()
    const {shareLink} = useParams({ from: '/brain/$shareLink' })
    
    const {data, isLoading, error } = useQuery({
        queryKey : ['liveBrainContent', shareLink],
        queryFn : () => liveBrain(shareLink)
    })

    useEffect(() => {
        if(data){
            dispatch(setContent(data.content))
        }
    }, [data, dispatch])
    

    return (
        
        <div className="min-h-screen  max-w-7xl mx-auto flex justify-center items-start">

            {isLoading && (
                    <div className="flex  justify-center items-center w-full h-full">
                        <p className="text-gray-600 text-4xl">Loading contents...</p>
                    </div>
            )}

            {error && (
                <div className="flex justify-center items-center mt-8 pl-7">
                    <p className="text-red-600">Error loading contents</p>
                </div>
            )}
            
            {!isLoading && !error ? (<div className=" flex flex-col gap-5">
                <h1 className="text-5xl font-bold text-black/50 font-mono underline mt-10 mb-5"> Content by {data?.username} </h1>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  ">
                {contents && contents.length > 0 ? (
                            contents.map((content) => (
                                <Card
                                    key={content._id}
                                    id = {content._id}
                                    title={content.title}
                                    type={content.type}
                                    link={content.link}
                                    tags={content.tags}

                                    deleteButtonEnable = {false}
                                    // isDeleting = {deleteMutation.isPending && deleteMutation.variables === content._id}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600 text-5xl"> User has no content </p>
                        )}
            </div>
            </div>) : '' }
            
        </div>
    )
} 

export default LiveBrainPage