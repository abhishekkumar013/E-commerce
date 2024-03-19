import React, { useEffect, useState } from 'react'
import { useCart } from '../Context/cart'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [loading, setLoading] = useState(false)

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  const calculateTotal = () => {
    try {
      let totalp = 0
      cart?.map((item) => {
        totalp = totalp + item.price
      })
      return totalp
    } catch (error) {
      console.log(error)
    }
  }
  //get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/product/braintree/token',
      )
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [auth?.token])

  //handle paye
  const handlePayment = async () => {
    console.log('Handle payment')
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/braintree/payment',
        {
          cart,
          nonce,
        },
      )
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success('Payment Soccessfull')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center bg-light p-2 m-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h2>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You Have ${cart.length} Item In Cart ${
                    auth?.token ? '' : 'Please Login to checkout'
                  }`
                : 'Your cart Is Empty'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              {cart?.map((p) => (
                <div className="row m-2 card flex-row ">
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
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center ms-2">
            <h5>Cart Summey</h5>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>
              Total : <span style={{ fontFamily: 'Arial' }}>&#8377;</span>
              {calculateTotal()}
            </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3 mt-3">
                  <h5>Current Address : {auth?.user?.address}</h5>
                  <button
                    className="btn btn-warning mt-3"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning mt-3"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning mt-3"
                      onClick={() => navigate('/login', { state: '/cart' })}
                    >
                      Login Please
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2 mb-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ''
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault',
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? 'Processing' : 'Make Payment'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
