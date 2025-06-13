import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

export const Recommended = () => {
    const { allRooms } = useContext(AppContext)
    const { searchHistory } = useContext(UserContext)
    const navigate = useNavigate()
    const [recommended, setRecommended] = useState([])

    useEffect(() => {
        const filteredHotels = allRooms.filter((room) =>
            searchHistory.includes(room.hotel.city)
        )
        setRecommended(filteredHotels)
    }, [allRooms, searchHistory])

    if (recommended.length === 0) return null

    return (
        <section
            className='pt-20 flex flex-col items-center justify-center bg-slate-50'
            aria-labelledby="recommended-heading"
        >
            <div className='flex flex-col items-center justify-center pb-15 text-center px-4'>
                <h1 id="recommended-heading" className='font-light text-4xl mb-3'>
                    Recommended Hotels
                </h1>
                <p className='text-gray-500 max-w-3xl'>
                    Discover our handpicked selection of exceptional properties around the world,
                    offering unparalleled luxury and unforgettable experiences.
                </p>
            </div>

            <div
                className='flex flex-wrap items-center justify-center gap-5 mt-10'
                role="list"
                aria-label="Recommended rooms"
            >
                {recommended.slice(0, 4).map((room) => (
                    <article
                        key={room._id}
                        className='rounded-lg shadow-lg bg-white w-80 hover:shadow-xl transition-all duration-300'
                        role="listitem"
                        aria-label={`Hotel ${room.hotel.hotelName} in ${room.hotel.address}`}
                    >
                        <img
                            loading='lazy'
                            className='w-80 h-48 object-cover rounded-t-lg'
                            src={room.images[0]}
                            alt={`Room at ${room.hotel.hotelName}`}
                            width={320}
                            height={192}
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
                                ${room.pricePerNight.toFixed(2)}
                                <span className='text-gray-500 text-sm'> /night</span>
                            </p>
                            <button
                                onClick={() => navigate(`/rooms/${room._id}`)}
                                className='border border-gray-500 hover:bg-gray-200 duration-200
                                    rounded-md text-gray-700 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-95'
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
                    cursor-pointer my-10 font-bold focus:outline-none focus:ring-2 focus:ring-gray-400 active:scale-95'
                aria-label="View all destinations"
            >
                View All Destinations
            </button>
        </section>
    )
}
