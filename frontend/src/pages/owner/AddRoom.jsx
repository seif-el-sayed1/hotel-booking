import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from "../../assets/assets"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import toast from "react-hot-toast"

export const AddRoom = () => {
    const {authState, backendUrl, loading, setLoading} = useContext(UserContext)
    // const navigate = useNavigate()

    useEffect(() => {
        authState()    
    },[])

    

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })
    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: 0,
        amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false
        }
    })
    
    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            const formData = new FormData();
            formData.append("roomType", inputs.roomType);
            formData.append("pricePerNight", inputs.pricePerNight);

            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
            formData.append("amenities", JSON.stringify(amenities));

            Object.keys(images).forEach(key => {
                images[key] && formData.append("images", images[key]);
            });

            const {data} = await axios.post(backendUrl + 'ownerHotel/add-room', formData)

            if(data.success) {
                toast.success(data.message)
                setInputs({
                    roomType: "",
                    pricePerNight: 0,
                    amenities: {
                        "Free WiFi": false,
                        "Free Breakfast": false,
                        "Room Service": false,
                        "Mountain View": false,
                        "Pool Access": false
                    }
                })
                setImages({
                    1: null,
                    2: null,
                    3: null,
                    4: null
                })
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
        <div className='w-4/5'>
            <div className='py-10 pl-5 text-center lg:text-start'>
                <h1 className='font-light text-4xl mb-3'>Add Room</h1>
                <p className='text-gray-500 text-sm md:text-lg'>
                    Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.
                </p>
            </div>
            {loading &&
                <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-row gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                    </div>
                </div>
            }
            <form  onSubmit={handleSubmit} className='pb-5'>
                <h2 className='pl-5 mb-2 text-black/80 text-lg'>Images</h2>
                <div className='flex items-center flex-wrap gap-3 pl-5 mb-10'>
                    {Object.keys(images).map((ele, index) => {
                        return (
                            <div key={index}>
                                <label htmlFor={`roomImages${ele}`}>
                                    <img className='w-30 cursor-pointer' 
                                        src={images[ele] ? URL.createObjectURL(images[ele]) : assets.uploadArea} alt="upload" />
                                </label>
                                <input id={`roomImages${ele}`} 
                                        onChange={e => setImages({ ...images, [ele]: e.target.files[0] })}
                                        type="file" required hidden />
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center flex-wrap gap-5 pl-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg text-black/80' htmlFor="types">Room Type</label>
                        <input value={inputs.roomType} 
                            onChange={(e) => setInputs({...inputs, roomType:e.target.value})}
                            className='outline-none py-2 px-1 w-45 border border-gray-200 rounded'
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
                        <input value={inputs.pricePerNight}
                            onChange={(e) => setInputs({...inputs, pricePerNight:e.target.value})}
                            className='outline-none py-2 px-1 w-30 border border-gray-200 rounded'
                            id='price' type="number" required placeholder='$'/>
                    </div>
                </div>
                <div>
                    <h2 className=' pl-5 mb-2 mt-5 text-lg text-black/80'>Amenities</h2>
                    {Object.keys(inputs.amenities).map((ele, index) => {
                        return (
                            <div key={index} className='pl-5 flex items-center gap-2'>
                                <input type="checkbox" id={index + 1} 
                                        onChange={() => setInputs({...inputs, 
                                            amenities: {...inputs.amenities, [ele]: !inputs.amenities[ele]
                                        }})}
                                        checked={inputs.amenities[ele]} />
                                <label className='text-black/50' htmlFor={index + 1}>{ele}</label>
                            </div>
                        )
                    })}
                </div>
                <button disabled={loading} className='text-white ml-5 mt-3 w-40 py-2 bg-blue-600 cursor-pointer rounded-md'>
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </form>
        </div>
    )
}
