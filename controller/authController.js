import { json } from 'express'
import { comparePassword, hashPassword } from '../helper/authHelper.js'
import orderModel from '../model/orderModel.js'
import userModel from '../model/userModel.js'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body
    if (!name) {
      return res.send({ message: 'Name is required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!password) {
      return res.send({ message: 'Password is required' })
    }
    if (!phone) {
      return res.send({ message: 'Phone is required' })
    }
    if (!address) {
      return res.send({ message: 'Address is required' })
    }
    if (!answer) {
      return res.send({ message: 'Answer is required' })
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Email Already Registered',
      })
    }
    const hashPasswordr = await hashPassword(password)
    const user = await new userModel({
      name,
      email,
      password: hashPasswordr,
      phone,
      address,
      answer,
    }).save()

    return res.status(200).send({
      success: true,
      message: 'Registered Successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Registration',
    })
  }
}

//Login Controler
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.send({ message: 'Email is Required' })
    }
    if (!password) {
      return res.status({ message: 'Password is required' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email Not Registered',
      })
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Email or Password is Wrong',
      })
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Registration',
    })
  }
}

//test
export const testController = (req, res) => {
  res.send({
    message: 'Test Route',
  })
}

// forgat password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body
    if (!email) {
      res.status(400).send({ message: 'Email is Required' })
    }
    if (!answer) {
      res.status(400).send({ message: 'Answer is Required' })
    }
    if (!newpassword) {
      res.status(400).send({ message: 'New Password is Required' })
    }

    const user = await userModel.findOne({ email, answer })
    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'Email Not Registered',
      })
    }
    const newhashedpass = await hashPassword(newpassword)
    await userModel.findByIdAndUpdate(user._id, {
      password: newhashedpass,
    })
    res.status(200).send({
      success: true,
      message: 'Password Reset Successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Forgating Password',
      error,
    })
  }
}

//
export const GetAllUsersContainer = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0 })
    if (!users) {
      return res.status(400).send({
        success: false,
        message: 'No User Found',
      })
    }

    res.status(200).send({
      success: true,
      message: 'Users Fetched',
      users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while Getting all users',
    })
  }
}

// update user controller

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params
    const updateuser = await userModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    )
    res.status(200).send({
      success: true,
      message: 'Successfully Update',
      updateuser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Updating',
      error,
    })
  }
}

// order controller
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate('products', '-photo')
      .populate('buyer', 'name')
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting Orders',
      error,
    })
  }
}

// get all contorller
export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate('products', '-photo')
      .populate('buyer', 'name')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting Orders',
      error,
    })
  }
}

// status update
export const statusUpdateController = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    )
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Status Updating',
      error,
    })
  }
}
