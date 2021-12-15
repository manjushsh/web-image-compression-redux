import { createAction, createReducer } from "@reduxjs/toolkit";

export const increment = createAction('increment/counter');
export const decrement = createAction('decrement/counter');
export const incrementBy = createAction('incrementBy/counter');

const initialState = {};

// // Builder Notation - Recomended one
// export const counterSlices = createReducer(initialState, builder => {
//     builder.addCase(increment, (state, action) => {
//         state?.value ? state.value++ : state.value = 1;
//     });
//     builder.addCase(decrement, (state, action) => {
//         state?.value ? state.value-- : state.value = -1;
//     });
//     builder.addCase(incrementBy, (state, action) => {
//         state?.value ? state.value += action.payload : state.value = action.payload;
//     });
// });

// Map Notation
export const counterSlices = createReducer(initialState, {
    [increment]: (state, action) => { state?.value ? state.value++ : state.value = 1 },
    [decrement]: (state, action) => { state?.value ? state.value-- : state.value = -1 },
    [incrementBy]: (state, action) => { state?.value ? state.value += action.payload : state.value = action.payload },
});