import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {
        data,
      } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile/${auth?.user._id}`,
        { name, email, phone, address },
      )

      if (data?.success) {
        setAuth({ ...auth, user: data?.updateuser })
        // console.log(data?.updateuser)
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data?.updateuser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success(data?.message)
      } else {
        toast.error(data?.message)
      }
      navigate('/dashboard/user')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    const { name, email, phone, address } = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  }, [auth?.user])

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row ">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h2>Update Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2 ">
                  <input
                    type="name"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    disabled
                  />
                </div>

                <div className="mb-2">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      aria-describedby="emailHelp"
                      placeholder="Enter Your Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
