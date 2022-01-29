const Products = require('../models/product')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//create new product -> /api/v1/admin/product/new
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

//get single product details -> /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Products.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success:true,
        product
    })
})

//update product -> /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Products.findById(req.params.id);
    //using let instead of const as we have to update

    if(!product){
        return res.status(404).json({
            status:false,
            message:'Product not found'
        })
    }

    product = await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
})

//delete product -> /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Products.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            status:false,
            message:'Product not found'
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:'Product is deleted'
    })
})