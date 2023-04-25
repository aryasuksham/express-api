const express = require("express");
const { Worker } = require("worker_threads");
const { upload } = require("./common");

const app = express();
const port = process.env.PORT || 3020;

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});


app.post('/thumbnail', async (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
                res.send("Error occurred while uploading image");
            } else {
                const sizes = [
                    { width: 640, height: 640 },
                    { width: 400, height: 400 },
                    { width: 200, height: 200 }
                ];
                for (const size of sizes) {
                    const worker = new Worker(__dirname + "/worker1.js",
                        {
                            workerData: {
                                src: req.file,
                                ...size
                            }
                        }
                    );
                }
                res.send("thumbnail created");
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
