import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { Navbar } from './components/Navbar.jsx'
import { Home } from './pages/Home.jsx'
import { SignUp } from './pages/SignUp.jsx'
import { VerifyEmail } from './pages/VerifyEmail.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'


function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={
        <>
          <Navbar />
          <Home />
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
