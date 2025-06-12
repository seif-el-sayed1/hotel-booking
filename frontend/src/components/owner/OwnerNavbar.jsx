import React, {useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext'
import { assets } from "../../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

export const OwnerNavbar = () => {
    const navigate = useNavigate();
    const { setIsLoggedin, isLoggedin, userData, setUserData, backendUrl } = useContext(UserContext);
    
    const [menu, setMenu] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/user/logout");
            if (data.Success) {
                toast.success(data.message, { position: "top-center" });
                window.location.reload();
                setUserData(false);
                setIsLoggedin(false);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };
    const sentVerifyOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/user/send-verify-otp");
            if (data.Success) {
                navigate('/verifyEmail');
                toast.success(data.message, { position: "top-center" });
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    return (
        <div className='flex w-full py-4 items-center justify-between md:px-16 px-4  border-b-1 border-gray-300'>
            <Link to="/">
                <img loading='lazy' className='invert' src={assets.logo} alt="logo" />
            </Link>
            <div className="hidden md:flex items-center gap-4">
                {userData && isLoggedin &&
                    <>
                        <img loading='lazy' onClick={() => setMenu(!menu)}
                            className='w-10 cursor-pointer rounded-full' src={userData.image || assets.avatar} alt="user" />
                        {menu &&
                            <div className='flex flex-col absolute top-18 right-15  bg-white shadow-md rounded-lg'>
                                <p className='text-sm font-bold text-gray-500 pr-5 border-b-1 border-gray-200 pl-3 py-2 '>{userData.email}</p>
                                <div className='flex items-center gap-2 border-b-1 border-gray-200 cursor-pointer  pr-5 pl-3 py-2 hover:bg-gray-100'>
                                    <img loading='lazy' className='w-4 invert ' src={assets.userIcon} alt="edit" />
                                    <p>Edit Profile</p>
                                </div>
                                {!userData.isVerified &&
                                    <div onClick={sentVerifyOtp}
                                        className='flex items-center gap-2 border-b-1 border-gray-200 cursor-pointer  pr-5 pl-3 py-2 hover:bg-gray-100'>
                                        <img loading='lazy' className='w-4' src={assets.verify} alt="verify" />
                                        <p>Verify Email</p>
                                    </div>
                                }
                                <div onClick={logout}
                                    className='flex items-center gap-2 rounded-b-lg cursor-pointer  pr-5 pl-3 py-2 hover:bg-red-100'>
                                    <img loading='lazy' className='w-4' src={assets.logOut} alt="logout" />
                                    <p className='font-bold text-red-600'>Logout</p>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <img loading='lazy' src={assets.menuIcon} alt="menu" onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`h-6 w-6 cursor-pointer invert`} />
            </div>
            
            {/* Mobil Screen */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden 
                            items-center justify-center gap-6 font-medium text-gray-800 
                            transition-all duration-500 
                            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img loading='lazy' src={assets.closeIcon} alt="close" className="h-6 w-6 cursor-pointer" />
                </button>
                
                {userData && isLoggedin &&
                    <>
                        <img loading='lazy' className='w-15 cursor-pointer rounded-full' src={userData.image || assets.avatar} alt="user" />
                        <p className='font-bold text-gray-500 px-2 pt-1 rounded-lg'>{userData.email}</p>
                        <div className='flex items-center bg-white shadow-md rounded-lg'>
                            <div className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                <img loading='lazy' className='w-4' src={assets.edit} alt="edit" />
                                <p>Edit Profile</p>
                            </div>
                            {!userData.isVerified &&
                                <div onClick={sentVerifyOtp}
                                    className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                    <img loading='lazy' className='w-4' src={assets.verify} alt="verify" />
                                    <p>Verify Email</p>
                                </div>
                            }
                            <div onClick={logout}
                                className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-red-100'>
                                <img loading='lazy' className='w-4' src={assets.logOut} alt="logout" />
                                <p className='font-bold text-red-600'>Logout</p>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
