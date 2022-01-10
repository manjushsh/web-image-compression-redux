import { configureStore } from "@reduxjs/toolkit";
import imageCompressorReducer from "../reducers/image-compress/image-compressor-slice";
import ThemeToggleSlice from "../reducers/theme-handler/theme-toggle-slice";
// import counterReducer from "../reducers/counter/counter-reducer";
// import postSlice from "../reducers/posting-api/post-slice";
// import { counterSlices } from "../reducers/counter-reducer";

const store = configureStore({
    reducer: {
        imageCompressor: imageCompressorReducer,
        ThemeToggler: ThemeToggleSlice,
        // counter: counterSlices,
        // counter: counterReducer,
        // getFromAPI: postSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;