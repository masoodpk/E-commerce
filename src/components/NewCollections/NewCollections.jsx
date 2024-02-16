


import axios from 'axios'
import { useState, useEffect } from 'react'
import "./NewCollections.css"
import Wish from '../assets/wish.png'
import Carty from '../assets/carty.png'

function myProduct() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    const [wishStatus, setWishStatus] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {

        axios.get("/api/newCollections", {
            headers: {
                "Content-Type": "multipart/form-data",
        

            }
        })
            .then(res => {
             

                console.log(res.data);
                const userData = res.data.user;
                const limitedData = userData.length > 8 ? userData.slice(0, 8) : userData;
                setData(limitedData);
                console.log(limitedData);
                setWishStatus(Array(limitedData.length).fill(false));
                console.log(limitedData);

            })
            .catch(console.log);
    }, []);

    const handleClick = (index) => {
        const newWishStatus = [...wishStatus];
        newWishStatus[index] = !newWishStatus[index];
        setWishStatus(newWishStatus);

    
        const item = data[index];

        axios.post("/api/postnewcollections", {
            description: item.description,
            title: item.title,
            discount: item.discount,
            category: item.category,
            
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log("Item added to wishlist:", res.data);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000); 
        })
    
        .catch(error => {
            console.error("Error adding item to wishlist:", error);
        });
    };


    return (
        <>



    <div className="card-container"  >
        
    {data.map((item, index) => (
        <div className="card" key={index}>
            <div className="image-container">
                <img src={`${baseURL}/api/image/${item.profile}`} alt={item.title} />
            </div>
            <div className="content-container">
                     <h4>{item.title}</h4>
                      
                      <p>{item.category}</p>
                      <p>${item.discount}</p>
                      <p className='text-success'>offer price ${item.description}</p>
                     
                      <div className='icons-container'>
                                    <button className="icon-btn" onClick={() => handleClick(index)}>
                                        <img src={Carty} alt="Carty" className="icon" />
                                    </button>
                                    <button className="icon-btn" onClick={() => handleClick(index)}>
                                        <img src={Wish} alt="Wish" className="icon" />
                                    </button>
                                </div>
            </div>
        </div>
    ))}
</div>

{showMessage && (
                <div className="popup-message">Item added to wishlist</div>
            )}


        </>
    )
}

export default myProduct;




