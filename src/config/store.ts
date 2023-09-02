import feedReducer from "../domain/home/modules/feedSlice"
import {configureStore} from "@reduxjs/toolkit"
import profileReducer from "../domain/profile/modules/profileSlice";

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        profile: profileReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
