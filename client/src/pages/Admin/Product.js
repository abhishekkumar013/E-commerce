import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = () => {
  const [product, setProduct] = useState([])

  const getProducts = async () => {
    try {
      const allproduct = await axios.get(
        'http://localhost:8080/api/v1/product/getAll-product',
      )
      if (allproduct.data && allproduct.data.success) {
        setProduct(allproduct.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <Layout>
      <div className="container-fluid row mt-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All Products List</h2>
          <div className="d-flex flex-wrap">
            {product.map((item) => (
              <Link
                to={`/dashboard/admin/product/${item.slug}`}
                key={item._id}
                className="product-link"
              >
                <div
                  className="card m-2 hover-effect"
                  style={{ width: '17rem' }}
                >
                  <img
                    style={{ height: '10rem' }}
                    src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link to={'/'} className="btn btn-primary">
                      Go somewhere
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product
