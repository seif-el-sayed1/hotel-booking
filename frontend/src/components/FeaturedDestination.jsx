import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from  '../context/AppContext'

export const FeaturedDestination = () => {
    
    const { allRooms, loading } = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <div className='pt-20 flex flex-col items-center justify-center bg-slate-50 ' >
            <div className='flex flex-col items-center justify-center pb-15'>
                <h1 className='font-light text-4xl mb-3'>Featured Destination</h1>
                <p className='text-gray-500 text-center max-w-150'>Discover our handpicked selection of exceptional 
                    properties around the world, offering unparalleled luxury and unforgettable experiences.</p>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-5'>
                {loading &&
                    <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-row gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        </div>
                    </div>
                }
                {allRooms.slice(0, 4).map((room) => {
                    return (
                        <div key={room._id} className='rounded-lg shadow-lg bg-white'>
                            <img loading='lazy' className='w-80 rounded-t-lg' src={room.images[0]} alt="room image" />
                            <div className='flex items-center justify-between px-3 pt-4'>
                                <p>{room.hotel.hotelName}</p>
                                <div className='flex items-center gap-1'>
                                    <img loading='lazy' src={assets.starIconFilled} alt="stat" />
                                    <span className='text-gray-500'>4.5</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 px-3 pt-1'>
                                <img loading='lazy' src={assets.locationIcon} alt="location" />
                                <p className='text-gray-500'>{room.hotel.address}</p>
                            </div>
                            <div className='flex items-center justify-between px-3 p-5'>
                                <p className='text-xl'>${room.pricePerNight}<span className='text-gray-500 text-sm'>/night</span></p>
                                <button onClick={() => navigate(`/rooms/${room._id}`)}
                                    className='border-1 border-gray-500 hover:bg-gray-200 duration-200
                                    rounded-md text-gray-500 p-2 text-sm cursor-pointer'>Book Now
                                </button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <button onClick={() => {navigate('/rooms'); window.scrollTo({ top: 0, behavior: 'smooth' })}}
                className='text-sm border-1 border-gray-300 hover:bg-gray-200 duration-200 px-2 py-1 
                                cursor-pointer my-10 font-bold '>
                View All Destinations
            </button>    
        </div>

    )
}
