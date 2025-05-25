import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons ,roomsDummyData } from '../assets/assets'

export const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id == id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[])

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
                        <img key={index} src={4 > index ?  assets.starIconFilled 
                            : assets.starIconOutlined
                        } alt="rating" />
                    ))}
                </div>
                <p>200+ reviews</p>
            </div>
            <div className='flex items-center gap-1 text-gray-500 mt-4'>
                <img src={assets.locationIcon} alt="location " />
                <p>{room.hotel.address}</p>
            </div>

            <div className='flex flex-col px-5 md:px-0 md:flex-row mt-7 gap-5'>
                <div className='md:w-1/2'>
                    <img className='w-full rounded-2xl'
                        src={mainImage} alt="Main IMage" />
                </div>
                <div className='grid grid-cols-2 gap-4 md:w-1/2'>
                    {room?.images.length > 1 && room.images.map((image, index) => {
                        return (
                            <img key={index} onClick={() => setMainImage(image)} 
                                className={`rounded-2xl w-full cursor-pointer ${mainImage == image && "outline-3 outline-orange-500"}`}
                                src={image} alt="IMAGE" />
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-wrap justify-between mt-7'>
                    <div>
                        <h1 className='mb-5 text-2xl'>Experience Luxury Like Never Before</h1>
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
                    </div>
                    <p className='font-bold text-2xl'>$399/night</p>
                </div>

        </div>
    )
}
