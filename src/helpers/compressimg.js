export function compressImage(imgToCompress, quality) {
    // resizing the image
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const originalWidth = 300;
    const originalHeight = 300;


    canvas.width = originalWidth;
    canvas.height = originalHeight;

    context.drawImage(
        imgToCompress,
        0,
        0,
        originalWidth,
        originalHeight
    );

    // reducing the quality of the image
    canvas.toBlob(
        (blob) => {
        },
        "image/jpeg",
        quality
    );
    return canvas.toDataURL();
}