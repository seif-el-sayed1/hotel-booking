import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { Navbar } from './components/Navbar.jsx'
import { Home } from './pages/Home.jsx'
import { SignUp } from './pages/SignUp.jsx'


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
    </Routes>
    </>
  )
}

export default App
