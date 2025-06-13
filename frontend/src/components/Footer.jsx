import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export const Footer = () => {
    const handleSubscribe = (e) => {
        e.preventDefault()
        toast.success("Thanks for subscribing!")
    }

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full bg-[#f9fafb] text-gray-600">
            <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-300 pb-10">
                <div className="md:max-w-md">
                    <img
                        loading="lazy"
                        className="h-9 invert"
                        src={assets.logo}
                        alt="QuickStay logo"
                    />
                    <p className="mt-6 text-sm leading-relaxed">
                        QuickStay is your trusted platform for booking luxury stays around the world.
                        From curated destinations to exclusive offers, we help you create unforgettable experiences.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-12 flex-1 md:justify-end">
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4 text-base">Company</h2>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-gray-900 transition">About us</Link></li>
                            <li><Link to="/contact" className="hover:text-gray-900 transition">Contact us</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-gray-900 transition">Privacy policy</Link></li>
                        </ul>
                    </div>

                    <section aria-labelledby="newsletter">
                        <h2 id="newsletter" className="font-semibold text-gray-800 mb-4 text-base">Subscribe to our newsletter</h2>
                        <p className="text-sm max-w-xs">
                            Get the latest news, articles, and exclusive offers straight to your inbox.
                        </p>
                        <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                            <label htmlFor="footerEmail" className="sr-only">Email address</label>
                            <input
                                autoComplete="off"
                                name="footerEmail"
                                id="footerEmail"
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="border border-gray-300 placeholder-gray-400 rounded px-3 h-10 w-full sm:w-64 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-4 h-10 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </section>
                </div>
            </div>

            <div className="pt-6 pb-5 text-center text-xs md:text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SEIF. All rights reserved.
            </div>
        </footer>
    )
}
