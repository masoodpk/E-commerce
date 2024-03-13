import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './wishlist.css'
import Wishcompo from '../../components/wishlist-component/wishcompo';
import Footer from '../../components/Footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        let token = localStorage.getItem("token")
        axios.get("/api/wishlist", {
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
        axios.delete(`/api/wishremove/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("Item removed from wishlist:", res.data);
            setData(prevData => prevData.filter(item => item._id !== userId));
              toast.success("Item removed from cart");
        })
        .catch(error => {
            console.error("Error removing item from wishlist:", error);
        });
    };

    return (
        <>
            <div className="wishlist-container">
            <Navbar />
            <div className='wishname'>
<h1>My Wishlist</h1>
            </div>
            <div className="card-container">
                {data.map((item, index) => (

                    <div className="card tri" key={index}>
         <button className="remove-btn" onClick={() => handleRemove(item._id)}>×</button>
                        <img src={`${baseURL}/api/image/${item.profile}`} width={"200"} />
                        <div className="text-left">
                        <h4>{item.title}</h4>
                      
                        <p>{item.category}</p>
                        <p>Price${item.discount}</p>
                        <p className='offer'>OfferPrice${item.description}</p> 
                        </div>
                    </div> 
                ))}
            </div>
            </div>

<Wishcompo /><br />
<br />
<Footer />
        </>
    )
}

export default Wishlist;
