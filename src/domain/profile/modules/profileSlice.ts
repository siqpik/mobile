import {createSlice} from "@reduxjs/toolkit";
import Post from "../../home/model/Post";
import User from "../../model/User";
interface ProfileState {
    user: User,
    userName: string,
    posts: Post[],
    postsPage: number,
}

const initialState: ProfileState = {
    user: undefined,
    userName: "",
    posts: [],
    postsPage: 1,
}

const profileSlide = createSlice({
    name: "profile",
    initialState,
    reducers: {

    }
})

export const {

} = profileSlide.actions

export default profileSlide.reducer
