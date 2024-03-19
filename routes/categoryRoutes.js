import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import {
  createCategoryController,
  deleteCategoryController,
  getAllController,
  getSingleController,
  updateCategoryController,
} from '../controller/categoryController.js'

const router = express.Router()

//routes
//create-category
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController,
)
//update category
router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController,
)

//get all
router.get('/getAll-category', getAllController)

//single category
router.get('/get-category/:slug', getSingleController)

//delete category
router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryController,
)

export default router
