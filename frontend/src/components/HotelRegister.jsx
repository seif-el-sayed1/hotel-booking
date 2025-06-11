import React, { useContext, useState } from 'react'
import { assets, cities } from '../assets/assets'
import { UserContext } from '../context/UserContext'
import toast from "react-hot-toast";
import axios from 'axios';

export const HotelRegister = () => {
    const {setOverlay, overlay, backendUrl, setIsOwner, loading, setLoading} = useContext(UserContext)

    const [hotelName, setHotelName] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const {data} = await axios.post(backendUrl + '/api/ownerHotel/register', {hotelName, contact, city, address}) 
            if (data.success) {
                toast.success(data.message)
                setOverlay(!overlay)
                setIsOwner(true)
                window.location.reload()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="text-gray-500 relative">
            <div className="fixed inset-0 z-40 bg-black/30"></div>

            {loading &&
                <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-row gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                    </div>
                </div>
            }

            <div className="z-50 flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white w-80 sm:w-100  md:w-185">
                <img loading='lazy' onClick={() => setOverlay(!overlay)}
                    className=' absolute right-5 cursor-pointer top-5 ' src={assets.closeIcon} alt="close" />
                <img loading='lazy' className=" hidden md:block w-1/2 rounded-l-2xl object-cover" src={assets.regImage} alt="image" />
                
                <form onSubmit={handleSubmit}  
                    className="md:w-1/2 w-full ">
                    <h2 className="text-xl font-bold text-black text-center mt-10 mb-5">
                        Register Your Hotel
                    </h2>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="name">Hotel Name</label>
                        <input onChange={(e) => setHotelName(e.target.value)}
                            className="outline-blue-600 py-2 rounded px-2 border border-gray-200 w-full"
                            id="name"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="phone">Phone</label>
                        <input onChange={(e) => setContact(e.target.value)}
                            className="outline-blue-600 py-2 rounded px-2 border border-gray-200 w-full"
                            id="phone"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="address">Address</label>
                        <input onChange={(e) => setAddress(e.target.value)}
                            className="pb-10 pt-2 rounded px-2 outline-blue-600 border border-gray-200 w-full"
                            id="address"
                            type="text"
                            required
                            placeholder="Type Here"
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <label htmlFor="city">City</label>
                        <input  onChange={(e) => setCity(e.target.value)}
                            list="destinations"
                            id="destinationInput"
                            type="text"
                            className="py-2 rounded px-2 outline-blue-600 border border-gray-200 w-40"
                            placeholder="Select City"
                        />
                        <datalist id="destinations">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>

                    <div className="flex flex-col gap-1 px-10 mb-5">
                        <button
                            className="px-3 py-2 bg-blue-600 text-white cursor-pointer w-30 rounded hover:bg-blue-700 transition">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
