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

//get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async(req,res,next)=>{
    const products= await Products.find();
    res.status(200).json({
        success:true,
        count:products.length,
        products
    })
})