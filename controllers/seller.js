const mongoose = require('mongoose');
const Seller = mongoose.model("Seller");
const Rating = mongoose.model("Rating");
const Review = mongoose.model("Review");

const addseller = (req, res) => {
    const { name, desc } = req.body;
    const rat = '6436810daab2e27c0ab567d6';
    if (!name || !desc) {
        return res.status(errorStatus).json({ error: fieldError })
    }
    const newSeller = new Seller({
        name,
        desc,
        rating: rat
    })
    newSeller.save()
        .then(seller => {
            // console.log("Admin Details:", admin);
            res.json({ seller })
        })
        .catch(err => { console.log(err); })
}


const getseller = (req, res) => {
    const { id } = req.body;
    console.log("mkjjj", id)
    if (!id) {
        return res.status(400).json({ error: "add id" })
    }
    Seller.findOne({ _id: id })
        .populate('rating')
        .then(savedSeller => {
            if (!savedSeller) {
                return res.status(400).json({ Error: "eeeee" })
            }
            res.json({ savedSeller });
        }).catch(() => {
            console.log("not found");
        })
}



const addrating = (req, res) => {
    const { name, desc } = req.body;
    if (!name || !desc) {
        return res.status(errorStatus).json({ error: fieldError })
    }
    const newRating = new Rating({
        name,
        desc
    })
    newRating.save()
        .then(rating => {
            res.json({ rating })
        })
        .catch(err => { console.log(err); })
}


const getrating = (req, res) => {
    const id = req.body;
    if (!id) {
        return res.status(errorStatus).json({ error: emailPassword })
    }
    Rating.findOne({ _id: id })
        .then(savedSeller => {
            if (!savedSeller) {
                return res.status(errorStatus).json({ Error: wrongIdPassword1 })
            }
            res.json({ savedSeller });
        }).catch(() => {
            console.log(accountNotExists);
        })
}

const addreview = (req, res) => {
    const { name, desc, model } = req.body;
    const id1 = '643680fbaab2e27c0ab567d4';
    if (!name || !desc) {
        return res.status(errorStatus).json({ error: fieldError })
    } else {
        const newReview = new Review({
            name,
            desc,
            reference: id1,
            model
        })
        newReview.save()
            .then(review => {
                res.json({ review })
            })
            .catch(err => { console.log(err); })
    }

}


const getreviews = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'add id' })
    } else {
        Review.findOne({ _id: id }).populate('reference')
            .then(savedSeller => {
                if (!savedSeller) {
                    return res.status(errorStatus).json({ Error: wrongIdPassword1 })
                }
                res.json({ savedSeller });
            }).catch(() => {
                console.log("not found");
            })
    }
}



module.exports = { addseller, getseller, getrating, addrating, addreview, getreviews };
