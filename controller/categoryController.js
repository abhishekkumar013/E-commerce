import slugify from 'slugify'
import categoryModel from '../model/categoryModel.js'

// create-category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(401).send({ message: 'Name is required' })
    }
    const existingCategory = await categoryModel.findOne({ name })
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: 'category Already Exists',
      })
    }
    const slug = slugify(name, '-')

    const category = await new categoryModel({ name, slug }).save()
    if (!category) {
      return res.status(200).send({
        success: false,
        message: 'Unbale to create Category',
      })
    }
    res.status(201).send({
      success: true,
      message: 'New Category Created',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Controller',
    })
  }
}

// update controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    // const { name, newname } = req.body
    const { id } = req.params
    if (!name) {
      return res
        .status(401)
        .send({ message: 'Name and New Name both required' })
    }
    const existingCategory = await categoryModel.findOne({ _id: id })
    if (!existingCategory) {
      return res.status(404).send({
        success: false,
        message: 'Category Not Found',
      })
    }
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        slug: slugify(name, '-'),
      },
      { new: true },
    )
    res.status(200).send({
      success: true,
      message: 'Updated Successfully',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Updating Category',
    })
  }
}

//delete  category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await categoryModel.findByIdAndDelete({ _id: id })
    if (!result) {
      return res.status(401).send({
        success: false,
        message: 'Try To Delete Again',
      })
    }
    res.status(200).send({
      success: true,
      message: 'Category Deleted',
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error In Deleteing Category',
    })
  }
}

//get all category
export const getAllController = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    if (!categories) {
      return res.status(401).send({
        success: false,
        message: 'Unable to fetch All Category',
      })
    }
    res.status(200).send({
      success: true,
      message: 'All Category Fetched',
      categories,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while getting all category',
    })
  }
}

// get single category
export const getSingleController = async (req, res) => {
  try {
    const { slug } = req.params
    const category = await categoryModel.findOne({ slug })
    if (!category) {
      return res.status(500).send({
        success: false,
        message: 'Unable to fetched',
      })
    }
    res.status(200).send({
      success: true,
      message: 'fetched Successfully',
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error While getting single category',
    })
  }
}
