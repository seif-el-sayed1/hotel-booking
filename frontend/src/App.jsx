import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { Navbar } from './components/Navbar.jsx'
import { Home } from './pages/Home.jsx'
import { SignUp } from './pages/SignUp.jsx'
import { VerifyEmail } from './pages/VerifyEmail.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import { FeaturedDestination } from './components/FeaturedDestination.jsx'
import { ExclusiveOffers } from './components/ExclusiveOffers.jsx'
import { Testimonials } from './components/Testimonials.jsx'
import { NewsLetter } from './components/NewsLetter.jsx'
import { Footer } from './components/Footer.jsx'


function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={
        <>
          <Navbar />
          <Home />
          <FeaturedDestination />
          <ExclusiveOffers />
          <Testimonials />
          <NewsLetter />
          <Footer />
        </>
      } />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/verifyEmail' element={<VerifyEmail />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
    </Routes>
    </>
  )
}

export default App
