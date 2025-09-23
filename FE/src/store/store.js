import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../features/user/userSlice"
import transactionReducers from "../features/transactions/transactionSlice"





export const store = configureStore(
    {
        reducer: {
            users: userReducers,
            transactions: transactionReducers
        }
    }
)