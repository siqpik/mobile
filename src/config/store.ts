import feedReducer from "../domain/home/modules/feedSlice"
import profileReducer from "../domain/profile/modules/profileSlice"
import {configureStore} from "@reduxjs/toolkit"
import profileSlice from "@/src/domain/profile/modules/profileSlice";

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>