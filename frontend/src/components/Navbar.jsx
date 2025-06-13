import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import toast from "react-hot-toast";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

export const Navbar = () => {
    const navigate = useNavigate();
    const { setIsLoggedin, isLoggedin, userData, setUserData, backendUrl, overlay, setOverlay, isOwner } = useContext(UserContext);

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 z-10
                md:px-16 lg:px-24 xl:px-32 transition-all duration-500
                ${isScrolled || window.location.pathname !== "/" ? "bg-white/90 shadow-md text-gray-800 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            
            <Link to="/" aria-label="Homepage" className="flex items-center gap-2">
                <img loading="lazy" src={assets.logo} alt="Hotel Booking Logo" className={`${isScrolled || window.location.pathname !== "/" ? "brightness-0" : ""}`} />
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled || window.location.pathname !== "/" ? "text-gray-800" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled || window.location.pathname !== "/" ? "bg-gray-800" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                {userData && isLoggedin && (
                    <button
                        aria-label={isOwner ? "Go to Dashboard" : "List Your Hotel"}
                        onClick={() => { isOwner ? navigate("/owner") : setOverlay(!overlay) }}
                        className={`border px-4 py-1 text-sm hover:text-black hover:bg-white font-light rounded-full cursor-pointer duration-500 text-nowrap transition-all 
                            ${isScrolled || window.location.pathname !== "/" ? 'text-black' : 'text-white'}`}>
                        {isOwner ? "Dashboard" : "List Your Hotel"}
                    </button>
                )}
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button aria-label="Search" className="cursor-pointer">
                    <img loading="lazy" src={assets.searchIcon} alt="Search Icon" className={`h-8 w-8 ${isScrolled || window.location.pathname !== "/" ? "brightness-0" : ""}`} />
                </button>

                {userData && isLoggedin ? (
                    <>
                        <button onClick={() => setMenu(!menu)} aria-label="User menu">
                            <img loading="lazy" className='w-10 h-10 rounded-full' src={userData.image || assets.avatar} alt="User Avatar" />
                        </button>
                        {menu &&
                            <div className='flex flex-col absolute top-18 right-20 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200'>
                                <p className='text-sm font-bold text-gray-500 pr-5 border-b border-gray-200 pl-3 py-2'>{userData.email}</p>
                                <button className='flex items-center gap-2 border-b border-gray-200 cursor-pointer pr-5 pl-3 py-2 hover:bg-gray-100'>
                                    <img loading="lazy" className='w-4 invert' src={assets.userIcon} alt="Edit profile" />
                                    Edit Profile
                                </button>
                                <button onClick={() => navigate("/my-bookings")} className='flex items-center gap-2 border-b border-gray-200 cursor-pointer pr-5 pl-3 py-2 hover:bg-gray-100'>
                                    <img loading="lazy" className='w-4' src={assets.bookings} alt="My bookings" />
                                    My Bookings
                                </button>
                                {!userData.isVerified &&
                                    <button onClick={sentVerifyOtp} className='flex items-center gap-2 border-b border-gray-200 cursor-pointer pr-5 pl-3 py-2 hover:bg-gray-100'>
                                        <img loading="lazy" className='w-4' src={assets.verify} alt="Verify Email" />
                                        Verify Email
                                    </button>
                                }
                                <button onClick={logout} className='flex items-center gap-2 rounded-b-lg cursor-pointer pr-5 pl-3 py-2 hover:bg-red-100'>
                                    <img loading="lazy" className='w-4' src={assets.logOut} alt="Logout" />
                                    <p className='font-bold text-red-500 hover:text-red-700 transition'>Logout</p>
                                </button>
                            </div>
                        }
                    </>
                ) : (
                    <button onClick={() => navigate("/signUp")} className="bg-[#111827] text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer whitespace-nowrap">
                        Login
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle mobile menu">
                    <img loading="lazy" src={assets.menuIcon} alt="Menu icon" className={`h-6 w-6 ${isScrolled || window.location.pathname !== "/" ? "brightness-0" : ""}`} />
                </button>
            </div>

            {/* Mobile screen */}
            <div className={`fixed top-0 z-10 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden 
                items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <img loading="lazy" src={assets.closeIcon} alt="Close menu" className="h-6 w-6" />
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {userData && isLoggedin &&
                    <button onClick={() => { isOwner ? navigate("/owner") : setOverlay(!overlay) }}
                        className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer duration-500 text-nowrap">
                        {isOwner ? "Dashboard" : "List Your Hotel"}
                    </button>
                }

                {userData && isLoggedin ? (
                    <>
                        <img loading="lazy" className='w-15 rounded-full' src={userData.image || assets.avatar} alt="User avatar" />
                        <p className='font-bold text-gray-500 px-2 pt-1'>{userData.email}</p>
                        <div className='flex flex-col items-start'>
                            <button className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100'>
                                <img loading="lazy" className='w-4' src={assets.edit} alt="Edit profile" />
                                Edit Profile
                            </button>
                            <button onClick={() => {navigate("/my-bookings"); setIsMenuOpen(false)}} className='flex items-center gap-2 border-t border-gray-200 px-2 py-2 hover:bg-gray-100'>
                                <img loading="lazy" className='w-4' src={assets.bookings} alt="My bookings" />
                                My Bookings
                            </button>
                            {!userData.isVerified &&
                                <button onClick={sentVerifyOtp} className='flex items-center gap-2 px-2 py-2 hover:bg-gray-100'>
                                    <img loading="lazy" className='w-4' src={assets.verify} alt="Verify Email" />
                                    Verify Email
                                </button>
                            }
                            <button onClick={logout} className='flex items-center gap-2 px-2 py-2 hover:bg-red-100'>
                                <img loading="lazy" className='w-4' src={assets.logOut} alt="Logout" />
                                <p className='font-bold text-red-500 hover:text-red-700'>Logout</p>
                            </button>
                        </div>
                    </> 
                ) : (
                    <button onClick={() => navigate("/signUp")} className="bg-[#111827] text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer whitespace-nowrap">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};
