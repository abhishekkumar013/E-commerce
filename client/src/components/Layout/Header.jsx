import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../Context/cart'
import { Avatar, Badge } from 'antd'
import { AiOutlineShoppingCart } from 'react-icons/ai'
// import './Header.css'

const Header = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const categories = useCategory()
  const navigate = useNavigate()

  const handleLogout = () => {
    toast.success('Logout Successfully')
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to={'/'}>
              <img
                className="main-logo"
                src={process.env.PUBLIC_URL + '/images/main-logo2.png'}
                alt="k"
              />{' '}
              APNA DUKAN
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item ">
                <NavLink className="nav-link " aria-current="page" to={'/'}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={'/categories'}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={'/categories'}>
                      All Category
                    </Link>
                  </li>
                  {categories.map((item) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${item.slug}`}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/register'}>
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/login'}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        {auth?.user.role === 1 ? (
                          <Link
                            className="dropdown-item"
                            to={'/dashboard/admin'}
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            className="dropdown-item"
                            to={'/dashboard/user'}
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleLogout}
                          to={'/login'}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item me-1">
                <NavLink className="nav-link " to={'/cart'}>
                  <Badge count={cart?.length >= 1 ? cart?.length : 0} showZero>
                    <AiOutlineShoppingCart size={22} />
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
