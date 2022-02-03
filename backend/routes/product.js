const express=require('express');
const router=express.Router();
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

const {getProducts, newProduct, getSingleProduct,updateProduct, deleteProduct}=require('../controllers/productController')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);//delete and update use the same route
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

module.exports=router;