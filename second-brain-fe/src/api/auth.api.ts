import { redirect } from "@tanstack/react-router";
import { axiosInstance } from "../axiosInstance";

export async function signUpUser(username: string , email: string , password: string){

    const response = await axiosInstance.post('/api/v1/signup' , {
            email : email,
            password: password,
            username : username
        })
    return response
}

export async function signInUser(email: string , password: string){

    const response = await axiosInstance.post('/api/v1/signin' , {
        email: email,
        password: password
    })
    return response;
}

export async function getCurrentUser(){
    try{
        const response = await axiosInstance.get('/api/v1/auth/me')
        console.log(response.data.message)
    }
    catch(err: any){
        console.log(err.response.data.message)
        throw redirect({to : '/auth'})
        
    }
 
}
