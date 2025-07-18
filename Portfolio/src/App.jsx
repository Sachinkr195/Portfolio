import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MyWork from './components/MyWork'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Review from './components/Review'
import Allreviews from './components/Allreviews'


const App = () => {

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
