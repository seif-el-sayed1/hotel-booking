import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const FeaturedDestination = () => {
    const { allRooms, loading } = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <section
            className='pt-20 flex flex-col items-center justify-center bg-slate-50'
            aria-labelledby="featured-destination-heading"
        >
            <div className='flex flex-col items-center justify-center pb-15 text-center px-4'>
                <h1
                    id="featured-destination-heading"
                    className='font-light text-4xl mb-3'
                >
                    Featured Destination
                </h1>
                <p className='text-gray-500 max-w-3xl'>
                    Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
                </p>
            </div>

            {loading && (
                <div
                    className="fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    role="status"
                    aria-label="Loading destinations"
                >
                    <div className="flex flex-row gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                    </div>
                </div>
            )}

            <div
                className='flex flex-wrap items-center justify-center gap-5 mt-10'
                role="list"
                aria-label="Featured rooms"
            >
                {allRooms.slice(0, 4).map((room) => (
                    <article
                        key={room._id}
                        className='rounded-lg shadow-lg bg-white w-80'
                        role="listitem"
                        aria-label={`Hotel ${room.hotel.hotelName} in ${room.hotel.address}`}
                    >
                        <img
                            loading='lazy'
                            className='w-80 h-48 object-cover rounded-t-lg'
                            src={room.images[0]}
                            alt={`Room at ${room.hotel.hotelName}`}
                        />
                        <div className='flex items-center justify-between px-3 pt-4'>
                            <p className='font-medium text-gray-700'>{room.hotel.hotelName}</p>
                            <div className='flex items-center gap-1'>
                                <img loading='lazy' src={assets.starIconFilled} alt="rating star" />
                                <span className='text-gray-500 text-sm'>4.5</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 px-3 pt-1'>
                            <img loading='lazy' src={assets.locationIcon} alt="location icon" />
                            <p className='text-gray-500 text-sm'>{room.hotel.address}</p>
                        </div>

                        <div className='flex items-center justify-between px-3 p-5'>
                            <p className='text-xl'>
                                ${room.pricePerNight}
                                <span className='text-gray-500 text-sm'> /night</span>
                            </p>
                            <button
                                onClick={() => navigate(`/rooms/${room._id}`)}
                                className='border cursor-pointer border-gray-500 hover:bg-gray-200 duration-200
                                    rounded-md text-gray-700 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
                                aria-label={`Book room at ${room.hotel.hotelName}`}
                            >
                                Book Now
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/rooms')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className='text-sm border border-gray-300 hover:bg-gray-200 duration-200 px-4 py-2
                    cursor-pointer my-10 font-bold focus:outline-none focus:ring-2 focus:ring-gray-400'
                aria-label="View all destinations"
            >
                View All Destinations
            </button>
        </section>
    )
}
