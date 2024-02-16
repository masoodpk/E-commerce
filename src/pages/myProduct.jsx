import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';

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
            <a href="/">
   <input type="submit" value="Home" />
</a>

        </>
    )
}

export default myProduct;




