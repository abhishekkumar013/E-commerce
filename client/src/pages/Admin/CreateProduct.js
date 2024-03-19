import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const { Option } = Select

const CreateProduct = () => {
  const [product, setProduct] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [oneCategory, setOneCategory] = useState('')

  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [photo, setPhoto] = useState('')

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

  // create product
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('photo', photo)
      productData.append('category', oneCategory)
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/create-product',
        productData,
      )
      if (data?.success) {
        toast.success(data.message)
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data?.message)
      }
      setName('')
      setDescription('')
      setPrice('')
      setOneCategory('')
      setPhoto('')
      setShipping(false)
    } catch (error) {
      console.log(error)
      toast.error('Error in Creating Product')
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
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
                value={oneCategory ? oneCategory : 'Select Category'}
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                  onChange={(value) => {
                    setShipping(value)
                  }}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
