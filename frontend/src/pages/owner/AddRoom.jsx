import React from 'react'
import { assets } from "../../assets/assets"

export const AddRoom = () => {
    const amenities = [
        "Free WiFi",
        "Free Breakfast",
        "Room Service",
        "Mountain View",
        "Pool Access"
    ]

    return (
        <div className='w-4/5'>
            <div className='py-10 pl-5 text-center lg:text-start'>
                <h1 className='font-light text-4xl mb-3'>Add Room</h1>
                <p className='text-gray-500 text-sm md:text-lg'>
                    Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.
                </p>
            </div>
            <form className='pb-5'>
                <h2 className='pl-5 mb-2 text-black/80 text-lg'>Images</h2>
                <div className='flex items-center flex-wrap gap-3 pl-5 mb-10'>
                    {Array(4).fill(0).map((_, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor="roomImage">
                                    <img className='w-30 cursor-pointer' src={assets.uploadArea} alt="upload" />
                                </label>
                                <input id='roomImage' type="file" hidden required/>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center flex-wrap gap-5 pl-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg text-black/80' htmlFor="types">Room Type</label>
                        <input className='outline-none py-2 px-1 w-45 border border-gray-200 rounded'
                            list='types' type="text" placeholder='Select Room Type' required />
                        <datalist id='types' >
                            <option value="Single Bed"></option>
                            <option value="Double Bed"></option>
                            <option value="Luxury Room"></option>
                            <option value="Family Suit"></option>
                        </datalist>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg text-black/80' htmlFor="price">Price</label>
                        <input className='outline-none py-2 px-1 w-30 border border-gray-200 rounded'
                            id='price' type="number" required placeholder='$'/>
                    </div>
                </div>
                <div>
                    <h2 className=' pl-5  mb-2 mt-5 text-lg text-black/80'>Amenities</h2>
                    {amenities.map((ele, index) => {
                        return (
                            <div key={index} className='flex items-center gap-2 pl-5'>
                                <input type="checkbox" required id={ele}  />
                                <label className=' text-black/80' htmlFor={ele}>{ele}</label>
                            </div>
                        )
                    })}
                </div>
                <button className='text-white ml-5 mt-3 w-40 py-2 bg-blue-600 cursor-pointer rounded-md'>Add Room</button>
            </form>
        </div>
    )
}
