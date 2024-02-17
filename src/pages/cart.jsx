import axios from 'axios'
import { useState, useEffect  } from 'react'
import Navbar from '../components/Navbar/Navbar';
import "./cart.css"
import { Toaster, toast } from "react-hot-toast";



function Cart() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    const [showOrderMessage, setShowOrderMessage] = useState(false);
    
   

    useEffect(() => {
        let token = localStorage.getItem("token")
        axios.get("/api/cart", {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.user)
                console.log(res.data.user);
            })
            .catch(console.log);
    }, []);

  
    



    const handleBuyNow = (index) => {
        setShowOrderMessage(true);
        setTimeout(() => setShowOrderMessage(false), 2000); 
    };

    return (
        <>
            <div>
      <Toaster />
            <Navbar />
            <div>
                <div className='name'>
                <h1>MY BAG</h1>
                </div>


{data.map((item, index) => (
    <div className="card horizontal-card" key={index}>
    
        <div className="card-img">
            <img src={`${baseURL}/api/image/${item.image}`} alt={item.name} />
        </div>
     
        <div className="card-content">
            <h4>{item.title}</h4>                                                     
            <p> {item.category}</p>
            <p> {item.old_price}</p>
            <div className="btn-group">
                                                                                         {/* handleRemove(index)    */}
                <button className="btn remove"onClick={() =>handleRemove(index)}>Remove</button>
              
                <div className="quantity-controls">
                    <button className="btn btn-outline-primary" onClick={() => handleQuantityChange(index, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-primary" onClick={() => handleQuantityChange(index, 'increase')}>+</button>
                </div>
             
                <button className="btn buynow " onClick={() => handleBuyNow(index)}>Buy Now</button>
            </div>
        </div>
    </div>
))}
         {showOrderMessage && (
                        <div className="popup-message">
                            Item ordered
                        </div>
                    )}

                </div>
            </div>
          

        </>
    )
}

export default Cart;




