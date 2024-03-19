import express from 'express'
import {
  GetAllUsersContainer,
  LoginController,
  forgotPasswordController,
  getAllOrderController,
  getOrderController,
  registerController,
  statusUpdateController,
  testController,
  updateUserController,
} from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
const router = express.Router()

//register route (POST)
router.post('/register', registerController)

//login
router.post('/login', LoginController)

// forgot-password
router.post('/forgat-password', forgotPasswordController)

//protected routes
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})

// Admin route -protected
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})

//all users
router.get('/all-users', requireSignIn, isAdmin, GetAllUsersContainer)
//test
router.post('/test', requireSignIn, isAdmin, testController)

//update user
router.put('/profile/:id', requireSignIn, updateUserController)

// order
router.get('/orders', requireSignIn, getOrderController)

// all- order
router.get('/all-orders', requireSignIn, isAdmin, getAllOrderController)
//
router.put(
  '/order-status/:orderId',
  requireSignIn,
  isAdmin,
  statusUpdateController,
)
export default router
