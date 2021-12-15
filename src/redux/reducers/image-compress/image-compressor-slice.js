import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import CommonService from "../../../services/common-service";
import ConfigService from "../../../services/config-service";
import DownloadService from "../../../services/download-service";

const { imageCompression } = window;

// Async Actions
export const compressSelectedFile = createAsyncThunk('image-compress/compress-selected-file', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const file = payload;
        const compressedFile = await imageCompression(file, ConfigService.image.compressionOptions);
        return compressedFile;
    }
    catch (error) {
        return error;
    }
});

const imageCompressionSlice = createSlice({
    name: "image-compress",
    initialState: {},
    reducers: {
        handleFileChoosen: (state, action) => {
            const file = action.payload?.target?.files[0];
            if (file && file.size) {
                state.fileSizeInBytes = file.size;
                state.compressRatio = 0.75;
                state.file = file;
                // const compressedFile = compressSelectedFile(file);
                // const { size, unit } = CommonService.getOriginalFileSize(compressedFile.size);
                // state.compressedSize = `${size}${unit}`;
            }
            else {
                state.fileSizeInBytes = 0;
                state.compressRatio = 0.75;
                state.file = null;
            }
        },
        handleChangeCompressRatio: (state, action) => { state.compressRatio = action?.payload / 100; },
    },
    extraReducers: {
        [compressSelectedFile.pending]: (state, action) => { state.isFileBeingCompressed = true; },
        [compressSelectedFile.fulfilled]: (state, action) => {
            const file = action.payload;
            DownloadService.downloadBlob(file, file.name || "compressed.jpg");
            // const { originalSize, originalUnit } = CommonService.getOriginalFileSize(state.file.size);
            // const { compressedSize, compressedUnit } = CommonService.getOriginalFileSize(action.payload.size);
            // state.imageSize = {
            //     originalSize, originalUnit,
            //     compressedSize, compressedUnit,
            // };
            state.fileSizeInBytes = 0;
            state.compressRatio = 0.75;
            state.file = null;
            state.error = null;
            state.isFileBeingCompressed = false;
        },
        [compressSelectedFile.rejected]: (state, action) => {
            state.isFileBeingCompressed = false;
            state.error = action.payload;
            console.error("Caught and error! Error: ", action.payload);
        },
    }
});

// Actions 
export const { handleFileChoosen, handleChangeCompressRatio } = imageCompressionSlice.actions;

// Reducers
export default imageCompressionSlice.reducer;