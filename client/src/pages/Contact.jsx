import React from 'react'
import Layout from '../components/Layout/Layout'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'

const Contact = () => {
  return (
    <Layout>
      <div className="contact-container">
        {/* Contact Details on the Left Side */}
        <div className="contact-details">
          <h2>Contact Details</h2>
          <p>
            <MdOutlineMarkEmailUnread /> &nbsp; sahaabhishek443@gmail.com
          </p>
          <p>
            <BiSupport /> &nbsp; 7079268022
          </p>
          <p>
            <FaHome /> &nbsp; motihari, Bihar
          </p>
        </div>

        {/* Contact Form on the Right Side */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4"></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
