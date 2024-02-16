import axios from 'axios'
import { useState, useEffect  } from 'react'
import Navbar from '../components/Navbar/Navbar';
import "./cart.css"

function Cart() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);

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

    return (
        <>
            <div>
            <Navbar />
            <div>
                <div className='name'>
                <h1>MY CART</h1>
                </div>

                {data.map((item, index) => (

                    <div className="card " key={index}>

                        <img src={`${baseURL}/api/image/${item.image}`} width={"200"} />
                        <h4>{item.name}</h4>
                        <p>{item.new_price}</p>
                        <p>{item.old_price}</p>
                        <div className='horibtn'> 
                             <button class="btn btn-primary" >Buy Now</button>
                          <button class="btn btn-danger"  >Delete</button> 
                        </div>
                        
                    </div>
                ))}
                </div>
            </div>
          

        </>
    )
}

export default Cart;




