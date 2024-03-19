import toast from 'react-hot-toast'
import Layout from '../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useCart } from '../Context/cart'

const ProductDetail = () => {
  const [products, setProducts] = useState([])
  const [releatedProduct, setReleatedProduct] = useState([])
  const [cart, setCart] = useCart()
  const params = useParams()
  const navigate = useNavigate('')

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-singleproduct/${params.id}`,
      )

      setProducts(data?.product)

      getsimilarProduct(data?.product[0]._id, data?.product[0].category._id)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    getProduct()
  }, [params?.id])
  const getsimilarProduct = async (pid, cid) => {
    console.log('get similar call')
    try {
      console.log('pid ', pid)
      console.log('cid ', cid)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`,
      )
      setReleatedProduct(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2">
          <div className="back-arrow">
            {/* <span onClick={() => navigate('/')}>&larr;</span> */}
            <IoMdArrowRoundBack size={40} onClick={() => navigate('/')} />
          </div>
        </div>
        <div className="col-md-10">
          {products.map((product) => (
            <div
              className="card mb-3"
              style={{ maxWidth: 940 }}
              key={product._id}
            >
              <div className="row g-0">
                <div className="col-md-4 text-center">
                  <h5>{product.name}</h5>
                  <img
                    style={{ height: '20rem', width: '35rem' }}
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-6  text-bg-light">
                  <div className="card-body ms-4">
                    <h5 className="card-title">
                      Product Name : {product.name}
                    </h5>

                    <p className="card-text">
                      {' '}
                      Price :{' '}
                      <span style={{ fontFamily: 'Arial' }}>&#8377;</span>
                      {product.price}
                    </p>
                    <p className="card-text">Quantity : {product.quantity}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Description : {product.description}
                      </small>
                    </p>
                  </div>
                  <div className="ms-5 bottom">
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, product]),
                        )
                        toast.success('Product Added in Cart')
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div className="d-flex flex-wrap ">
                    {releatedProduct?.length < 1 && (
                      <p className="text-center">No Similar Product Found</p>
                    )}
                    {releatedProduct?.map((item) => (
                      <Link
                        to={`/product/${item._id}`}
                        key={item._id}
                        className="product-link"
                      >
                        <div
                          className="card m-2 hover-effect"
                          style={{ width: '10rem' }}
                        >
                          <img
                            style={{ height: '5rem', width: '10rem' }}
                            src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                            className="card-img-top"
                            alt={item.name}
                          />
                          <div className="card-body">
                            <h6
                              className="card-title"
                              style={{ fontSize: '12px' }}
                            >
                              {item.name}
                            </h6>
                            <p
                              className="card-text"
                              style={{ fontSize: '12px' }}
                            >
                              <span style={{ fontFamily: 'Arial' }}>
                                &#8377;
                              </span>
                              {item.price} &nbsp; &nbsp;
                              <i
                                class="fa-solid fa-right-long fa-2xl"
                                style={{ color: '#6e2142' }}
                              ></i>
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail
