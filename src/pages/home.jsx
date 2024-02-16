import React from 'react'
import './home.css'
import Navbar from '../components/Navbar/Navbar';;
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import Footer from '../components/Footer/Footer';


function Home() {
  return (
    <div className='container-fluid'>
<Navbar />
<Hero />
<Popular/>
    <Offers/>
    <NewCollections/>
    <NewsLetter/>
    <Footer />


    </div>
  )
}

export default Home;