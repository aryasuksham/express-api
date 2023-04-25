const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const fs = require('fs');
const path = require('path');
const utils = require('util');
const readFile = utils.promisify(fs.readFile)
// const swaggerUI = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
const PORT = process.env.PORT || 7000;

// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/file.html');
//   });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log("user disconnected");
//   })
// });

require("dotenv").config();
app.use(express.json());
app.use(cors())
// app.set('view engine', 'hbs');

const dataBinding = {
  receiptNum: 4321,
  buyerName: "Sarya",
  buyerPhone: 1234567890,
  description: "Bill Payment for Uttar Gujarat Vij Company Limited  75203207160",
  billAmount: 4320,
  convenienceFee: 0,
  totalAmount: function () {
    return this.billAmount + this.convenienceFee
  }
}

app.get("/pdf", async (req, res) => {

  let data = {};
  const templateHtml = fs.readFileSync(path.join(process.cwd(), "views/index.html"), "utf8");
  console.log("Compiling the template with handlebars")

  const template = hb.compile(templateHtml);
  // console.log("temmm: ", template)
  const finalHtml = encodeURIComponent(template(dataBinding));
  // const html = result;
  // console.log("htmlll: ",finalHtml)
  const browser = await puppeteer.launch();
  const page = await browser.newPage()
  await page.setContent(finalHtml)
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
    waitUntil: "networkidle0",
  });
  await page.pdf({ path: 'samplehbs4.pdf', format: 'A4' })
  await browser.close();
  console.log("PDF Generated")

  // res.render('index.html', dataBinding)

})

const dbUri = process.env.MONGOURI;

mongoose.connect(dbUri)
mongoose.connection.on('connected', () => {
  console.log("Connected to mongo DB!");
})

mongoose.connection.on('error', (err) => {
  console.log("Error connecting", err);
})

// const options = {
//     definition: {
//         openapi: "3.0.3",
//         info: {
//             title: "Express-API",
//             version: "1.0.0",
//             description: "Simple Express-APIs"
//         },
//         servers: [{
//             url: "http://localhost:7000/"
//         }
//         ]
//     },
//     apis: ["./views/*.js"]
// }
// const specs = swaggerJsDoc(options);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

require('./models/user');
require('./models/productcategory');
require('./models/admin');
require('./models/images');
require('./models/seller');
require('./models/admincsvjson');

app.use(require('./views/user'))
app.use(require('./views/admin'))
app.use(require('./views/seller'))
app.use(require('./multithreading/main/route'))


app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/file.html');
});
app.get('/pic', (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + '/controllers/uploads/user_file-1680607968254.jpg');
});


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
})