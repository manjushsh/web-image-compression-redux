const CommonService = {

    getOriginalFileSize: (fileSize: number, decimals: number = 2) => {
        if (fileSize === 0) return { size: 0, unit: 'Bytes' };
        const k = 1024; // Use 1000 for size in Bits
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(fileSize) / Math.log(k));
        return { size: parseFloat((fileSize / Math.pow(k, i)).toFixed(dm)), unit: sizes[i] };
    },
    previewImage: (elementId = 'preview', file: any) => {
        let image: any = document.getElementById(elementId);
        if (image)
            image.src = URL.createObjectURL(file);
    },
    getBase64: (image: any, setBackgroundToNode = "image-preview") => {
        // If no files were selected, or no FileReader support, return
        if (!image || !window.FileReader) return;
        // Only proceed if the selected file is an image
        if (/^image/.test(image.type)) {

            const reader = new FileReader();
            reader.onloadend = function () {
                document.getElementById(setBackgroundToNode)!.style.backgroundImage = "url(" + reader.result + ")";
                return reader.result;
            }
            if (image) {
                reader.readAsDataURL(image);
            } else {
                console.debug("No Image selected");
            }

        };
    },
};

export default CommonService;