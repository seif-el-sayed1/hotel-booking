import React from 'react'
import { assets, cities } from '../assets/assets'

export const HotelRegister = () => {
    return (
        <div className="text-gray-500 relative">
            <div className="fixed inset-0 z-40 bg-black/30"></div>
            <div className="z-50 flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white w-80 sm:w-100  md:w-185">
                <img className=' absolute right-5 cursor-pointer top-5 ' src={assets.closeIcon} alt="close" />
                <img className=" hidden md:block w-1/2 rounded-l-2xl object-cover" src={assets.regImage} alt="image" />

                <form className="md:w-1/2 w-full ">
                    <h2 className="text-xl font-bold text-black text-center mt-10 mb-5">
                        Register Your Hotel
                    </h2>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="name">Hotel Name</label>
                        <input
                            className="outline-blue-600 py-2 rounded px-2 border border-gray-200 w-full"
                            id="name"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="phone">Phone</label>
                        <input
                            className="outline-blue-600 py-2 rounded px-2 border border-gray-200 w-full"
                            id="phone"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="address">Address</label>
                        <input
                            className="pb-10 pt-2 rounded px-2 outline-blue-600 border border-gray-200 w-full"
                            id="address"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="city">City</label>
                        <input
                            list="destinations"
                            id="destinationInput"
                            type="text"
                            className="py-2 rounded px-2 outline-blue-600 border border-gray-200 w-40"
                            placeholder="Select City"
                            required
                        />
                        <datalist id="destinations">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <button className="px-3 py-2 bg-blue-600 text-white cursor-pointer w-30 rounded hover:bg-blue-700 transition">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
