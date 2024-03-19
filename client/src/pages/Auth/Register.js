import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        { name, email, password, phone, address, answer },
      )
      if (result.data && result.data.success) {
        toast.success(result.data.message)
        navigate('/login')
      } else {
        toast.error(result && result.data.message)
      }
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setAddress('')
      setAnswer('')
    } catch (error) {
      console.log(error)
      toast.error('Error in Registration')
    }
  }
  return (
    <Layout title={'Register-APNA DUKAN'}>
      <div className="register">
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="name"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              aria-describedby="emailHelp"
              placeholder="Enter Your passord"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="emailHelp"
                placeholder="Enter Your Phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                aria-describedby="emailHelp"
                placeholder="Enter Your Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="exampleInputAnswer"
                aria-describedby="emailHelp"
                placeholder="Enter Your Birth Place"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value)
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
