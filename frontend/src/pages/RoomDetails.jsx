import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, facilityIcons ,roomCommonData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { UserContext } from '../context/UserContext'
import toast from "react-hot-toast";

import axios from 'axios'

export const RoomDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {allRooms, loading, setLoading} = useContext(AppContext)
    const {backendUrl} = useContext(UserContext)
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    const [checkInDate, setCheckInDate] = useState(null)
    const [checkOutDate, setCheckOutDate] = useState(null)
    const [guests, setGuests] = useState(0)

    const [isAvailable, setIsAvailability] = useState(false)


    useEffect(() => {
        const room = allRooms.find(room => room._id == id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[allRooms, id])

    const checkAvailability = async () => {
        try {
            if (checkInDate >= checkOutDate) {
                toast.error("Check out date must be after check in date")
                return
            }
            const {data} = await axios.post(backendUrl + "booking/check-availability", {roomId: room._id, checkInDate, checkOutDate, guests})
            if (data.success) {
                if (data.isAvailable) {
                    setIsAvailability(true)
                    toast.success("Room is available")
                } else {
                    toast.error("Room is not available")
                    setIsAvailability(false)
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            if (!isAvailable) {
                return checkAvailability()
            } else {
                const {data} = await axios.post(backendUrl + "booking/create-booking", {roomId: room._id, checkInDate, checkOutDate, guests})
                if (data.success) {
                    toast.success(data.message)
                    navigate("/my-bookings")
                    scrollTo(0,0)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return room && (
        <div className='px-4 pt-35 md:px-16 lg:px-24 xl:px-32 '>
            <div className='flex items-center gap-2 flex-wrap'>
                <h1 className='text-2xl'>{room.hotel.name}</h1>
                <span className='text-sm'>({room.roomType})</span>
                <p className='text-xs bg-orange-500 rounded-xl p-1 text-white '>20% OFF</p>
            </div>
            <div className='flex items-center gap-5 mt-3'>
                <div className='flex items-center gap-1'>
                    {Array(5).fill(0).map((_, index) => (
                        <img loading='lazy' key={index} src={4 > index ?  assets.starIconFilled 
                            : assets.starIconOutlined
                        } alt="rating" />
                    ))}
                </div>
                <p>200+ reviews</p>
            </div>
            
            <div className='flex items-center gap-1 text-gray-500 mt-4'>
                <img loading='lazy' src={assets.locationIcon} alt="location " />
                <p>{room.hotel.address}</p>
            </div>

            <div className='flex flex-col px-5 md:px-0 md:flex-row mt-7 gap-5'>
                <div className='md:w-1/2'>
                    <img loading='lazy' className='w-full rounded-2xl'
                        src={mainImage} alt="Main IMage" />
                </div>
                <div className='grid grid-cols-2 gap-4 md:w-1/2'>
                    {room?.images.length > 1 && room.images.map((image, index) => {
                        return (
                            <img loading='lazy' key={index} onClick={() => setMainImage(image)} 
                                className={`rounded-2xl w-full cursor-pointer ${mainImage == image && "outline-3 outline-orange-500"}`}
                                src={image} alt="IMAGE" />
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-wrap justify-between mt-7'>
                {loading &&
                    <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-row gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        </div>
                    </div>
                }
                <div>
                    <h1 className='mb-5 text-2xl'>Experience Luxury Like Never Before</h1>
                    <div className='flex items-center gap-3 mb-5 flex-wrap'>
                        {room.amenities.map((amenity, index) => {
                            return (
                                <div className='flex items-center gap-1 bg-gray-100 text-nowrap py-2 px-3 rounded-xl w-fit ' 
                                    key={index}>
                                    <img loading='lazy' src={facilityIcons[amenity]} alt={amenity} />
                                    <p className='text-sm '>{amenity}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <p className='font-bold text-2xl'>$399/night</p>
            </div>
            {/* check availability */}
            <form onSubmit={onSubmitHandler}
                className=' w-full flex flex-col gap-5 justify-around items-start md:items-center md:flex-row flex-wrap  shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-5 rounded-xl my-10'>
                <div className='flex flex-col gap-1 w-fit md:border-r-2 border-gray-200 pr-10   '>
                    <label htmlFor="checkIn" className='text-gray-500'>Check-In</label>
                    <input onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                        type="Date" id='checkIn' required className='outline-none border-1 border-gray-200 
                        p-2 text-gray-500 rounded' />
                </div>
                <div className='flex flex-col gap-1 w-fit md:border-r-2 border-gray-200 pr-10   '>
                    <label htmlFor="checkOut" className='text-gray-500'>Check-Out</label>
                    <input onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate}  
                        type="Date" id='checkOut' required className='outline-none border-1 border-gray-200 
                        p-2 text-gray-500 rounded' />
                </div>
                <div className='flex flex-col gap-s1 w-20 '>
                    <label htmlFor="guests" className='text-gray-500'>Guests</label>
                    <input onChange={(e) => setGuests(e.target.value)} value={guests}
                        type="number" id='guests' placeholder='0' required
                        className='outline-none border-1 border-gray-200 
                        p-2 text-gray-500 rounded '/>
                </div>
                <button     type='submit' className='bg-blue-600 xl:w-70 w-full rounded py-4 text-white cursor-pointer' >
                    {isAvailable ? "Book Now" : " Check Availability"}
                </button>
            </form>

            {roomCommonData.map((data, index) => {
                    return (
                        <div key={index} className='flex items-center gap-3' >
                            <img loading='lazy' src={data.icon} alt="dataIcon" />
                            <div className='mt-5'>
                                <h2 className=''>{data.title}</h2>
                                <p className='text-gray-500 '>{data.description}</p>
                            </div>
                        </div>
                    )
                })}
            <p className='py-10 my-10 border-y-1 max-w-200 border-gray-300 text-gray-500'>
                Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.
            </p>
            <div className='my-20'>
                <div className='flex items-center gap-5'>
                    <img loading='lazy' src={room.hotel.owner.image} className='w-20 cursor-pointer rounded-full' alt="ownerImage" />
                    <div>
                        <p className='text-xl'>Hosted By {room.hotel.owner.name}</p>
                        <div className='flex items-center gap-3 mt-1'>
                            <div className='flex items-center gap-1'>
                                {Array(5).fill(0).map((_, index) => (
                                    <img loading='lazy' key={index} src={4 > index ?  assets.starIconFilled 
                                        : assets.starIconOutlined
                                    } alt="rating" />
                                ))}
                            </div>
                            <p>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='bg-blue-600 px-7 rounded py-3 mt-7 text-white cursor-pointer'>
                    Contact Now
                </button>
            </div>
            
        </div>
    )
}
