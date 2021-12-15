import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

// Actions
export const getFromURL = createAsyncThunk('post/list', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        return data;
    }
    catch (error) {
        return error?.response;
    }
});

const postSlices = createSlice({
    name: "post",
    initialState,
    extraReducers: {
        [getFromURL.pending]: (state, action) => { state.isFetchingUserData = true; },
        [getFromURL.fulfilled]: (state, action) => {
            state.userData = action.payload;
            state.isFetchingUserData = false;
        },
        [getFromURL.rejected]: (state, action) => {
            state.isFetchingUserData = false;
            state.error = action.payload;
        },
    },
});

// Reducer to export
export default postSlices.reducer;