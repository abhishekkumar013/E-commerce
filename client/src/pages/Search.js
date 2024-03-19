import Layout from '../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../Context/search'
import { Link } from 'react-router-dom'

const Search = () => {
  const [search, setSearch] = useSearch()

  return (
    <Layout title={'Search Page'}>
      <div className="container m-3 p-3">
        <div className="text-center">
          <h4>Search Results</h4>
          <div className="d-flex flex-wrap ">
            {search?.results.map((item) => (
              <Link
                to={`/dashboard/product/${item._id}`}
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
                      <button className="btn btn-info ms-1">
                        More Details
                      </button>
                      <button className="btn btn-dark ms-1">ADD TO CART</button>
                    </div>
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

export default Search
