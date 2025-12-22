import { axiosInstance } from "../axiosInstance";

export async function createContent (title: string , link: string , type: string){
    const response = await axiosInstance.post('/api/v1/content' , {
        title , link , type
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
    return response.data.All_content;
}   

// store now this into the redux store and show on to the UI , in te dashboard
//  want the id from the card to be deleted when click on it , just call the api to delete it from the Db and remove it from the redux store simply, if error in deleteing the content from the DB then show error