const { upload } = require("../middleware/auth");
const mongoose=require("mongoose");
const Image =  mongoose.model("Image");


const fileUpload=(req, res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err);
            res.send("Error Occurred");
        }
        const newImage=new Image({
            name:req.body.name,
            desc:req.body.description,
            image:{
                data: req.file.image,
                contentType:'image/png'
            }
        })
        newImage.save()
        .then(()=>{res.send("Image Uploaded Successfully")})
        .catch(err=>{console.log(err);})
    })
    res.send("file uploaded");
}



module.exports ={fileUpload}





// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// var upload = multer({ storage: storage });

// app.get('/', (req, res) => {
//     imgSchema.find({})
//     .then((data, err)=>{
//         if(err){
//             console.log(err);
//         }
//         res.render('imagepage',{items: data})
//     })
// });


// app.post('/', upload.single('image'), (req, res, next) => {

//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgSchema.create(obj)
//     .then ((err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });
