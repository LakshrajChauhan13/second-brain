import { axiosInstance } from "../axiosInstance";
import type { AllTags,  } from "../components/TagInput";
import type { Content } from "../store/slice/contentSlice";

export async function createContent (title: string , link: string , type: string, tags: string[]){
    const response = await axiosInstance.post('/api/v1/content' , {
        title , link , type, tags
    })
    return response.data.message;
}

export async function deleteContent (id: string){
    const response = await axiosInstance.delete(`/api/v1/content/${id}`)
    return response.data;
}

export async function getContent() {
    const response = await axiosInstance.get('/api/v1/content')
    console.log(response.data.All_content)
    const content = response.data.All_content.map((content: Content) => { 
        if(content.tags){
            const tag = content.tags.map((tag: any) => tag.title)
            return {
                link : content.link,
                type: content.type,
                title: content.title,
                tags: tag,
                _id : content._id
            }
        }
        return content
    } )
    console.log(content)
    return content
    // return response.data.All_content;
}

export async function fetchingTags(): Promise<AllTags[]> {
    const response = await axiosInstance.get('/api/v1/content/tags')
    console.log('response -> ', response.data.tags)
    return response.data.tags
}

// store now this into the redux store and show on to the UI , in te dashboard
//  want the id from the card to be deleted when click on it , just call the api to delete it from the Db and remove it from the redux store simply, if error in deleteing the content from the DB then show error