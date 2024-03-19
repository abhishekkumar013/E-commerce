import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <div
              className="card text-bg-info mb-3c h-75"
              style={{ maxWidth: '35rem' }}
            >
              <div className="card-header">Admin Details</div>
              <div className="card-body">
                <h5 className="card-title">name - {auth?.user.name}</h5>
                <p className="admin-d">Phone - {auth?.user.phone}</p>
                <p className="admin-d">Email - {auth?.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
