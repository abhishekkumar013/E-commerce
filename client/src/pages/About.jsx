import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout
      title={'About-APNA DUKAN'}
      description={'about page'}
      author={'Abhishek'}
      keywords={'about'}
    >
      <div className="about-container">
        <div className="about-image">
          <img src="/images/about.jpeg" alt="About Us" />
        </div>
        <div className="about-details">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
            urna eget sapien scelerisque fermentum. Nulla facilisi. Fusce auctor
            vulputate justo, in pretium purus tincidunt id.
          </p>
          <p>
            In hac habitasse platea dictumst. Duis interdum malesuada convallis.
            Curabitur vestibulum turpis et sapien venenatis, eget fringilla
            lorem pulvinar. Nullam quis urna vel purus imperdiet efficitur a
            vitae nunc.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
