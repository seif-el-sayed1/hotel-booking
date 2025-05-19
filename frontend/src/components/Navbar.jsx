import React from 'react'
import {Link} from 'react-router-dom'
import { assets } from '../assets/assets';

export const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Contact', path: '/' },
        { name: 'About', path: '/' },
    ];

    // const ref = React.useRef(null)

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollTop > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 
                        md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
                        ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" 
                            : "py-4 md:py-6"}`}>
                                
            <Link href="/" className="flex items-center gap-2">
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 
                                    ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} 
                                            h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                <button className={`border px-4 py-1 text-sm hover:text-black hover:bg-white
                                    font-light rounded-full cursor-pointer duration-500
                            ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                    Dashboard
                </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon} 
                        alt="search icon" className={`h-8 w-8 cursor-pointer ${isScrolled ? "invert" : ""}`}/>
                <button className="bg-black text-white px-8 py-2.5 
                                rounded-full ml-4 transition-all duration-500 cursor-pointer">
                    get started
                </button>
            </div>

            <div className="flex items-center gap-3 md:hidden">
                <img src={assets.menuIcon} alt="menu icon" onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}/>
            </div>

            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden 
                            items-center justify-center gap-6 font-medium text-gray-800 
                            transition-all duration-500 
                            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close icon" className="h-6 w-6 cursor-pointer"/>
                </button>

                {navLinks.map((link, i) => (
                    <Link to={link.path} key={i} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                <button className="border hover:bg-black duration-500 hover:text-white px-4 py-1 text-sm font-light 
                                    rounded-full cursor-pointer transition-all">
                    Dashboard
                </button>

                <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all
                    cursor-pointer duration-500">
                    get started
                </button>
            </div>
        </nav>
    );
}