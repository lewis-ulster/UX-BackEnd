const express = require('express');
const router = express.Router();
const Product = require('../schema/Product');
const verify = require('./logged_in');

//GET REQUEST HANDLER
router.get('/' , async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch (err) {
        res.json({ message: err});
    }
})

//GET SPECIFIC REQUEST HANDLER
router.get('/:_id' , async (req, res) => {
    try {
            const product = await Product.findById(req.params._id);
            res.json(product);
        } catch (err) {
            res.json({ message: err }); 
            res.status(404);
        }
})

//POST REQUEST HANDLER
router.post('/', verify , async (req, res) => {
    const product = new Product ({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image : req.body.image
    })
    try{
    const save = await product.save();
    res.json(save);
    }
    catch(err) {
        res.json({ message: err });
        res.status(400);
    };
})

//DELTE REQUEST HANDLER
router.delete('/:_id', async (req,res) => {
    try {
        const remove = await Product.remove({_id : req.params._id})
        res.json(remove);
    } catch (err) {
        res.json({ message: err });
        res.status(404);
    }
})

//UPDATE A PRODUCTS DETAILS

router.patch('/:_id', async (req, res) => {
    try {
        const update = await Product.updateOne({_id : req.params._id}, { $set : { price: req.body.price }});
        res.json(update);
    } catch (err) {
        res.json({ message: err });
        res.status(404);
    }
})
module.exports = router;