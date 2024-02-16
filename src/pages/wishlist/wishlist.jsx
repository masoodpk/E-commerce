import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './wishlist.css'

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

    return (
        <>
            <div className="wishlist-container">
            <Navbar />
            <div className='wishname'>
<h1>My Wishlist</h1>
            </div>
            <div className="card-container">
                {data.map((item, index) => (

                    <div className="card " key={index}>

                        <img src={`${baseURL}/api/image/${item.profile}`} width={"200"} />
                        <h4>{item.title}</h4>
                      
                        <p>{item.category}</p>
                        <p>${item.discount}</p>
                        <p>${item.description}</p> 
                    </div>
                ))}
            </div>
            </div>


        </>
    )
}

export default Wishlist;
