import React, { useState } from 'react'
import { assets,  facilityIcons,  roomsDummyData } from '../assets/assets'
import { Link } from 'react-router-dom'


export const Rooms = () => {
    const [openFilters, setOpenFilters] = useState(false)

    const CheckBox = ({label, selected = false, onChange = () => { } }) => {
        return (
            <div className=' px-5 flex gap-4 items-center mb-3'>
                <input type="checkbox" id={label} checked={selected} 
                    onChange={(e) =>onChange(e.target.checked, label) }
                    className='cursor-pointer' />
                <label className='cursor-pointer text-gray-500 text-sm' htmlFor={label}>{label}</label>
            </div>
        )
    }
    const Radio = ({label, selected = false, onChange = () => { } }) => {
        return (
            <div className=' px-5 flex gap-4 items-center mb-3'>
                <input type="radio" name='sortOption' id='singleBed' checked={selected} 
                    onChange={() =>onChange(label) }
                    className='cursor-pointer' />
                <label className='cursor-pointer text-gray-500 text-sm' htmlFor="singleBed">{label}</label>
            </div>
        )
    }

    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Bed",
        "Family Bed"
    ]
    const priceRanges =[
        "0 to 500",
        "500 to 1000",
        "1000 to 2000",
        "2000 to 3000"
    ]
    const sortOption = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ]

    return (
        <div className='pt-35 px-6 md:px-16 lg:px-24 xl:px-32 pb-15 '>
            <div>
                <h1 className='font-light text-4xl mb-3'>Hotel Rooms</h1>
                <p className='text-gray-500 pb-10'>
                    Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                </p>
            </div>
            <div className='flex justify-between flex-col-reverse lg:flex-row gap-10'> 
                <div>
                    {roomsDummyData.map((room) => {
                        return (
                            <Link to={`/rooms/${room._id}`}>
                                <div key={room._id} className='flex flex-col sm:flex-row gap-10 pt-5 pb-10 border-b-1 border-gray-200'>
                                    <img className='max-h-65 max-w-90 rounded-xl' src={room.images[0]} alt="room image" />
                                    <div>
                                        <h2 className='text-gray-500 mb-3'>{room.hotel.city}</h2>
                                        <p className='text-2xl font-serif mb-3'>{room.hotel.name}</p>
                                        <div className='flex items-center gap-1 mb-3'>
                                            {Array(5).fill(0).map((_, index) => (
                                                <img key={index} src={4 > index ?  assets.starIconFilled 
                                                    : assets.starIconOutlined
                                                } alt="rating" />
                                            ))}
                                        </div>
                                        <div className='flex items-center gap-1 text-gray-500 mb-5'>
                                            <img src={assets.locationIcon} alt="location " />
                                            <p>{room.hotel.address}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mb-5 flex-wrap'>
                                            {room.amenities.map(amenity => {
                                                return (
                                                    <div className='flex items-center gap-1 bg-gray-100 text-nowrap py-2 px-3 rounded-xl w-fit ' 
                                                        key={amenity}>
                                                        <img src={facilityIcons[amenity]} alt={amenity} />
                                                        <p className='text-sm '>{amenity}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <p className='text-xl text-gray-500'>${room.pricePerNight} / night</p>
                                    </div>
                                </div>
                            </Link>
                            
                        )
                    })}
                </div>
                {/* Filters */}
                <div className=' h-fit  w-80'>
                        <div className='flex items-center justify-between py-2 px-5  border-1 border-gray-200'>
                            <h2 className='font-bold'>FILTERS</h2>
                            <span className='font-sm text-gray-500 hidden lg:block cursor-pointer'>Clear</span>
                            <span onClick={() => setOpenFilters(!openFilters)} className='font-sm text-gray-500 lg:hidden cursor-pointer'>
                                {openFilters ? "Hide" : "Show"}
                            </span>
                        </div>
                        <div className={`${openFilters ? "block" : "hidden lg:block"} border-1 pt-5 border-gray-200`}>
                            <h2 className='px-5 mb-4 font-semibold'>Popular filters</h2>
                            {roomTypes.map((type, index) => {
                                return (
                                    <CheckBox key={index} label={type}/>
                                )
                            })}
                            <h2 className='px-5 mb-4 font-semibold'>Price Range</h2>
                            {priceRanges.map((range, index) => {
                                return (
                                    <CheckBox key={index} label={`$ ${range}`}/>
                                )
                            })}

                            <h2 className='px-5 mb-4 font-semibold'>Sort BY</h2>
                            {sortOption.map((option, index) => {
                                return (
                                    <Radio key={index} label={option} /> 
                                )
                            })}
                        </div>
                    
                </div>
            </div>

        </div>
    )
}
