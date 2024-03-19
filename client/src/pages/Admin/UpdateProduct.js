import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select

const UpdateProduct = () => {
  const [product, setProduct] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [oneCategory, setOneCategory] = useState('')
  const [Categoryname, setCategoryName] = useState('')

  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [photo, setPhoto] = useState('')
  const [id, setId] = useState('')
  const params = useParams()

  const navigate = useNavigate('')

  //get all category
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/category/getAll-category',
      )
      //console.log(data.categories)
      if (data?.success) {
        // console.log(data.categories)
        setCategory(data?.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product//get-product/${params.slug}`,
      )
      console.log(data.product)

      setName(data.product[0].name)
      setOneCategory(data.product[0].category._id)
      setCategoryName(data.product[0].category.name)
      setDescription(data.product[0].description)
      setPrice(data.product[0].price)
      setShipping(data.product[0].shipping)
      setQuantity(data.product[0].quantity)
      setId(data.product[0]._id)
      //   console.log(data.product[0].shipping)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProduct()
    // eslint-disable-line
  }, [])
  // create product
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('photo', photo)
      productData.append('category', oneCategory)
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData,
      )
      if (data?.success) {
        toast.success(data.message)
      } else {
        toast.error(data?.message)
      }
      setName('')
      setDescription('')
      setPrice('')
      setOneCategory('')
      setPhoto('')
      setShipping(false)
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error)
      toast.error('Error in Updating Product')
    }
  }

  //handle delete
  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are You Sure To Delete This Product ?')
      if (!answer) return
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`,
      )
      toast.success(data?.message)
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error)
      toast.error('Error in Deleing')
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <ul>
              {product.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select Category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={Categoryname ? Categoryname : 'Select Category'}
                onChange={(value) => {
                  setOneCategory(value)
                }}
              >
                {category.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="product photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select shipping"
                  size="Large"
                  showSearch
                  className="form-select mb-3"
                  value={shipping ? 'Yes' : 'No'}
                  onChange={(value) => {
                    setShipping(value)
                  }}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary me-3" onClick={handleUpdate}>
                  Update Product
                </button>
                <button className="btn btn-danger ms-3" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
