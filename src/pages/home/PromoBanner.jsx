import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className="banner__card">
            <span><i className='ri-truck-line'></i></span>
            <h4>Free Delivery</h4>
            <p>Offers convenience and the ability to shop from anywhere,anytime.</p>
        </div>
        <div className="banner__card">
            <span><i className='ri-money-dollar-circle-line'></i></span>
            <h4>100% Money Bank Guaranty</h4>
            <p>E-commerce have a review system where customers can share feedback.</p>
        </div>
        <div className="banner__card">
            <span><i className='ri-truck-line'></i></span>
            <h4>Strong Support</h4>
            <p>Offer customer support service to assist customer with queries and issues.</p>
        </div>

    </section>
  )
}

export default PromoBanner