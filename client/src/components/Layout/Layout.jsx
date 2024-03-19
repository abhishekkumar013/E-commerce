import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  )
}
Layout.defaultProps = {
  title: 'APNA DUKAN',
  description: 'mern stack project',
  keywords: 'mern, react, js ,html, css, project, e-commerce ',
  author: 'Abhishek Kumar',
}

export default Layout
