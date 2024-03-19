import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <h4>Admin Panel</h4>
        <div className="list-group">
          <NavLink
            to={'/dashboard/admin/create-category '}
            className="list-group-item list-group-item-action nav-a"
          >
            Create Category
          </NavLink>
          <NavLink
            to={'/dashboard/admin/create-product'}
            className="list-group-item list-group-item-action nav-a"
          >
            Create Product
          </NavLink>
          <NavLink
            to={'/dashboard/admin/products'}
            className="list-group-item list-group-item-action nav-a"
          >
            Products
          </NavLink>
          <NavLink
            to={'/dashboard/admin/users'}
            className="list-group-item list-group-item-action nav-a"
          >
            Users
          </NavLink>
          <NavLink
            to={'/dashboard/admin/orders'}
            className="list-group-item list-group-item-action nav-a"
          >
            Order
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu
