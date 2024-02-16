import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import Reg from '/public/register.jpeg'
import Navbar from '../components/Navbar/Navbar'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

function Register() {


    const [state, setState] = useState(null);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
     

        },
        validate: registerValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values);
            try {
                console.log(values);
                let res = await axios.post("/api/register", { ...values })
                console.log(res);
                if (res.status == 201) {
                    toast.success(res.data.msg);
                    navigate("/login",{ replace: true});
                }

            }
            catch (error) {
                toast.error(error.res.data.msg)
            }
        }
    });

    return (
        <>
            <Navbar />
            <Toaster />
            <div className='container'>
                <div className='row'>
                    <h2 className='text-center'>Create Account</h2>
                </div>
                <div className='row'>
                    <div className='col-md-6'>

                        <form className='formBox  ' onSubmit={formik.handleSubmit} >
                            <div className="form-group  " >
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input {...formik.getFieldProps("username")} type="text" className="form-control" name="username" id="username" placeholder="Username" />
                                </div>
                                <label htmlFor="email">Email address</label>
                                <input {...formik.getFieldProps("email")} type="email" className="form-control" name="email" id="email" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input {...formik.getFieldProps("password")} type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input  {...formik.getFieldProps("confirmPassword")} type="Password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                            </div>

                        

                            <input type="submit" className="btn btn-primary" value="register" />
                            <p className="mt-4">Already have an account? <Link className="link" to={"/login"}>login</Link></p>
                        </form>

                    </div>

                    <div className='col-md-6 secondColumn' >
                        <img src={Reg} className='reg d-none d-md-block ' alt="" />
                    </div>


                </div>

            </div>

        </>
    )
}

export default Register;



function registerValidate(values) {
    let errors = {};
    if (values.email.length < 4) {
        errors = toast.error("please enter a valid email")
    } else if (values.username.length < 4) {
        errors = toast.error("please enter a valid username")
    } else if (values.password.length < 4) {
        errors = toast.error("please enter a valid password")
    } else if (values.confirmPassword < 4) {
        errors = toast.error("please enter a valid password")
    }
return errors;
}
