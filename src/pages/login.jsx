
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import './login.css'
import Navbar from "../components/Navbar/Navbar";
import Loginpic from '/public/loginPic.jpg'
import { Link, useNavigate } from 'react-router-dom'



function Login() {
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: loginValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                let res = await axios.post("/api/login", values);
                console.log(res);
                if (res.status == 201) {
                    toast.success(res.data.msg);
                    console.log(res.data.user.type);
                    localStorage.setItem("token", res.data.token);
                    location.href = "/"
                    // if (res.data.user.type === "buyer") {
                    //     navigate("/buyer");
                    // } else if (res.data.user.type === "seller") {
                    //     navigate("/seller");
                    // } else {
                    //     console.error("Unknown user:", res.data.type);
                    // }
                    
                }
            }
            catch (error) {

                console.error("Not Submitted", error);
            }
        }


    });


    return (


        <div>
            <Navbar />
            <Toaster />

            <div className="container">
                <img src='' alt="" />
                <div className="row ">

                    <h2 className='login mt-4  '>Login</h2>

                </div>

                <div className="row">


                    <form className="formTable" onSubmit={formik.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input {...formik.getFieldProps("username")} type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Username" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input {...formik.getFieldProps("password")} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <input type="submit" className="btn btn-success btn-block" value="login" />
                    </form>


                </div>

            </div>

        </div>


    )
}



export default Login;

function loginValidate(values) {
    let errors = {};
    if (values.username.length < 4) {
        errors = toast.error("please enter a valid username!");
        // errors.username = "Please enter a valid username!";
    } else if (values.password.length < 4) {
        errors = toast.error("please enter a valid password!");
        // errors.password = "Please enter a valid password!";
    }
    return errors;
}



