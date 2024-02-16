import axios from "axios";
import {useFormik} from "formik";
import {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './newProduct.css'

import Navbar from "../components/Navbar/Navbar";

function newProduct(){
    const  navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            title:"",
            category:"",
            discount:"",
            description:""
           
           
        },
        validate: () => {},
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (value) => {
            try {
              let formData = new FormData();
              formData.append("title", value.title);
              formData.append("category", value.category)
              formData.append("discount", value.discount)
              formData.append("description", value.description);
              formData.append("file", document.querySelector("#file").files[0]);
             
                let res = await axios.post("/api/newProduct",formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                });
                console.log(res);
                if(res.status == 201){
                    toast.success(res.data.msg);
                 
                    // navigate("/",{ replace: true});
                }
            }catch(error){
                toast.error(error.response.data.msg);
            }
        }
    });

    

return(


    <div>
       <Toaster />
       <Navbar />
       <div className="cardi">

      
<form onSubmit={formik.handleSubmit}   method="post" encType="multipart/form-data">
<div className="form-groupii">
        <input type="file" name="file" id="file" placeholder="file"/>
        </div>
        <div className="form-groupii">
        <input {...formik.getFieldProps("title")} type="text"  className="form-control" name="title" id="title" placeholder="brand" />
        </div>
        <div className="form-groupii">
        <input  {...formik.getFieldProps("category")} className="form-control" id="category" type="text" name="category" placeholder="title" /> 
        </div>
        <div className="form-groupii">
        <input {...formik.getFieldProps("discount")}  id="discount" type="text" className="form-control" name="discount" placeholder="price" />
        </div>
        <div className="form-groupii">
        <input {...formik.getFieldProps("description")} type="text"  className="form-control" name="description" id="description" placeholder="offer price" />
        </div>
        <input type="submit" value="upload"  className="btn btn-secondary"  />
      
      </form>


<a href="/myProduct">My Products</a><br />
<a href="/">Home</a>


</div>





    </div>
)


}
export default newProduct;


