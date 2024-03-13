


import axios from 'axios'
import { useState, useEffect } from 'react'
import "./NewCollections.css"
import Wish from '../assets/wish.png'
import Carty from '../assets/carty.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function myProduct() {
    let baseURL = location.href;
    if (import.meta.env.DEV) {
        baseURL = "http://localhost:3005"
    }
    const [data, setData] = useState([]);
    const [wishStatus, setWishStatus] = useState([]);
    const [showWishlistMessage, setShowWishlistMessage] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [image, setImage] = useState(null);

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
            .catch(error => {
                console.error("Error fetching data from newCollections:", error);

            });
    }, []);



    const handleClick = (index) => {



        const item = data[index];

        axios.post("/api/postnewcollections", {
            description: item.description,
            title: item.title,
            discount: item.discount,
            category: item.category,
            profile: item.profile

        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })


            .then(res => {
                console.log("Item added to wishlist:", res.data);
                setShowMessage(false);
                setShowWishlistMessage(false);
                // setShowCartMessage(true);
                toast.success("Item added to wishlist", { autoClose: 2000 });
                setTimeout(() => setShowWishlistMessage(false), 2000);
            })

            .catch(error => {
                console.error("Error adding item to wishlist:", error);
            });
    };

    const handleCartClick = (index, quantity) => {


        const item = data[index];

        axios.post("/api/cartnewcollections", {
            title: item.title,
            category: item.category,
            profile: item.profile,
            quantity:quantity,
            discount: item.discount
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })


            .then(res => {
                console.log("Item added to cart:", res.data);
                setShowMessage(true);
                setShowCartMessage(false);
                toast.success("Item added to cart", { autoClose: 2000 });
                setTimeout(() => setShowCartMessage(false), 2000);
            })

            .catch(error => {
                console.error("Error adding item to cart:", error);
            });
    };

    return (
        <>
        <div className='newz'>
        <h1>NEW COLLECTIONS</h1>
        </div>


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

                                <button className="icon-btn" onClick={() => handleCartClick(index, 1)}>
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



            {showWishlistMessage && (
                <div className="popup-message wishlist">
                    Item added to wishlist
                </div>
            )}
            {showCartMessage && (
                <div className="popup-message cart">
                    Item added to cart
                </div>
            )}


        </>
    )
}

export default myProduct;




