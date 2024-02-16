import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


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
  <>
  <div>
  {
<BrowserRouter>
<Routes>

<Route path="/" Component={Home} />
<Route path="/register" Component={Register} />
<Route path="/login" Component={Login} />
<Route path="/wishlist" Component={Wishlist} />
<Route path="/newProduct" Component={NewProduct} />
<Route path="/myProduct" Component={MyProduct} />
<Route path="/cart" Component={Cart} />




</Routes>

</BrowserRouter>
}


</div>
  
  
  </>
  )
}

export default App

