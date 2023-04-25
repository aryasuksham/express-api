const mongoose = require('mongoose');
const { categoryExists, categoryNotExists, categoryAdded, categoryDeleted, categoryName, categoryUpdated, notFound } = require('../constants');
const ProductCategory = mongoose.model("ProductCategory");


const productCategory = (req, res) => {
    const { category, subCategory } = req.body;
    ProductCategory.findOne({ category: category })
        .then(savedCtegory => {
            if (savedCtegory) {
                return res.json({ ERROR: categoryExists })
            }
            const newCategory = new ProductCategory({
                category: category,
                subCategory: subCategory
            })
            newCategory.save()
                .then(cat => {
                    res.send(categoryAdded);
                })
                .catch(err => {
                    console.log("ERROR:", err);
                })
        }).catch(err => {
            console.log("ERROR:", err);
        })
}


const getCategories = (req, res) => {
    const { categoryName } = req.body;
    const { page } = req.query || 1;
    const recordPerPage = 2;
    let criteria = {}
    if (req.body) criteria.category = new RegExp(categoryName, 'i')

    ProductCategory.find(criteria).limit(recordPerPage).skip((page - 1) * recordPerPage).sort({ 'category': 1 })
        .then(categories => {
            // console.log("yy", categories);
            // const tempArray = [];
            // for (let i = 0; i < categories.length; i++) {
            //     const value = categories[i].category;
            //     tempArray.push(value);}
            // res.status(200).send(tempArray);
            res.status(200).send(categories);
        }).catch(err => {
            console.log("ERROR:", err);
        })
}

// const search = (req, res) => {
//     const { categoryName } = req.body;
//     ProductCategory.find({ $text: { $search: categoryName } })
//         .then(data => {
//             if (data.length === 0) {
//                 return res.send(notFound);
//             } else {
//                 console.log("Data Sent");
//                 res.send(data);}
//         }).catch(err => {
//             console.log("ERROR:", err)
//         })
// }


const permanantlyDeleteCategory = (req, res) => {
    const { id } = req.body;
    ProductCategory.findOneAndDelete({ _id: id })
        .then(cat => {
            if (cat === null) {
                return res.json({ Message: categoryNotExists });
            } else {
                res.send(categoryDeleted);
            }
        }).catch(err => {
            console.log("ERROR:", err);
        })
}

const deleteCategory = (req, res) => {
    const { categoryName } = req.body;
    const adminId = req.admin;
    ProductCategory.findOneAndUpdate({ category: categoryName }, { lastUpdatedBy: adminId, status: false })
        .then(cat => {
            if (cat === null) {
                return res.json({ Message: categoryNotExists });
            } else {
                res.send(categoryDeleted);
            }
        }).catch(err => {
            console.log("ERROR:", err);
        })

}


const updateCategories = (req, res) => {
    const { categoryId, newName } = req.body;
    const adminId = req.admin;

    ProductCategory.findOneAndUpdate({ _id: categoryId }, { category: newName, lastUpdatedBy: adminId })
        .then(cat => {
            res.send(categoryUpdated);
        }).catch(err => {
            console.log("ERROR:", err);
        })
}



const subCategoriesOfCategory = (req, res) => {
    const { categoryId } = req.body;
    ProductCategory.findOne({ _id: categoryId })
        .then(cat => {
            const subc = cat.subCategory;
            res.send(subc);
        }).catch(err => {
            console.log("ERROR:", err)
        })
}





module.exports = {
    productCategory,
    getCategories,
    permanantlyDeleteCategory,
    deleteCategory,
    updateCategories,
    subCategoriesOfCategory
};