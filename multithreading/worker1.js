const { workerData, parentPort } = require("worker_threads");
const sharp = require("sharp");

const { src, width, height } = workerData;

console.log(`Resizing ${src} to ${width}px wide`);
const resize = async () => {
    await sharp(src.path)
        .resize(width, height)
        .toFile('uploads/' + 'thumbnails-' + width + src.originalname, (err, resizeImage) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(resizeImage);
                        }
                    });
};

resize();