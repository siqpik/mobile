import {createSlice} from "@reduxjs/toolkit";
import ProfilePost from "@/src/domain/profile/model/ProfilePost";

interface ProfileState {
    posts: ProfilePost[],
}

const initialState: ProfileState = {
    posts: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        reset(state) {
            state.posts = []
        },
        successSearchingPosts(state: ProfileState, posts: any, page: number) {
            state.posts = page === 1 ? posts.payload : [...state.posts, ...posts.payload]
        },
        addPostReaction(state, postId) {
            state.posts = state.posts.map(post => {
                return post.id === postId.payload
                    ? {...post, likesCount: post.reactionsCount + 1, iReacted: !post.iReacted}
                    : post
            })
        },
        removeReaction(state, postId) {
            state.posts = state.posts.map(post => {
                return post.id === postId.payload
                    ? {...post, likesCount: post.reactionsCount - 1, iReacted: !post.iReacted}
                    : post
            })
        },
    }
})

export const {
    successSearchingPosts,
    removeReaction,
    addPostReaction,
    reset
} = profileSlice.actions

export default profileSlice.reducer
