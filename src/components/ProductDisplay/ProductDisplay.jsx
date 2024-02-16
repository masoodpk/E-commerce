import React from 'react'
import './ProductDisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
function ProductDisplay(props) {
    const {product} =props
  return (
    <div className='Productdisplay'>
        <div className="productdisplay-left">
           <div className="productdisplay-img-list">
            <img src={product.image} alt="product" />
            <img src={product.image} alt="product" />
            <img src={product.image} alt="product" />
            <img src={product.image} alt="product" />
           </div>

           <div className='productdisplay-img'>
            <img className='Productdisplay-main-img' src={product.image} alt="main" />

           </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="star-bright" />
                <img src={star_icon} alt="star-bright" />
                <img src={star_icon} alt="star-bright" />
                <img src={star_icon} alt="star-bright" />
                <img src={star_dull_icon} alt="star-dull" />
                <p>(184)</p>

            </div>
            <div className="productdisplay-right-prices">
                <div className="price-old">
                         ${product.old_price}
                </div>
                <div className="price-new">
                           ${product.new_price}
                </div>
            </div>

            <div className="productdisplay-right-description">
            Is a style of fabric shirt named after the T shape of its body and sleeves. Traditionally, it has short sleeves and a round neckline, known as a crew neck, which lacks a collar.
            </div>

            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXl</div>
                </div>
            </div>
            <button>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span> Women ,T-shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>
        </div>
       </div>
  )
}

export default ProductDisplay