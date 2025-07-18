import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MyWork from './components/MyWork'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Review from './components/Review'
import Allreviews from './components/Allreviews'
import { useState, useEffect, createContext } from "react";
import axios from 'axios'

const App = () => {
  useEffect(() => {
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/test`)
    .then(res => console.log(res.data))
    .catch(err => console.error("Connection error:", err));
}, []);
  return (
    <div className='flex-col items-center justify-center'>
      <Navbar/>
      <Hero/>
      <About/>
      <MyWork/>
      <Review/>
      <Allreviews/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
