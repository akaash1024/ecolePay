import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../features/user/userSlice"






export const store = configureStore(
    {
        reducer: {
            users: userReducers,
        }
    }
)