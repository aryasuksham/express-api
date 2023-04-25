const puppeteer = require('puppeteer');
const hb = require('handlebars');
const fs = require('fs');
const path = require('path');
const utils = require('util');
const readFile = utils.promisify(fs.readFile)


async function getTemplateHtml() {
  console.log("Loading template", path.resolve("/views/index.html"))
  try {
    const invoicePath = require("../views/")
    return await readFile(invoicePath, 'utf8');
  } catch (err) {
    console.log(err)
    return Promise.reject("Could not load html template");
  }
}


// async function generatePdf() {
//     let data = {};
//     getTemplateHtml()
//         .then(async (res) => {
//             console.log("Compiing the template with handlebars")
//             const template = hb.compile(res, { strict: true });

//             const result = template(data);

//             const html = result;
//             // console.log("htmlll: ",html);
//             const browser = await puppeteer.launch();
//             const page = await browser.newPage()
//             await page.setContent(html)
//             await page.pdf({ path: 'sam1.pdf', format: 'A4' })

//             await browser.close();
//             console.log("PDF Generated")
//         })
//         .catch(err => {
//             console.error(err)
//         });
// }

// module.exports={generatePdf};


const makinginvoicepdf = (req, res) => {
  res.render("index", {
    receiptNum: 4321,
    buyerName: "Suksham",
    buyerPhone: 9876543210,
    description: "Bill Payment for Uttar Gujarat Vij Company Limited  75203207160",
    billAmount: 4320,
    convenienceFee: 0,
    totalAmount: function () {
      return this.billAmount + this.convenienceFee
    }
  }), async function getTemplateHtml(err, html) {
    console.log("Loading template", html);
    try {
      const invoicePath = path.resolve("./views/index.hbs");
      console.log("pathhhh: ", invoicePath);
      return await readFile(invoicePath, 'utf8');
    } catch (err) {
      console.log(err)
      return Promise.reject("Could not load html template");
    }
  }

  async function generatePdf() {
    let data = {};
    getTemplateHtml()
      .then(async (res) => {
        console.log("Compiing the template with handlebars")
        const template = hb.compile(res, { strict: true });
        const result = template(data);
        const html = result;
        console.log("htmlll: ", html)
        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        await page.setContent(html)
        await page.pdf({ path: 'hbs.pdf', format: 'A4' })
        await browser.close();
        console.log("PDF Generated")
      })
      .catch(err => {
        console.error(err)
      });
  }
  generatePdf();
}

module.exports = { makinginvoicepdf };
