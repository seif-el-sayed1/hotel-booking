import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

export const Navbar = () => {
    const navigate = useNavigate();
    const { setIsLoggedin, isLoggedin, userData, setUserData, backendUrl } = useContext(UserContext);

    const [menu, setMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Contact', path: '/' },
        { name: 'About', path: '/' },
    ];

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "user/logout");
            if (data.Success) {
                toast.success(data.message, { position: "top-center" });
                setUserData(false);
                setIsLoggedin(false);
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    const sentVerifyOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "user/send-verify-otp");
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4
                        md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
                        ${isScrolled || window.location.pathname !== "/"? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"}`}>

            <Link to="/" className="flex items-center gap-2">
                <img src={assets.logo} alt="logo" className={`${isScrolled || window.location.pathname !== "/" ? "invert opacity-80" : ""}`} />
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 
                                    ${isScrolled || window.location.pathname !== "/" ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled || window.location.pathname !== "/" ? "bg-gray-700" : "bg-white"} 
                                            h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                <button className={`border px-4 py-1 text-sm hover:text-black hover:bg-white
                                    font-light rounded-full cursor-pointer duration-500
                            ${isScrolled || window.location.pathname !== "/" ? 'text-black' : 'text-white'} transition-all`}>
                    Dashboard
                </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon}
                    alt="search icon" className={`h-8 w-8 cursor-pointer ${isScrolled || window.location.pathname !== "/" ? "invert" : ""}`} />

                {userData && isLoggedin ?
                    <>
                        <img onClick={() => setMenu(!menu)}
                            className='w-10 cursor-pointer rounded-full' src={userData.image} alt="user" />
                        {menu &&
                            <div className='flex flex-col absolute top-18 right-20 bg-white shadow-md rounded-lg'>
                                <p className='text-sm font-bold text-gray-500 px-2 pt-2 rounded-lg'>{userData.email}</p>
                                <div className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                    <img className='w-4' src={assets.edit} alt="edit" />
                                    <p>Edit Profile</p>
                                </div>
                                {!userData.isVerified &&
                                    <div onClick={sentVerifyOtp}
                                        className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                        <img className='w-4' src={assets.verify} alt="verify" />
                                        <p>Verify Email</p>
                                    </div>
                                }
                                <div onClick={logout}
                                    className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-red-100'>
                                    <img className='w-4' src={assets.logOut} alt="logout" />
                                    <p className='font-bold text-red-600'>Logout</p>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <button onClick={() => navigate("/signUp")} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer whitespace-nowrap">
                        Login
                    </button>
                }
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <img src={assets.menuIcon} alt="menu" onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`h-6 w-6 cursor-pointer ${isScrolled || window.location.pathname !== "/" ? "invert" : ""}`} />
            </div>

            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden 
                            items-center justify-center gap-6 font-medium text-gray-800 
                            transition-all duration-500 
                            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close" className="h-6 w-6 cursor-pointer" />
                </button>

                {navLinks.map((link, i) => (
                    <Link to={link.path} key={i} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                <button className="border hover:bg-black duration-500 hover:text-white px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Dashboard
                </button>

                {userData ?
                    <>
                        <img className='w-15 cursor-pointer rounded-full' src={userData.image} alt="user" />
                        <p className='font-bold text-gray-500 px-2 pt-1 rounded-lg'>{userData.email}</p>
                        <div className='flex items-center bg-white shadow-md rounded-lg'>
                            <div className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                <img className='w-4' src={assets.edit} alt="edit" />
                                <p>Edit Profile</p>
                            </div>
                            {!userData.isVerified &&
                                <div onClick={sentVerifyOtp}
                                    className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-gray-100'>
                                    <img className='w-4' src={assets.verify} alt="verify" />
                                    <p>Verify Email</p>
                                </div>
                            }
                            <div onClick={logout}
                                className='flex items-center gap-2 cursor-pointer rounded-lg px-2 py-2 hover:bg-red-100'>
                                <img className='w-4' src={assets.logOut} alt="logout" />
                                <p className='font-bold text-red-600'>Logout</p>
                            </div>
                        </div>
                    </>
                    :
                    <button onClick={() => navigate("/signUp")} className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer whitespace-nowrap">
                        Login
                    </button>
                }
            </div>
        </nav>
    );
};
