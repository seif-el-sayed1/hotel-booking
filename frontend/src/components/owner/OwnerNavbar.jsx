import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { assets } from "../../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from 'axios'

export const OwnerNavbar = () => {
    const navigate = useNavigate()
    const { setIsLoggedin, isLoggedin, userData, setUserData, backendUrl } = useContext(UserContext)

    const [menu, setMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(`${backendUrl}/api/user/logout`)
            if (data.Success) {
                toast.success(data.message, { position: "top-center" })
                setUserData(false)
                setIsLoggedin(false)
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" })
        }
    }

    const sentVerifyOtp = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(`${backendUrl}/api/user/send-verify-otp`)
            if (data.Success) {
                navigate('/verifyEmail')
                toast.success(data.message, { position: "top-center" })
            } else {
                toast.error(data.message, { position: "top-center" })
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" })
        }
    }

    return (
        <header className='flex w-full py-4 items-center justify-between md:px-16 px-4 border-b border-gray-300'>
            <Link to="/" aria-label="Home">
                <img loading='lazy' className='invert' src={assets.logo} alt="App logo" />
            </Link>

            <div className="hidden md:flex items-center gap-4 relative">
                {userData && isLoggedin &&
                    <>
                        <img
                            loading='lazy'
                            onClick={() => setMenu(!menu)}
                            className='w-10 h-10 cursor-pointer rounded-full'
                            src={userData.image || assets.avatar}
                            alt="User profile"
                            role="button"
                            aria-label="Toggle user menu"
                        />

                        {menu &&
                            <div className='flex flex-col absolute top-14 right-0 bg-white shadow-md rounded-lg z-20 w-48'>
                                <p className='text-sm font-bold text-gray-500 border-b border-gray-200 px-4 py-2'>{userData.email}</p>

                                <button className='flex items-center gap-2 border-b border-gray-200 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                    <img className='w-4 invert' src={assets.userIcon} alt="Edit profile icon" />
                                    Edit Profile
                                </button>

                                <button onClick={() => navigate("/my-bookings")} className='flex items-center gap-2 border-b border-gray-200 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                    <img className='w-4' src={assets.bookings} alt="Bookings icon" />
                                    My Bookings
                                </button>

                                {!userData.isVerified &&
                                    <button onClick={sentVerifyOtp} className='flex items-center gap-2 border-b border-gray-200 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                        <img className='w-4' src={assets.verify} alt="Verify email icon" />
                                        Verify Email
                                    </button>
                                }

                                <button onClick={logout} className='flex items-center gap-2 px-4 py-2 hover:bg-red-100 w-full text-left'>
                                    <img className='w-4' src={assets.logOut} alt="Logout icon" />
                                    <span className='font-bold text-red-600'>Logout</span>
                                </button>
                            </div>
                        }
                    </>
                }
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <img
                    src={assets.menuIcon}
                    alt="Open menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="h-6 w-6 cursor-pointer invert"
                    role="button"
                    aria-label="Open menu"
                />
            </div>

            {/* Mobile Screen */}
            <div className={`fixed top-0 left-0 w-full z-10 h-screen bg-white text-base flex flex-col md:hidden 
                items-center justify-center gap-6 font-medium text-gray-800 
                transition-transform duration-300 ease-in-out
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <img src={assets.closeIcon} alt="Close menu" className="h-6 w-6 cursor-pointer" />
                </button>

                {userData && isLoggedin &&
                    <>
                        <img className='w-16 h-16 rounded-full' src={userData.image || assets.avatar} alt="User profile" />
                        <p className='font-bold text-gray-500 px-2 pt-1'>{userData.email}</p>

                        <div className='flex flex-col  gap-3  px-10'>
                            <button className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                <img className='w-4' src={assets.edit} alt="Edit profile icon" />
                                Edit Profile
                            </button>

                            <button onClick={() => navigate("/my-bookings")} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                <img className='w-4' src={assets.bookings} alt="Bookings icon" />
                                My Bookings
                            </button>

                            {!userData.isVerified &&
                                <button onClick={sentVerifyOtp} className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left'>
                                    <img className='w-4' src={assets.verify} alt="Verify email icon" />
                                    Verify Email
                                </button>
                            }

                            <button onClick={logout} className='flex items-center gap-2 px-4 py-2 hover:bg-red-100 w-full text-left'>
                                <img className='w-4' src={assets.logOut} alt="Logout icon" />
                                <span className='font-bold text-red-600'>Logout</span>
                            </button>
                        </div>
                    </>
                }
            </div>
        </header>
    )
}
