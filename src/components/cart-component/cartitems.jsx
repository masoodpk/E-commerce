import React from 'react'
import './cartitems.css'
import Secure from '../assets/secure.png'
import Easy from '../assets/easy.png'
import Rupee from '../assets/rupee.png'
import Quality from '../assets/quality.png'

function cartitems() {
  return (
    <div className='row-cart '>
        <div className='column one' style={{ color: '#866528' }}>
<img src={Secure} alt="" />SECURE PAYMENTS
        </div>
        <div className='column two' style={{ color: '#866528' }}>
<img src={Rupee} alt="" />CASH ON DELIVERY
</div>
<div className='column three' style={{ color: '#866528' }}>
<img src={Easy} alt="" />EASY RETURN
</div>
<div className='column four' style={{ color: '#866528' }}>
<img src={Quality} alt="" />ASSURED QUALITY
</div>







    </div>
  )
}

export default cartitems