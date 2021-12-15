import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const counterSlices = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => { state?.value ? state.value++ : state.value = 1 },
        decrement: (state, action) => { state?.value ? state.value-- : state.value = -1 },
        incrementBy: (state, action) => { state?.value ? state.value += action.payload : state.value = action.payload },
    },
});

// Action creators
export const { increment, decrement, incrementBy } = counterSlices.actions;

// Exporting reduces
export default counterSlices.reducer;