import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const { backendUrl, loading, setLoading, authState, isOwner } = useContext(UserContext)
    const navigate = useNavigate()
    
    const [dashboard, setDashboard] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0
    })

    const getDashboardData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/api/ownerHotel/bookings`)
            if (data.success) {
                setDashboard({
                    bookings: data.bookings,
                    totalBookings: data.totalBookings,
                    totalRevenue: data.totalRevenue
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

    useEffect(() => {
        authState()
        getDashboardData()
    }, [])

    if (!isOwner) {
        return (
            <main className="w-3/4 grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg text-gray-500 sm:text-xl">
                        Sorry, you are not authorized to view this page.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            onClick={() => navigate("/")}
                            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none"
                        >
                            Go back home
                        </button>
                        <button
                            onClick={() => navigate("/contact")}
                            className="text-sm font-semibold text-gray-900"
                        >
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <div className='w-4/5'>
            <div className='py-10 pl-5 text-center lg:text-start'>
                <h1 className='font-light text-4xl mb-3'>Dashboard</h1>
                <p className='text-gray-500 text-sm md:text-lg'>
                    Monitor your room listings, track bookings and analyze revenue—all in one place.
                </p>
            </div>

            <div className='px-5 flex items-center gap-5 flex-wrap'>
                <div className='flex gap-5 px-5 py-5 bg-blue-50/40 border border-gray-200 rounded'>
                    <img loading='lazy' className='hidden md:block h-10' src={assets.totalBookingIcon} alt="total booking" />
                    <div>
                        <p className='text-blue-500 text-lg'>Total Bookings</p>
                        <span className='text-gray-700 font-bold'>{dashboard.totalBookings}</span>
                    </div>
                </div>
                <div className='flex gap-5 px-5 py-5 bg-blue-50/40 border border-gray-200 rounded'>
                    <img loading='lazy' className='hidden md:block h-10' src={assets.totalRevenueIcon} alt="total revenue" />
                    <div>
                        <p className='text-blue-500 text-lg'>Total Revenue</p>
                        <span className='text-gray-700 font-bold'>$ {dashboard.totalRevenue}</span>
                    </div>
                </div>
            </div>

            <div className='px-5 py-5'>
                <h2 className='text-lg text-gray-700 py-5'>Recent Bookings</h2>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="flex gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        </div>
                    </div>
                ) : dashboard.bookings.length > 0 ? (
                    <div className='w-4/5 border border-gray-200 rounded-xl overflow-x-auto hide-scrollbar'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-gray-50 text-black/70 text-left'>
                                    <th className='py-3 pl-5'>User Name</th>
                                    <th className='py-3 pl-5 hidden md:block'>Room Type</th>
                                    <th className='py-3 pl-5'>Total Amount</th>
                                    <th className='py-3 px-5'>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboard.bookings.map((ele, index) => (
                                    <tr className='border-b border-gray-200 text-gray-600' key={index}>
                                        <td className='text-sm pl-5 py-2'>{ele.user.name}</td>
                                        <td className='text-sm pl-5 py-2 hidden md:block'>{ele.room.roomType}</td>
                                        <td className='text-sm pl-5 py-2'>$ {ele.totalPrice}</td>
                                        <td className="text-sm py-2 px-5">
                                            <p className={`w-fit px-3 py-1 rounded-2xl text-white text-xs ${
                                                ele.isPaid ? "bg-green-500" : "bg-yellow-500"
                                            }`}>
                                                {ele.status}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No bookings yet.</p>
                )}
            </div>
        </div>
    )
}
