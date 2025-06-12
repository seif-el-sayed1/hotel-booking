import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const ListRoom = () => {
    const { backendUrl, loading, setLoading, isOwner, authState } = useContext(UserContext)
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    
    const getRooms = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/ownerHotel/rooms')
            if (data.success) {
                setRooms(data.rooms)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    const changeAvailability = async (roomId) => {
        try {
            const {data} = await axios.put(backendUrl + '/api/ownerHotel/toggle-availability', {roomId})
            if (data.success) {
                getRooms()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        authState()
        getRooms()
        const interval = setInterval(() => {
            authState()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return isOwner ? (
        <div className='w-4/5'>
            <div className='py-10 pl-5 text-center lg:text-start'>
                <h1 className='font-light text-4xl mb-3'>Rooms List</h1>
                <p className='text-gray-500 text-sm md:text-lg'>
                    View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.
                </p>
            </div>

            <div className='px-5 py-5'>
                <h2 className='pl-5 mb-2 text-black/80 text-lg'>All Rooms</h2>
                <div className='w-full border border-gray-200 rounded-xl overflow-x-auto hide-scrollbar md:overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-gray-50 text-black/70 text-left'>
                                <th className='py-3 pl-5'>Type</th>
                                <th className='py-3 pl-5'>Facility</th>
                                <th className='py-3 pl-5 text-nowrap hidden md:block'>Price / night</th>
                                <th className='py-3 pl-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="flex justify-center py-10">
                                            <div className="flex flex-row gap-2">
                                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                rooms.map((ele, index) => (
                                    <tr className='border-b-1 border-gray-200 text-gray-500' key={index}>
                                        <td className='text-sm pl-5 py-3 text-nowrap'>{ele.roomType}</td>
                                        <td className='text-sm pl-5 py-5 text-wrap hidden md:block'>{ele.amenities.join(" || ")}</td>
                                        <td className='text-sm pl-5 py-3 text-nowrap'>$ {ele.pricePerNight}</td>
                                        <td className='text-sm px-5 py-3 text-nowrap'>
                                            <label onChange={() => changeAvailability(ele._id)} 
                                                className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={ele.isAvailable}
                                                    readOnly
                                                />
                                                <div className="w-15 h-8 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                                                <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                                            </label>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : (
        <main className=" w-3/4 grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <p onClick={() => navigate("/")}
                        className=" cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Go back home
                    </p>
                    <p onClick={() => navigate("/")} 
                        className="text-sm font-semibold text-gray-900 cursor-pointer ">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </p>
                </div>
            </div>
        </main>
    )
}
