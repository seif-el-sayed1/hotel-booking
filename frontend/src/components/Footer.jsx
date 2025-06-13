import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full bg-gray-100 text-gray-600">
            <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-300 pb-10">
                <div className="md:max-w-md">
                    <img
                        loading='lazy'
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
                            <li><a href="#" className="hover:text-gray-900 transition">Home</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition">About us</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition">Contact us</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4 text-base">Subscribe to our newsletter</h2>
                        <p className="text-sm max-w-xs">
                            Get the latest news, articles, and exclusive offers straight to your inbox.
                        </p>
                        <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                name="email"
                                id="email"
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
                    </div>
                </div>
            </div>

            <div className="pt-6 pb-5 text-center text-xs md:text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SEIF. All rights reserved.
            </div>
        </footer>
    )
}
