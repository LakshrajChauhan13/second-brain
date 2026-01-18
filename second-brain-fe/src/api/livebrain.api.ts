import { axiosInstance } from "../axiosInstance";
import type { Content } from "../store/slice/contentSlice";

export async function liveBrain(shareLink: string) {
    const response = await axiosInstance.get(`/api/v1/brain/${shareLink}`)
    console.log(response)
    const content = response.data.content.map((content: Content) => {
        if(content.tags){
            const tag = content.tags.map((tags: any) => tags.title)

            return {
                link : content.link,
                type: content.type,
                title: content.title,
                tags: tag,
                _id : content._id
            }
        }
        return content
    })
    console.log(content)
    return {
        username : response.data.username,
        content : content
    }
}

export async function makeTheBrainLive(status: boolean){
    const response = await axiosInstance.post('/api/v1/brain/share', {
        share: status
    })
    console.log(response)
    return response.data.message
}