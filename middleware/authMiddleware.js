import JWT from 'jsonwebtoken'
import userModel from '../model/userModel.js'

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
  }
}

///admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (!user || user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access',
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in isAdmin',
    })
  }
}
