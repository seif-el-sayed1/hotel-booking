import React, { useContext } from 'react'
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
import { Rooms } from './pages/Rooms.jsx'
import { RoomDetails } from './pages/RoomDetails.jsx'
import { Bookings } from './pages/Bookings.jsx'
import { HotelRegister } from './components/HotelRegister.jsx'
import { OwnerNavbar } from './components/owner/OwnerNavbar.jsx'
import { SideBar } from './components/owner/SideBar.jsx'
import { UserContext } from './context/UserContext.jsx'
import { Dashboard } from './pages/owner/Dashboard.jsx'
import { AddRoom } from './pages/owner/AddRoom.jsx'
import { ListRoom } from './pages/owner/ListRoom.jsx'
import { Toaster } from "react-hot-toast";
import { Recommended } from './components/Recommended.jsx'


function App() {
  const { overlay, userData } = useContext(UserContext)

  const isOwner = window.location.pathname.includes("/owner");

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    {overlay && <HotelRegister />}
    <Routes>
      <Route path='/' element={
        <>
          <Navbar />
          <Home />
          <Recommended />
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
      <Route path='/rooms' element={
        <>
          <Navbar />
          <Rooms /> 
          <Footer />
        </>
      } />
      <Route path='/rooms/:id' element={
        <>
          <Navbar />
          <RoomDetails /> 
          <Footer />
        </>
      } />
      <Route path='/my-bookings' element={
        <>
          <Navbar />
          <Bookings /> 
          <Footer />
        </>
      } />
      
      

    </Routes>
    {isOwner &&  userData.role == "owner" &&
      <>
        <OwnerNavbar />
        <div className='flex'>
          <SideBar />
          <Routes>
            <Route path='/owner' element={<Dashboard />} />
            <Route path='/owner/add-room' element={<AddRoom />} />
            <Route path='/owner/list-room' element={<ListRoom />} />
          </Routes>
        </div>
        <Footer />
      </>
    } 
    </>
  )
}

export default App
