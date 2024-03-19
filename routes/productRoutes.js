import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import {
  CategorybasedProductController,
  PhotoController,
  ProductCountController,
  ReleatedProductController,
  braintreeController,
  braintreePaymentController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  getSingleProductIdController,
  productController,
  productListController,
  productfiltersController,
  searchProductController,
  updateProductController,
} from '../controller/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

//create products
router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  formidable(),
  productController,
)

//update product controller
router.put(
  '/update-product/:pid',
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController,
)

// get all products
router.get('/getAll-product', getAllProductController)

// Get single Product
router.get('/get-product/:slug', getSingleProductController)

// single product by id
router.get('/get-singleproduct/:id', getSingleProductIdController)

//delete product
router.delete(
  '/delete-product/:id',
  requireSignIn,
  isAdmin,
  deleteProductController,
)

// Get Photo
router.get('/product-photo/:pid', PhotoController)

//filter Products
router.post('/product-filters', productfiltersController)

//product count
router.get('/product-count', ProductCountController)

// product per page
router.get('/product-list/:page', productListController)

// search
router.get('/search/:keyword', searchProductController)

//releated
router.get('/related-product/:pid/:cid', ReleatedProductController)

// product based on category
router.get('/category-product/:slug', CategorybasedProductController)

//payment route
//token
router.get('/braintree/token', braintreeController)
//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router
