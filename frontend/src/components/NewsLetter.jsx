import React from 'react'
import { assets } from '../assets/assets'

export const NewsLetter = () => {
    return (
        <section className="flex flex-col items-center max-w-5xl w-full rounded-2xl px-4 py-12 md:py-16 mx-4 lg:mx-auto my-20 bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-semibold">Stay Inspired</h1>
                <p className="text-sm md:text-base text-gray-400 mt-3 max-w-xl mx-auto">
                    Join our newsletter and be the first to discover new updates, exclusive offers, and inspiration.
                </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-xl px-2">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Enter your email"
                    className="bg-white/10 text-white placeholder-gray-400 px-4 py-2.5 border border-white/20 rounded w-full focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-black hover:bg-white hover:text-black transition px-6 py-2.5 rounded active:scale-95 font-medium"
                >
                    Subscribe
                    <img loading='lazy' src={assets.arrowIcon} alt="Arrow icon" className="w-4 h-4" />
                </button>
            </form>

            <p className="text-gray-500 mt-6 text-xs text-center px-4">
                By subscribing, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a> and consent to receive updates.
            </p>
        </section>
    )
}
