import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const location = useLocation()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(
        'http://localhost:8080/api/v1/auth/login',
        { email, password },
      )
      if (result?.data && result?.data?.success) {
        toast.success(result.data.message)
        setAuth({
          ...auth,
          user: result?.data?.user,
          token: result?.data?.token,
        })
        localStorage.setItem('auth', JSON.stringify(result.data))

        navigate(location.state || '/')
      } else {
        toast.error(toast.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in Login')
    }
  }
  return (
    <Layout>
      <div className="login">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mb-2 ">
            <Link className="forg-btn" to={'/forgat-password'}>
              Forget Password
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
