const express=require('express');
const router=express.Router();
const { isAuthenticatedUser} = require('../middlewares/auth')

const {getProducts, newProduct, getSingleProduct,updateProduct, deleteProduct}=require('../controllers/productController')

router.route('/products').get(isAuthenticatedUser,getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
    .put(updateProduct)
    .delete(deleteProduct);//delete and update use the same route
router.route('/admin/product/new').post(newProduct);

module.exports=router;