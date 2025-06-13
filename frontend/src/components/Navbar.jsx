import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import toast from "react-hot-toast";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                setUserData(null);
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
                toast.success(data.message, { position: "top-center" });
                navigate('/verifyEmail');
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            toast.error(error.message, { position: "top-center" });
        }
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isNotHome = location.pathname !== "/";

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`fixed top-0 left-0 w-full z-10 flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 
                ${isScrolled || isNotHome ? "bg-white/90 shadow-md text-gray-800 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            
            <Link to="/" aria-label="Homepage" className="flex items-center gap-2">
                <img loading="lazy" src={assets.logo} alt="Hotel Booking Logo" className={`${isScrolled || isNotHome ? "brightness-0" : ""}`} />
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled || isNotHome ? "text-gray-800" : "text-white"}`}>
                        {link.name}
                        <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled || isNotHome ? "bg-gray-800" : "bg-white"}`} />
                    </Link>
                ))}

                {userData && isLoggedin && (
                    <button
                        aria-label={isOwner ? "Go to Dashboard" : "List Your Hotel"}
                        onClick={() => isOwner ? navigate("/owner") : setOverlay(!overlay)}
                        className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition duration-300 text-nowrap 
                            ${isScrolled || isNotHome ? "text-black hover:bg-black hover:text-white" : "text-white hover:bg-white hover:text-black"}`}>
                        {isOwner ? "Dashboard" : "List Your Hotel"}
                    </button>
                )}
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button aria-label="Search" className="cursor-pointer">
                    <img loading="lazy" src={assets.searchIcon} alt="Search Icon" className={`h-8 w-8 ${isScrolled || isNotHome ? "brightness-0" : ""}`} />
                </button>

                {userData && isLoggedin ? (
                    <>
                        <button onClick={() => setMenu(!menu)} aria-label="User menu">
                            <img loading="lazy" className="w-10 h-10 rounded-full cursor-pointer" src={userData.image || assets.avatar} alt="User Avatar" />
                        </button>
                        {menu && (
                            <div className="absolute top-16 right-6 w-48 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 z-50">
                                <p className="text-sm font-bold text-gray-500 border-b px-4 py-2">{userData.email}</p>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                                    <img loading="lazy" className="w-4 invert" src={assets.userIcon} alt="Edit Profile" />
                                    Edit Profile
                                </button>
                                <button onClick={() => navigate("/my-bookings")} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                                    <img loading="lazy" className="w-4" src={assets.bookings} alt="My Bookings" />
                                    My Bookings
                                </button>
                                {!userData.isVerified && (
                                    <button onClick={sentVerifyOtp} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                                        <img loading="lazy" className="w-4" src={assets.verify} alt="Verify Email" />
                                        Verify Email
                                    </button>
                                )}
                                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-100 flex items-center gap-2">
                                    <img loading="lazy" className="w-4" src={assets.logOut} alt="Logout" />
                                    <span className="font-bold text-red-500 hover:text-red-700">Logout</span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button onClick={() => navigate("/signUp")} className="bg-[#111827] text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer">
                        Login
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle mobile menu">
                    <img loading="lazy" src={assets.menuIcon} alt="Menu icon" className={`h-6 w-6 ${isScrolled || isNotHome ? "brightness-0" : ""}`} />
                </button>
            </div>

            {/* Mobile Screen */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 flex flex-col items-center justify-center gap-6 
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <img loading="lazy" src={assets.closeIcon} alt="Close menu" className="h-6 w-6" />
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {userData && isLoggedin && (
                    <>
                        <button onClick={() => { isOwner ? navigate("/owner") : setOverlay(!overlay); setIsMenuOpen(false); }}>
                            {isOwner ? "Dashboard" : "List Your Hotel"}
                        </button>
                        <img loading="lazy" className="w-16 h-16 rounded-full" src={userData.image || assets.avatar} alt="User avatar" />
                        <p className="text-gray-500 font-bold">{userData.email}</p>

                        <div className="flex flex-col gap-2">
                            <button className="hover:bg-gray-100 px-2 py-1 flex gap-2 items-center">
                                <img className="w-4" src={assets.edit} alt="Edit" />
                                Edit Profile
                            </button>
                            <button onClick={() => { navigate("/my-bookings"); setIsMenuOpen(false); }} className="hover:bg-gray-100 px-2 py-1 flex gap-2 items-center">
                                <img className="w-4" src={assets.bookings} alt="My Bookings" />
                                My Bookings
                            </button>
                            {!userData.isVerified && (
                                <button onClick={() => { sentVerifyOtp(); setIsMenuOpen(false); }} className="hover:bg-gray-100 px-2 py-1 flex gap-2 items-center">
                                    <img className="w-4" src={assets.verify} alt="Verify Email" />
                                    Verify Email
                                </button>
                            )}
                            <button onClick={logout} className="hover:bg-red-100 px-2 py-1 flex gap-2 items-center">
                                <img className="w-4" src={assets.logOut} alt="Logout" />
                                <span className="text-red-500 font-bold">Logout</span>
                            </button>
                        </div>
                    </>
                )}

                {!isLoggedin && (
                    <button onClick={() => { navigate("/signUp"); setIsMenuOpen(false); }} className="bg-black text-white px-8 py-2 rounded-full">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};
