import React from 'react'
import './wishcompo.css'
import Hand from '../assets/hand.png'
import Exchange from '../assets/exchange.png'

import Quality from '../assets/quality.png'

function wishcompo() {
  return (
    <div className='row-cart '>
        <div className='column one' style={{ color: '#866528' }}>
<img src={Exchange} alt="" />EASY EXCHANGE
        </div>
        <div className='column two' style={{ color: '#866528' }}>
<img src={Hand} alt="" />100% HANDPICKED
</div>

<div className='column four' style={{ color: '#866528' }}>
<img src={Quality} alt="" />ASSURED QUALITY
</div>







    </div>
  )
}

export default wishcompo;