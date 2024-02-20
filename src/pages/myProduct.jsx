import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import './myproduct.css'
import Footer from '../components/Footer/Footer';
import Cartitems from '../components/cart-component/cartitems';

function myProduct() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        let token = localStorage.getItem("token")
        axios.get("/api/myProduct", {
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
            <div className="card-container">
                {data.map((item, index) => (

                    <div className="card two" key={index}>

                        <img src={`${baseURL}/api/image/${item.profile}`} width={"200"} />
                        <h4>{item.title}</h4>
                      
                        <p>{item.category}</p>
                        <p>Price:${item.discount}</p>
                        <p>Offer Price:${item.description}</p> 
                    </div>
                ))}
            </div>
            </div>
<Cartitems /><br /><br /><br />

<Footer />

        </>
    )
}

export default myProduct;




