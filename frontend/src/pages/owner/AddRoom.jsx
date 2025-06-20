import React, { useContext, useState, useEffect } from 'react'
import { assets } from "../../assets/assets"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

export const AddRoom = () => {
    const { backendUrl, loading, setLoading, authState, isOwner } = useContext(UserContext)
    const navigate = useNavigate()

    const [isDragging, setIsDragging] = useState(false)

    const [images, setImages] = useState({
        1: null, 2: null, 3: null, 4: null
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

    useEffect(() => {
        authState()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("roomType", inputs.roomType)
            formData.append("pricePerNight", inputs.pricePerNight)

            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
            formData.append("amenities", JSON.stringify(amenities))

            Object.keys(images).forEach(key => {
                if (images[key]) {
                    formData.append("images", images[key])
                }
            })

            const { data } = await axios.post(`${backendUrl}/api/ownerHotel/add-room`, formData)

            if (data.success) {
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
                setImages({ 1: null, 2: null, 3: null, 4: null })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return isOwner ? (
        <div className='w-4/5 sm:w-full  max-w-screen-xl mx-auto px-5'>
            <div className='py-10 text-center lg:text-left'>
                <h1 className='text-4xl font-light mb-3'>Add Room</h1>
                <p className='text-gray-500 text-base md:text-lg'>
                    Fill in the details accurately to improve the user booking experience.
                </p>
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
                    <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                        <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className='pb-5' aria-label="Add Room Form">
                <fieldset className='mb-5 w-fit '>
                    <legend className="mb-2 text-lg text-black/80">Images</legend>

                    <div
                        onDragOver={(e) => {
                            e.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault()
                            setIsDragging(false)
                            const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
                            const newImages = { ...images }

                            for (let i = 1; i <= 4; i++) {
                                if (!newImages[i] && droppedFiles.length) {
                                    newImages[i] = droppedFiles.shift()
                                }
                            }

                            setImages(newImages)
                        }}
                        className={`w-full min-h-[150px] border-2 border-dashed rounded-md px-4 py-8 text-center transition ${
                            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                    >
                        <div className="flex flex-wrap justify-center gap-5 mt-4">
                            {Object.keys(images).map((key) => (
                                <label key={key} htmlFor={`upload-${key}`} className='cursor-pointer relative group'>
                                    <img
                                        src={
                                            images[key]
                                                ? URL.createObjectURL(images[key])
                                                : assets.uploadArea
                                        }
                                        alt={`Image ${key}`}
                                        className="w-20 h-20 object-cover border border-gray-300 rounded"
                                    />
                                    <input
                                        id={`upload-${key}`}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) =>
                                            setImages({ ...images, [key]: e.target.files[0] })
                                        }
                                        disabled={!!images[key]}
                                    />
                                    {images[key] && (
                                        <button
                                            type="button"
                                            onClick={() => setImages({ ...images, [key]: null })}
                                            className="absolute top-[-8px] right-[-8px] w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center"
                                            aria-label={`Remove image ${key}`}
                                        >
                                            ×
                                        </button>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>
                </fieldset>
                <div className='flex flex-wrap gap-6 '>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="roomType" className='text-lg text-black/80'>Room Type</label>
                        <input
                            id="roomType"
                            name="roomType"
                            value={inputs.roomType}
                            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
                            className='py-2 px-3 w-52 border border-gray-300 rounded outline-none'
                            list="types"
                            type="text"
                            placeholder='Select Room Type'
                            required
                            aria-required="true"
                        />
                        <datalist id="types">
                            <option value="Single Bed" />
                            <option value="Double Bed" />
                            <option value="Luxury Room" />
                            <option value="Family Suit" />
                        </datalist>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="pricePerNight" className='text-lg text-black/80'>Price Per Night</label>
                        <input
                            id="pricePerNight"
                            name="pricePerNight"
                            value={inputs.pricePerNight}
                            onChange={(e) => setInputs({ ...inputs, pricePerNight: e.target.value })}
                            className='py-2 px-3 w-40 border border-gray-300 rounded outline-none'
                            type="number"
                            placeholder='$'
                            min={1}
                            step={0.01}
                            required
                            aria-required="true"
                        />
                    </div>
                </div>

                <fieldset className='mt-6'>
                    <legend className='mb-2 text-lg text-black/80'>Amenities</legend>
                    <div className="flex flex-col gap-2">
                        {Object.entries(inputs.amenities).map(([key, value], index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    id={`amenity-${index}`}
                                    type="checkbox"
                                    checked={value}
                                    onChange={() =>
                                        setInputs({
                                            ...inputs,
                                            amenities: {
                                                ...inputs.amenities,
                                                [key]: !value
                                            }
                                        })
                                    }
                                />
                                <label htmlFor={`amenity-${index}`} className="text-gray-700">{key}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <button
                    disabled={loading}
                    type="submit"
                    className={`mt-5  w-40 py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </form>
        </div>
    ) : (
        <main className="w-4/5 grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-md">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-bold text-gray-900 sm:text-6xl">Page not found</h1>
                <p className="mt-6 text-lg text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex justify-center gap-4">
                    <button onClick={() => navigate("/")} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-500">
                        Go back home
                    </button>
                    <button onClick={() => navigate("/")} className="text-sm text-gray-900 underline">
                        Contact support →
                    </button>
                </div>
            </div>
        </main>
    )
}
