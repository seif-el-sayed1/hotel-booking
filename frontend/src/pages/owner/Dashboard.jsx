import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Dashboard = () => {
    const {authState, backendUrl, loading, setLoading} = useContext(UserContext)

    const [dashboard, setDashboard] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0
    })

    const getDashboardData = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get(backendUrl + 'ownerHotel/bookings')
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
        authState();
        getDashboardData()
    }, []);
    
    return (
        <div className='w-4/5'>
            <div className='py-10 pl-5 text-center lg:text-start'>
                <h1 className='font-light text-4xl mb-3'>Dashboard</h1>
                <p className='text-gray-500 text-sm md:text-lg'>
                    Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.
                </p>
            </div>
            <div className='px-5 flex items-center gap-5'>
                <div className='flex gap-5 px-5 py-5 bg-blue-50/40 border border-gray-200 rounded'>
                    <img className='hidden md:block h-10' src={assets.totalBookingIcon} alt="total booking" />
                    <div>
                        <p className='text-blue-500 text-lg'>Total Bookings</p>
                        <span className='text-gray-500 font-bold'>{dashboard.totalBookings}</span>
                    </div>
                </div>
                <div className='flex  gap-5 px-5 py-5 bg-blue-50/40 border border-gray-200 rounded'>
                    <img className='hidden md:block h-10' src={assets.totalRevenueIcon} alt="total revenue" />
                    <div>
                        <p className='text-blue-500 text-lg'>Total Revenue</p>
                        <span className='text-gray-500 font-bold'>$ {dashboard.totalRevenue}</span>
                    </div>
                </div>
            </div>
                <div className='px-5 py-5'>
                    <h2 className='text-lg w-fit text-gray-700 py-5'>Recent Bookings</h2>
                    <div className='w-full border border-gray-200 rounded-xl overflow-x-auto hide-scrollbar'>
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-gray-50 text-black/70 text-left'>
                                    <th className='py-3 pl-5'>User Name</th>
                                    <th className='py-3 pl-5 hidden md:block'>Room Type</th>
                                    <th className='py-3 pl-5 '>Total Amount</th>
                                    <th className='py-3 px-5'>Payment Status</th>
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
                                dashboard.bookings.map((ele, index) => (
                                    
                                        <tr className='border-b-1 border-gray-200 text-gray-500' key={index}>
                                            <td className=' text-sm pl-5 py-3'>{ele.user.username}</td>
                                            <td className=' text-sm pl-5 py-3 hidden md:block'>{ele.room.roomType}</td>
                                            <td className=' text-sm pl-5 py-3'>$ {ele.totalPrice}</td>

                                            <td className="text-sm py-5 px-5">
                                                <p className={`w-fit px-3 py-1  text-black/80 rounded-2xl ${ele.isPaid ? "bg-green-500" 
                                                        : "bg-yellow-400"}`}>{ele.status}</p>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    )
}
