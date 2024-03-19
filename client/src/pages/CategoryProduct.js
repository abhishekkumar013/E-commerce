import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { IoMdArrowRoundBack } from 'react-icons/io'

const CategoryProduct = () => {
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])

  const navigate = useNavigate('')
  const params = useParams()

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/category-product/${params?.slug}`,
      )

      setProduct(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [params?.slug])

  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-md-1">
          <div className="back-arrow">
            {/* <span onClick={() => navigate('/')}>&larr;</span> */}
            <IoMdArrowRoundBack size={40} onClick={() => navigate('/')} />
          </div>
        </div>
        <div className="col-md-11">
          <h2 className="text-center">
            {category[0]?.name ? category[0]?.name : ''}
          </h2>
          <div className="d-flex flex-wrap ">
            {product.length >= 1 ? (
              product?.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className="product-link"
                >
                  <div
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
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text mb-1">
                        <span style={{ fontFamily: 'Arial' }}>&#8377;</span>
                        {item.price}
                      </p>
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
                        <button className="btn btn-dark ms-1">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h2 className="text-center m-5">No Product Found</h2>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
