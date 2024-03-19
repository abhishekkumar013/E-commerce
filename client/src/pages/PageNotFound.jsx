import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for might be in another castle.</p>
        <Link to="/">Go Home</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
