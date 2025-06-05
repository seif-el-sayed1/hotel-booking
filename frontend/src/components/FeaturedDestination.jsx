import React, { useContext } from 'react'
import { assets, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from  '../context/AppContext'

export const FeaturedDestination = () => {
    
    const { allRooms } = useContext(AppContext)

    const navigate = useNavigate()
    return (
        <div className='pt-20 flex flex-col items-center justify-center bg-slate-50 ' >
            <div className='flex flex-col items-center justify-center pb-15'>
                <h1 className='font-light text-4xl mb-3'>Featured Destination</h1>
                <p className='text-gray-500 text-center max-w-150'>Discover our handpicked selection of exceptional 
                    properties around the world, offering unparalleled luxury and unforgettable experiences.</p>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-5'>
                {allRooms.slice(0, 4).map((room) => {
                    return (
                        <div key={room._id} className='rounded-lg shadow-lg bg-white'>
                            <img className='w-80 rounded-t-lg' src={room.images[0]} alt="room image" />
                            <div className='flex items-center justify-between px-3 pt-4'>
                                <p>{room.hotel.name}</p>
                                <div className='flex items-center gap-1'>
                                    <img src={assets.starIconFilled} alt="stat" />
                                    <span className='text-gray-500'>4.5</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 px-3 pt-1'>
                                <img src={assets.locationIcon} alt="location" />
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
