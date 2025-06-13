import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { UserContext } from '../context/UserContext'
import toast from "react-hot-toast"
import axios from 'axios'

export const RoomDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { allRooms, loading, setLoading } = useContext(AppContext)
    const { backendUrl } = useContext(UserContext)
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
    const [guests, setGuests] = useState(1)

    const [isAvailable, setIsAvailability] = useState(false)

    useEffect(() => {
        setLoading(true)
        const foundRoom = allRooms.find(room => room._id === id)
        if (foundRoom) {
            setRoom(foundRoom)
            setMainImage(prev => prev || foundRoom.images[0])
        }
        setLoading(false)
    }, [allRooms, id])

    const checkAvailability = async () => {
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            toast.error("Check out date must be after check in date")
            return
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/booking/check-availability`, {
                roomId: room._id,
                checkInDate,
                checkOutDate,
                guests
            })
            setIsAvailability(data.isAvailable)
            toast.success("Room is available")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!isAvailable) {
            return checkAvailability()  
        } 

        try {
            const { data } = await axios.post(`${backendUrl}/api/booking/create-booking`, {
                roomId: room._id,
                checkInDate,
                checkOutDate,
                guests
            })
            if (data.success) {
                toast.success(data.message)
                navigate("/my-bookings")
                window.scrollTo({ top: 0, behavior: "smooth" })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading || !room) {
        return (
            <div role="status" aria-label="Loading" className="min-h-[60vh] flex items-center justify-center">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="px-4 pt-30 md:px-16 lg:px-24 xl:px-32">
            <header>
                <h1 className="text-2xl font-semibold flex items-center gap-2 flex-wrap">
                    {room.hotel.name} <span className="text-sm font-normal">({room.roomType})</span>
                    <span className="text-xs bg-orange-500 rounded-xl px-2 py-0.5 text-white">20% OFF</span>
                </h1>

                <div className="flex items-center gap-5 mt-2">
                    <div className="flex items-center gap-1" aria-label="Rating">
                        {Array(5).fill(0).map((_, index) => (
                            <img
                                loading="lazy"
                                key={index}
                                src={index < 4 ? assets.starIconFilled : assets.starIconOutlined}
                                alt={index < 4 ? "Filled Star" : "Empty Star"}
                            />
                        ))}
                    </div>
                    <p className="text-sm">200+ reviews</p>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mt-2">
                    <img loading="lazy" src={assets.locationIcon} alt="Location Icon" />
                    <p>{room.hotel.address}</p>
                </div>
            </header>

            <section className="flex flex-col md:flex-row mt-7 gap-5">
                <img
                    loading="lazy"
                    className="w-full md:w-1/2 rounded-2xl"
                    src={mainImage}
                    alt="Main room view"
                />

                <div className="grid grid-cols-2 gap-4 md:w-1/2">
                    {room.images.map((image, index) => (
                        <img
                            loading="lazy"
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`rounded-2xl w-full cursor-pointer ${mainImage === image ? "outline-4 outline-orange-500" : ""}`}
                            src={image}
                            alt={`Room preview ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-wrap justify-between mt-7">
                <div className="max-w-xl">
                    <h2 className="mb-4 text-xl font-medium">Experience Luxury Like Never Before</h2>
                    <div className="flex items-center gap-3 flex-wrap">
                        {room.amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-gray-100 py-2 px-3 rounded-xl text-nowrap"
                            >
                                <img loading="lazy" src={facilityIcons[amenity]} alt={amenity} />
                                <span className="text-sm">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="font-bold text-2xl mt-4 md:mt-0">$399/night</p>
            </section>

            <form
                onSubmit={onSubmitHandler}
                className="w-full bg-white rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)] p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap my-10"
                >
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label htmlFor="checkIn" className="text-gray-600 font-medium">Check-In</label>
                        <input
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        type="date"
                        id="checkIn"
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full md:min-w-[180px]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label htmlFor="checkOut" className="text-gray-600 font-medium">Check-Out</label>
                        <input
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate}
                        disabled={!checkInDate}
                        type="date"
                        id="checkOut"
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full md:min-w-[180px]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto">
                        <label htmlFor="guests" className="text-gray-600 font-medium">Guests</label>
                        <input
                        onChange={(e) => setGuests(e.target.value)}
                        value={guests}
                        type="number"
                        id="guests"
                        placeholder="0"
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full md:min-w-[100px]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 mt-5 cursor-pointer hover:bg-blue-700 transition text-white px-10 py-4 rounded-lg w-full md:w-auto"
                    >
                        {isAvailable ? "Book Now" : "Check Availability"}
                    </button>
                </form>


            <section aria-label="Room Details">
                {roomCommonData.map((data, index) => (
                    <div key={index} className="flex items-start gap-3 mb-4">
                        <img loading="lazy" src={data.icon} alt={data.title} className="mt-1" />
                        <div>
                            <h3 className="font-medium">{data.title}</h3>
                            <p className="text-gray-500 text-sm">{data.description}</p>
                        </div>
                    </div>
                ))}
            </section>

            <p className="py-10 border-y border-gray-300 text-gray-600">
                Guests will be allocated on the ground floor according to availability. The quoted price is for two guests. Please select the number of guests to get the correct price. Enjoy a true city feeling in our two-bedroom apartment.
            </p>

            <section className="my-20">
                <div className="flex items-center gap-5">
                    <img
                        loading="lazy"
                        src={room.hotel.owner.image}
                        className="w-20 h-20 rounded-full object-cover"
                        alt={`Owner: ${room.hotel.owner.name}`}
                    />
                    <div>
                        <p className="text-xl font-medium">Hosted by {room.hotel.owner.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                                {Array(5).fill(0).map((_, index) => (
                                    <img
                                        loading="lazy"
                                        key={index}
                                        src={index < 4 ? assets.starIconFilled : assets.starIconOutlined}
                                        alt={index < 4 ? "Filled Star" : "Empty Star"}
                                    />
                                ))}
                            </div>
                            <p className="text-sm">200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 mt-6 rounded hover:bg-blue-700">
                    Contact Now
                </button>
            </section>
        </div>
    )
}
