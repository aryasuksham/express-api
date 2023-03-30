const mongoose = require('mongoose');
const ProductCategory = mongoose.model("ProductCategory");

const productCategory = (req, res) => {
    const { category, subCategory } = req.body;
    ProductCategory.findOne({ category: category })
        .then(savedCtegory => {
            if (savedCtegory) {
                return res.json({ ERROR: "This product category already exixts " })
            }
            const newCategory = new ProductCategory({
                category: category,
                subCategory: subCategory
            })
            newCategory.save()
                .then(cat => {
                    console.log("Category: ", cat);
                    res.send("category added")
                })
                .catch(err => {
                    console.log("ERROR: ", err);
                })
        })
}


const getCategories = (req, res) => {
    ProductCategory.find()
        .then(categories => {
            const tempArray = [];
            const categoryValues = categories.map(key => key);
            for (let i = 0; i < categoryValues.length; i++) {
                const value = categoryValues[i].category;
                tempArray.push(value);
            }
            console.log(tempArray);
            res.status(200).send(tempArray);
        })
}

const deleteCategory = (req, res) => {
    const { categoryName } = req.body;
    ProductCategory.findOneAndDelete({ category: categoryName })
        .then(cat => {
            if (cat === null) {
                console.log("Category does not exist");
                res.json({ Message: "Category does not exist" })
            } else {
                console.log("Category Deleted!")
                res.send(cat)
            }
        }).catch(err => {
            console.log("ERROR: ", err);
        })
}


const updateCategories = (req, res) => {
    const { oldName, newName } = req.body;
    ProductCategory.findOneAndUpdate({ category: oldName }, { category: newName })
        .then(cat => {
            // console.log("nnn", cat);
            res.send("Category name updated!")

        })
}


const subCategoriesOfCategory=(req,res)=>{
    const {category}=req.body;
    ProductCategory.findOne({category:category})
    .then(cat=>{
        const subc=cat.subCategory;
        console.log(subc);
        res.send(subc)
    })
}


module.exports = {
    productCategory,
    getCategories,
    deleteCategory,
    deleteCategory,
    updateCategories,
    subCategoriesOfCategory
};