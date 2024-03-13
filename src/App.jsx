import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'

import NewProduct from './pages/newProduct'
import MyProduct from './pages/myProduct'
import Cart from './pages/cart'
import Wishlist from './pages/wishlist/wishlist'


import axios from 'axios'
function App() {
  axios.defaults.baseURL=location.href;
  if(import.meta.env.DEV){
   axios.defaults.baseURL = "http://localhost:3005"
  }
 
  return (
  
  <div>

<BrowserRouter>
<Routes>

<Route path="/" element={<Home />} />
<Route path="/register" element={<Register/>} />
<Route path="/login" element={<Login/>} />
<Route path="/wishlist" element={<Wishlist/>} />
<Route path="/newProduct" element={<NewProduct/>} />
<Route path="/myProduct" element={<MyProduct/>} />
<Route path="/cart" element={<Cart/>} />

</Routes>

</BrowserRouter>
<ToastContainer />


</div>
  
  

  )
}

export default App

