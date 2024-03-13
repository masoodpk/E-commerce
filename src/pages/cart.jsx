import axios from 'axios'
import { useState, useEffect  } from 'react'
import Navbar from '../components/Navbar/Navbar';
import "./cart.css"
import { Toaster } from "react-hot-toast";
import Topic from '../components/assets/toppic.jpg'
import Cartitems from '../components/cart-component/cartitems';
import Mybag from '../components/assets/mybag.png'
import Footer from '../components/Footer/Footer.jsx'
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    const [showOrderMessage, setShowOrderMessage] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    
   console.log(data);
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

    const handleRemove = (userId) => {
        let token = localStorage.getItem("token");
        axios.delete(`/api/cartremove/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("Item removed from cart:", res.data);
            
            setData(prevData => prevData.filter(item => item._id !== userId));
            toast.success("Item removed from cart");
        })
        .catch(error => {
            console.error("Error removing item from cart:", error);
            toast.error("Failed to remove item from cart");
        });
    };


    const handleQuantityChange = (index, type) => {
        const updatedData = [...data];
        const maxQuantity = 10; 
    
        if (type === 'increase') {
            if (updatedData[index].quantity < maxQuantity) {
                updatedData[index].quantity++;
               
            }
        } else if (type === 'decrease') {
            if (updatedData[index].quantity > 1) {
                updatedData[index].quantity--;
                
            }
        }
        
        setData(updatedData);
    };



    const handleBuyNow = (index) => {
        setShowOrderMessage(false);
        setShowConfetti(true);
        setTimeout(() => {
            setShowOrderMessage(false);
            setShowConfetti(false); 
            toast.success("Item ordered"); 
        }, 2000); 
    };

    return (
        <>
            <div>
      <Toaster />
            <Navbar />
<div  className='topic'>
<img src={Topic} alt="" />
</div>



            <div>
                <div className='name'>
                <h1>MY BAG</h1>
                <img src={Mybag} alt="" />
                </div>


{data.map((item, index) => (
    <div className="card horizontal-card" key={index}>
    
        <div className="card-img">
            <img src={`${baseURL}/api/image/${item.profile}`} alt={item.name} />
        </div>
     
        <div className="card-content">
            <h4>{item.title}</h4>   
                                  
            <h4> {item.category}</h4>

            <h4>${item.discount}</h4>
           

            <div className="btnn-group">
                                                                                         
                <button className="btn remove"onClick={() =>handleRemove(item._id)}>Remove</button>
              
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
          {showConfetti && <Confetti />}
                </div>
            </div>

            <Cartitems /><br /><br /><br />
            <Footer />
         </>
    )
}

export default Cart;




