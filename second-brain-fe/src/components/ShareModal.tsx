import { useMutation } from "@tanstack/react-query";
import { Button } from "./Button";
import { makeTheBrainLive } from "../api/livebrain.api";
import { useState } from "react";
import { useToast } from "../store/toastHook";
import type { AxiosError } from "axios";
import type { ErrorMessage } from "../pages/Signin";
import { success } from "zod";

interface ShareModalInterface {
    open: boolean | undefined;
    onClose?: () => void
}

export const ShareModal = ({open, onClose}: ShareModalInterface) => {
    const [isBrainLive, setIsBrainLive] = useState(false)
    const [isBrainLiveIndicate, setIsBrainLiveIndicated] = useState(false)
    const [liveLink, setLiveLink] = useState<string | null>('')
    const toast = useToast()

    const brainLiveMutation = useMutation({
        mutationFn: (status: boolean) =>
            makeTheBrainLive(status),
        
        onSuccess: (data) => {
            toast.success('success')
            setLiveLink( `http://localhost:5173/brain/${data}`)
            setIsBrainLiveIndicated(c => !c)
            timeOut()
            console.log(data);
        },

        onError: (error: AxiosError<ErrorMessage> ) => {
            console.log(error);
            toast.error('Failed to publish it live, Try again later !')
        }

    })

    function publishBrain(){
        var newStatus = !isBrainLive
        setIsBrainLive(c => !c)
        brainLiveMutation.mutate(newStatus)
    }

    function timeOut() {
        if(!isBrainLive){
            setTimeout(() => {
                setLiveLink(null)
            }, 5000 );
        }
    }    

    
    return (
        <div>
            {open && (
                <div className="bg-gray text-md absolute top-15 right-2 flex flex-col gap-1.5 bg-white border-2 border-gray-400 px-4 py-3 rounded-2xl ">
                    <h1 className="text-lg font-semibold flex justify-start items-center  px-4.5  my-5">
                        Share the Brain with world.
                    </h1>

                    {liveLink  
                    ? <h2 className={`px-2 py-1.5 rounded-lg text-sm font-semibold ${ isBrainLive ? 'text-green-600/80 bg-green-200/40 border-green-800/50' : 'text-red-500/80 bg-red-200/40 border-red-800/50' }  border-2 border-black/20  overflow-auto`}> 
                       { isBrainLive ? liveLink : <p> Brain is Unpublished </p>}  </h2>    
                    : '' }

                    <span onClick={publishBrain}>
                        <Button text={
                            isBrainLiveIndicate ?  (brainLiveMutation.isPending ? 'Unpublishing...' : 'Unpublish') : 
                            (brainLiveMutation.isPending ? 'Publishing...' : 'Publish')

                        } width="full" size="md" variant={isBrainLiveIndicate ? 'tertiary' : 'primary'} disabled={brainLiveMutation.isPending}/>
                    </span>


                </div>
            )}
        </div>
    )
}