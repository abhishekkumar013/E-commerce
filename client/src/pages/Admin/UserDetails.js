import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'

const UserDetails = () => {
  const [allusers, setAllUsers] = useState([])
  useEffect(() => {
    const getallusers = async () => {
      try {
        const users = await axios.get(
          'http://localhost:8080/api/v1/auth/all-users',
        )

        setAllUsers(users.data.users)
      } catch (error) {
        console.log(error)
      }
    }
    getallusers()
  }, [])
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3  ">
        <div className="row ">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-9  ">
            <ul
              className="details-cont w-75 overflow-y-scroll border border-warning"
              style={{ maxHeight: '55vh' }}
            >
              {allusers.map((user, i) => (
                <li key={i}>
                  <h5>Name : {user.name}</h5>
                  <p>Email : {user.email}</p>
                  <p>phone : {user.phone}</p>
                  <p>Address : {user.address}</p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserDetails
