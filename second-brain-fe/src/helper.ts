import { QueryClient } from "@tanstack/react-query"
import { getCurrentUser } from "./api/auth.api"
import { addUser } from "./store/slice/userSlice"
import { redirect } from "@tanstack/react-router"
import { store } from "./store/store"

export const 
checkAuth = async () => {
    const queryClient = new QueryClient()

    try{
        const response = await queryClient.fetchQuery({
            queryKey: ['user'],
            queryFn: getCurrentUser,
            staleTime: 1000 * 60 * 5, 
            retry: false
        })

        if(response){
            store.dispatch(addUser(response.data.user)) 
            localStorage.setItem("isAuthenticated", "true")
            console.log(response.data.message ,response.data.user)
        }
        else{
            throw redirect({to: '/auth'})
        }
    }
    catch(err){
        console.error(err)
        throw redirect({ to: '/auth'})
    }
    
}


export const ifAuthenticated = () => { 
    const userStatus = localStorage.getItem("isAuthenticated")
    
    if(userStatus == "true"){
        throw redirect ({ to: '/dashboard'})
    }
}