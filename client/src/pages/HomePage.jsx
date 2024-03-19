import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useCart } from '../Context/cart'

const HomePage = () => {
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useCart()
  const navigate = useNavigate('')

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/product/product-count',
      )
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProduct = async () => {
    try {
      setLoading(true)
      // const { data } = await axios.get(
      //   'http://localhost:8080/api/v1/product/getAll-product',
      // )
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`,
      )
      setLoading(false)
      // setProduct(data.products)
      setProduct(data.product)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProduct()
    }
    //eslint-disable-next-line
  }, [])

  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`,
      )
      setLoading(false)
      setProduct([...product, ...data?.product])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/category/getAll-category',
      )
      setCategory(data?.categories)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])

  // filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  //filter products
  const filteredProduct = async () => {
    try {
      const {
        data,
      } = await axios.post(
        'http://localhost:8080/api/v1/product/product-filters',
        { checked, radio },
      )
      // setProduct([])
      setProduct(data?.product)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }

  // filter product call on basic of length
  useEffect(() => {
    if (checked.length || radio.length) {
      filteredProduct()
    }
  }, [checked, radio])
  return (
    <Layout title={'All Product- Best Offers'}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {category?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h6 className="text-center mt-4">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10 ">
          <h2 className="text-center">All Products</h2>

          <div className="d-flex flex-wrap ms-5">
            {product?.map((item) => (
              <div
                key={item._id}
                className="card m-2 hover-effect"
                style={{ width: '18rem' }}
              >
                <img
                  style={{ height: '10rem' }}
                  src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{item.name}</h5>
                    <h5 className="card-title card-price">
                      <span style={{ fontFamily: 'Arial' }}>&#8377;</span>
                      {item.price}
                    </h5>
                  </div>

                  <p className="card-text">
                    {item.description.substring(0, 30)}
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, item])
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, item]),
                        )
                        toast.success('Product Added in Cart')
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {product && product.length < total && (
              <button
                className="btn btn-warning ms-5"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                {loading ? 'loading ...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
