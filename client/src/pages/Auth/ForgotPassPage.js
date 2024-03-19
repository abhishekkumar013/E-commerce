import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

const ForgotPassPage = () => {
  const [email, setEmail] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')
  //   const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/auth/forgat-password',
        { email, answer, newpassword },
      )
      if (res.data && res.data.success) {
        toast.success(res.data.message)

        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in Reset Password')
    }
  }
  return (
    <Layout>
      <div className="login">
        <h2>Reset Your Password</h2>
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
            <label htmlFor="exampleInputAnswer" className="form-label">
              Answer
            </label>
            <input
              type="text"
              className="form-control input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Birth Place"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
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
              value={newpassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassPage
