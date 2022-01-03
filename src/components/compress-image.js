import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFileChoosen, handleChangeCompressRatio, compressSelectedFile } from '../redux/reducers/image-compress/image-compressor-slice';
import { applySavedTheme, handleToggleTheme } from '../redux/reducers/theme-handler/theme-toggle-slice';
import '../css/image-compress.css';
import CacheService from '../services/cache-service';

const dynamicCSS = {
    buttonNoImageSelected: { height: "100vh" },
    buttonImageSelected: { height: "auto" },
};

const ImageCompressor = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state?.imageCompressor);
    dispatch(applySavedTheme());
    const theme = CacheService.get("theme");

    return (
        <>
            {!state.file ?
                <div className="row img-compress-container"
                    style={state?.fileSizeInBytes > 0 ? dynamicCSS.buttonImageSelected : dynamicCSS.buttonNoImageSelected}
                >
                    <div className="col-sm-12 vh-centered">
                        <label htmlFor="original-image" className="btn btn-success btn-file">
                            {state?.fileSizeInBytes > 0 ? "Choose another Image" : "Choose an Image"}
                            <input type="file" id="original-image" accept="image/*"
                                style={{ display: 'none' }} required
                                onChange={e => dispatch(handleFileChoosen(e))}>
                            </input>
                        </label>
                    </div>
                </div> : ""
            }
            <div className="row bs-row image-preview" id="image-preview">
                <div className="col-sm-12" id="image-preview-img">
                    {/* <img id="image-preview-img" style={{ display: state.fileSizeInBytes > 0 ? "unset" : "none" }} alt={"Choosen file"} />
                    {state?.fileSizeInBytes > 0 && state.file ? CommonService.previewImage("image-preview-img", state.file) : ""} */}
                </div>
            </div>

            {
                state?.file ? (
                    <>
                        {
                            state.hideRange ?
                                (<div className="row bs-row image-size-picker">
                                    <div className="col-sm-4">Drag to select percentage for image compression</div>
                                    <div className="col-sm-6">
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                step={10}
                                                value={state?.compressRatio * 100 || 75}
                                                className="form-range"
                                                onChange={e => dispatch(handleChangeCompressRatio(e.target.value))}
                                                id="fileSizeRange"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">{state?.compressRatio * 100 || 75}%</div>
                                </div>) : ""
                        }
                        {
                            state.compressedSize ? (
                                <div className="row bs-row image-compress">
                                    <div className="col-sm-12">
                                        {state.compressedSize}
                                    </div>
                                </div>
                            ) : ""
                        }

                        <div className="row bs-row text-center image-compress vh-centered">
                            <div className="col-sm-6 vh-centered image-compress-btn" onClick={e => dispatch(compressSelectedFile(state.file))}>
                                <span className="full-width-button">{state.isFileBeingCompressed ? "Compressing..." : "Compress Image!"}</span>
                            </div>
                            <div className="col-sm-5 vh-centered image-compress-btn">
                                <label htmlFor="original-image" className="">
                                    {state?.fileSizeInBytes > 0 ? "Choose another Image" : "Choose an Image"}
                                    <input type="file" id="original-image" accept="image/*"
                                        style={{ display: 'none' }} required
                                        onChange={e => dispatch(handleFileChoosen(e))}>
                                    </input>
                                </label>
                            </div>
                            <div className="col-sm-1 vh-centered" onClick={() => dispatch(handleToggleTheme(theme))}>
                                <span>{theme === "dark" ? <i color='#FFF' className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}</span>
                            </div>
                        </div>
                    </>

                ) : ""
            }

        </>
    );

}

export default ImageCompressor;


// const options = {
//     maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
//     // maxWidthOrHeight: number,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
//     // onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100) 
//     useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

//     // // following options are for advanced users
//     // maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
//     // exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
//     // fileType: string,           // optional, fileType override
//     // initialQuality: number      // optional, initial quality value between 0 and 1 (default: 1)
// };