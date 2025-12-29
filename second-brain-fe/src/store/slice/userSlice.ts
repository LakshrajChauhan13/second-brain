import { createSlice } from "@reduxjs/toolkit";

interface UserData {
    email: string | null;
    username: string | null;
}

interface user {
    userStatus: boolean;
    userData: UserData | null
}

const initialState: user = {
    userStatus: false,
    userData: {
        email: null,
        username: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userStatus = true,
            state.userData = action.payload
        },

        removeUser: (state) => {
            state.userStatus = false,
            state.userData = null
        } 
    }

})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer
