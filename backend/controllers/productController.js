const Products = require('../models/product')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new product -> /api/v1/product/new
exports.newProduct= catchAsyncErrors(async(req,res,next)=>{
    const product = await Products.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
})

exports.getProducts = (req,res,next)=>{
    res.status(200).json({
        success:true,
        message: 'This route shows all products in the database.'
    })
}