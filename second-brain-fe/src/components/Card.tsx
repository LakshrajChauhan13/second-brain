import { useState, type ReactElement } from "react";
import { DeleteIcon } from "../icons/DeleteIcon"
import ShareIcon from "../icons/ShareIcon"
import { DocumentIcon } from "../icons/DocumentIcon";
import { VideoIcon } from "../icons/VideoIcon";
import { getYouTubeEmbedUrl } from "../utils";
import { TwitterIcon } from "../icons/TwitterIcon";
import CopyIcon from "../icons/CopyIcon";
import { TickIcon } from "../icons/TickIcon";

interface CardPropsInterface {
    id : string;
    title: string;
    type: 'Document' | 'Video' | 'Tweet';
    link: string;
    onDelete: (id: string) => void;
    isDeleting? : boolean;
}

interface BrainTypeInterface {
    Document?: ReactElement;
    Video?: ReactElement;
    Tweet?: ReactElement;
}

const brainType: BrainTypeInterface= {
    Document : <DocumentIcon />,
    Video : <VideoIcon />,
    Tweet : <TwitterIcon />
}

const iconStyle = "size-4 text-slate-400 font-bold"

const Card = (props: CardPropsInterface) => {

    const [isCopied , setIsCopied] = useState(false)
    
     async function deleteIt(){
        props.onDelete(props.id)
    }

    async function shareContent(data: string){
        
        const shareMessages = {
            Video: `Watch this video: ${props.title}`,
            Tweet: `Checkout this tweet: ${props.title}`,
            Document: `Read this document: ${props.title}`,
        }

        const shareData = {
            url: props.link,
            title: props.title,
            text: shareMessages[props.type]
        }

        if(navigator.share){
            try {
                await navigator.share(shareData)
            }
            catch (err){
                if( err instanceof Error && err.name !== 'AbortError'){
                    console.log('Error sharing:' , err)
                    fallBackCopy()
                }
            }
        }
        else{
            fallBackCopy();
        }
    }

    function fallBackCopy(){
        navigator.clipboard.writeText(props.link)
        .then(() => alert('Link Copied to clipboard'))
        .catch(err => console.error('Failed to copy:' , err))
    }

    function onCopy(){
        fallBackCopy()
        copySwitch()
        setTimeout(() => {
            copySwitch()
        }, 2000);
    }

    function copySwitch(){
        setIsCopied(c => !c)
    }
    

  return (
    <div className={`flex flex-col gap-2 min-h-50 max-w-75 text rounded-lg p-2 bg-white shadow-gray-500/40 shadow 
    ${props.isDeleting? 'opacity-30' : ''} `}>

        <div className="flex items-center justify-between pb-1.5 gap-4 ">
            <div className="flex items-center justify-center gap-1.5">
                <div className={`shrink-0 size-5 text-slate-950 `}> {brainType[props.type]}</div>
                <div className="break-all line-clamp-2 cursor-pointer" title={props.title}> {props.title} </div>
            </div>

            <div className="flex items-center justify-center gap-2.5">
                <span onClick={() => shareContent(props.link)} className={` ${iconStyle} hover:text-blue-600 hover:transition duration-130 ease-in-out cursor-pointer `}>
                     <ShareIcon /> 
                </span>
                <span onClick={() => onCopy()} className={` ${iconStyle} hover:text-green-600 transition-all duration-130 ease-in-out cursor-pointer `}>
                     { isCopied ? <span className="text-green-600 "><TickIcon /></span> : <CopyIcon /> } 
                </span>
                <span onClick={deleteIt} className={` ${iconStyle} cursor-pointer hover:text-red-400 hover:transition duration-150 ease-in-out`}> 
                    <DeleteIcon /> 
                </span>
            </div>
        </div>
        
    <div className={`w-full rounded-sm ${ props.type ==='Tweet' ? 'h-60 ' : 'h-60' }   overflow-hidden`}>
    {props.type === 'Video' && <iframe className="w-full h-full" width="560" height="315" src={getYouTubeEmbedUrl(props.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
    {props.type === 'Tweet' && 
            <blockquote className="twitter-tweet" data-width="400">
                <a href={props.link.replace('x.com' , 'twitter.com')}></a> 
            </blockquote>
    }       
        {/* <div style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '200%' }}>
            <blockquote className="twitter-tweet" data-width="400">
                <a href="https://twitter.com/username/status/807811447862468608"></a> 
            </blockquote>
        </div> */}
    </div>

        <div className="flex gap-1.5 flex-wrap">
            <span>tag</span>
            <span>tag</span>
            <span>tag</span>
        </div>
    </div>
  )
}

export default Card