

import { createAsyncThunk, createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";


export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async (currentPage, { rejectWithValue }) => {

    try {
        const { data } = await api.get(`/api/order/transactions?page=${currentPage}`)
        console.log(data);


        return {
            page: currentPage,
            ordersList: data.ordersList,
            totalOrders: data.totalOrders
        };

    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to fetch transactions" })
    }
})

export const fetchTransactionStatus = createAsyncThunk("transactions/fetchTransactionStatus", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/api/order/check-status/${id}`)
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to fetch transaction status" })
    }
}
)





const transactionSlice = createSlice({
    name: "transactions",
    initialState: {
        pages: {},
        pageStatus: {},
        totalPages: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state, action) => {
                const page = action.meta.arg;
                console.log(page);

                state.pageStatus[page] = "loading";
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                const { page, ordersList, totalOrders } = action.payload;
                state.pages[page] = ordersList;
                state.totalPages = Math.ceil(totalOrders / 10);
                state.pageStatus[page] = "succeeded";
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                const page = action.meta.arg;
                state.pageStatus[page] = "failed";
                state.error = action.payload?.message || "Something went wrong";
            });
    },
});




export default transactionSlice.reducer