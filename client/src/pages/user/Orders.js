import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import moment from 'moment'

const Orders = () => {
  const [order, setOrder] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/auth/orders',
      )
      setOrder(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth?.token) {
      getOrder()
    }
  }, [auth?.token])
  return (
    <Layout>
      <div className="container-fluid row mt-3 home-page ">
        <div className="col-md-3 ms-3 ">
          <UserMenu />
        </div>
        <div className="col-md-8 ">
          <h1 className="text-center">Orders</h1>
          {order?.map((o, i) => {
            return (
              <div className="border shadow ">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div key={i} className="row m-2 card flex-row ">
                      <div className="col-md-4">
                        <img
                          style={{ width: '10rem', height: '8.4rem' }}
                          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        />
                      </div>
                      <div className="col-md-8 p-2">
                        <h6>{p.name}</h6>
                        <h6>{p.description.substring(0, 30)}</h6>
                        <h6>Price : {p.price}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Orders
