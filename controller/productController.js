import fs from 'fs'
import productModel from '../model/productModel.js'
import slugify from 'slugify'
import categoryModel from '../model/categoryModel.js'
import braintree from 'braintree'
import dotenv from 'dotenv'
import orderModel from '../model/orderModel.js'

dotenv.config()
// braintree payment getway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHENT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

export const productController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields
    const { photo } = req.files

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is Required' })
      case !description:
        return res.status(500).send({ error: 'Description is Required' })
      case !price:
        return res.status(500).send({ error: 'Price is Required' })
      case !category:
        return res.status(500).send({ error: 'Category is Required' })
      case !quantity:
        return res.status(500).send({ error: 'Quantity is Required' })
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Photo is Required and less Then 1mb' })
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name, '-'),
    })
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }
    await product.save()

    res.status(200).send({
      success: true,
      message: 'Product Created',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while createing product',
      error,
    })
  }
}

// Get All Product Controller
export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      message: 'Products Fetched',
      total: products.length,
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while Fetching Products',
      error,
    })
  }
}

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params
    const product = await productModel
      .find({ slug })
      .select('-photo')
      .populate('category')
    res.status(200).send({
      success: true,
      message: 'Products Fetched',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while fetching product',
      error,
    })
  }
}

//get single product by id
export const getSingleProductIdController = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productModel
      .find({ _id: id })
      .select('-photo')
      .populate('category')

    res.status(200).send({
      success: true,
      message: 'Products Fetched',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while fetching product',
      error,
    })
  }
}

// Delete product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params
    const delproduct = await productModel
      .findByIdAndDelete({ _id: id })
      .select('-photo')
    res.status(200).send({
      success: true,
      message: 'Product Delete Successfully',
      delproduct,
    })
  } catch (error) {
    console.log(error)
    res.status(200).send({
      success: false,
      message: 'Error while Deleteing Products',
      error,
    })
  }
}

// Get Photo of Product
export const PhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.pid })
      .select('photo')
    if (product.photo.data) {
      res.set('Content-type', product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while getting photo',
    })
  }
}

// Update Products
export const updateProductController = async (req, res) => {
  try {
    console.log(req.fields)
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields
    const { photo } = req.files

    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is Required' })
      case !description:
        return res.status(500).send({ error: 'Description is Required' })
      case !price:
        return res.status(500).send({ error: 'Price is Required' })
      case !category:
        return res.status(500).send({ error: 'Category is Required' })
      case !quantity:
        return res.status(500).send({ error: 'Quantity is Required' })
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Photo is Required and less Then 1mb' })
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name, '-') },
      { new: true },
    )
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }
    await product.save()

    res.status(200).send({
      success: true,
      message: 'Product Updated',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while updating product',
      error,
    })
  }
}

// filter
export const productfiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
    const product = await productModel.find(args)
    res.status(200).send({
      success: true,
      message: 'Product Fetched',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Filtering',
      error,
    })
  }
}

// product count
export const ProductCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      message: 'Product Counted',
      total,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Count',
    })
  }
}

// product per page
export const productListController = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page ? req.params.page : 1
    const product = await productModel
      .find({})
      .select('-photo')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Getting product Lits',
      error,
    })
  }
}

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params

    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      })
      .select('-photo')
    res.json(results)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Search',
      error,
    })
  }
}

// Releated Product
export const ReleatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select('-photo')
      .limit(3)
      .populate('category')

    res.status(200).send({
      success: true,
      message: 'Releated Product Feteched',
      products,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Getting Releated Product',
    })
  }
}

// product based on categiry
export const CategorybasedProductController = async (req, res) => {
  try {
    const { slug } = req.params
    const category = await categoryModel.find({ slug })

    const products = await productModel
      .find({ category })
      .select('-photo')
      .populate('category')
    res.status(200).send({
      success: true,
      message: 'Category Wise Product Fetched',
      products,
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Get Category Based Product',
      error,
    })
  }
}

// braintree getway controller
export const braintreeController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Braintree Token',
      error,
    })
  }
}

//braintree payment cont
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body
    let total = 0
    cart.map((i) => {
      total += i.price
    })
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save()
          res.json({ ok: true })
        } else {
          res.status(500).send(error)
        }
      },
    )
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Braintree Payment',
      error,
    })
  }
}
