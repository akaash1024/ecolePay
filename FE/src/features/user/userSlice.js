
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../api/axios";

export const loginUser = createAsyncThunk("users/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/api/trustee/login", credentials);
        console.log(data);

        return data; // { message, user }
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
});

export const logoutUser = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/api/trustee/logout");
        console.log(data);

        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Logout failed" });
    }
});

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/api/trustee/me");
        return data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Failed to fetch user" });
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        status: "idle",
        error: null,
        message: null,
        school: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.school = action.payload.school;
                state.currentUser = action.payload.userData;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user;
                state.school = action.payload.school;
                state.message = action.payload.message;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.message = "Logged out successfully";
            })

            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            )

            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = "succeeded";
                }
            )

            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.payload?.message || "Something went wrong";
                }
            );
    }


})

export default userSlice.reducer;
