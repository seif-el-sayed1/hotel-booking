import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export const Bookings = () => {
    const { loading, getUserBookings, bookings } = useContext(AppContext);
    const { authState, backendUrl } = useContext(UserContext);

    useEffect(() => {
        getUserBookings();
        authState();
    }, []);

    const handlePayment = async (bookingId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/booking/stripe-payment`, { bookingId });
            if (data.success) {
                window.location.assign(data.url);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="pt-35 px-6 md:px-16 lg:px-24 xl:px-32 pb-15">
            <div>
                <h1 className="font-light text-4xl mb-3">My Bookings</h1>
                <p className="text-gray-500 pb-10">
                    Easily manage your past, current, and upcoming hotel reservations in one place.
                </p>

                <div className="w-full overflow-x-auto">
                    {loading && (
                        <div className="fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex flex-row gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                                <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                            </div>
                        </div>
                    )}

                    <table className="hidden md:table w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-left font-medium">Hotel</th>
                                <th className="pb-3 text-left font-medium">Date & Timings</th>
                                <th className="pb-3 text-left font-medium">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-5 border-b border-gray-200">
                                        <div className="flex gap-5">
                                            <img
                                                className="w-36 h-24 rounded object-cover"
                                                src={item.room.images[0]}
                                                alt={`${item.hotel.name} - ${item.room.roomType}`}
                                                loading="lazy"
                                                width={144}
                                                height={96}
                                                referrerPolicy="no-referrer"
                                            />
                                            <div>
                                                <div className="flex flex-wrap gap-2 items-center text-gray-500 mb-1">
                                                    <h2 className="text-xl font-medium">{item.hotel.name}</h2>
                                                    <p className="text-xs">({item.room.roomType})</p>
                                                </div>
                                                <div className="flex gap-2 text-gray-500 mb-1">
                                                    <img loading="lazy" src={assets.locationIcon} alt="" aria-hidden="true" />
                                                    <p>{item.hotel.address}</p>
                                                </div>
                                                <div className="flex gap-2 text-gray-500 mb-1">
                                                    <img loading="lazy" src={assets.guestsIcon} alt="" aria-hidden="true" />
                                                    <p>Guests: {item.guests}</p>
                                                </div>
                                                <p>Total Price: ${item.totalPrice}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 border-b border-gray-200">
                                        <div className="flex items-center gap-10">
                                            <div>
                                                <p>Check-In:</p>
                                                <p className="text-gray-500">{new Date(item.checkInDate).toDateString()}</p>
                                            </div>
                                            <div>
                                                <p>Check-Out:</p>
                                                <p className="text-gray-500">{new Date(item.checkOutDate).toDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-3 w-3 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <p className={`${item.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                                                {item.isPaid ? 'Paid' : 'Unpaid'}
                                            </p>
                                        </div>
                                        {!item.isPaid && (
                                            <button
                                                onClick={() => handlePayment(item._id)}
                                                className="mt-3 text-nowrap px-5 py-2 border border-gray-300 text-xs hover:bg-gray-100 transition text-gray-500 rounded-2xl cursor-pointer"
                                            >
                                                Pay now
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="md:hidden flex flex-col gap-5">
                        {bookings.map((item, index) => (
                            <div key={index} className="border-b border-gray-300 p-4">
                                <img
                                    loading="lazy"
                                    className="w-full h-48 object-cover mb-5 rounded"
                                    src={item.room.images[0]}
                                    alt={`${item.hotel.name} - ${item.room.roomType}`}
                                    width={320}
                                    height={192}
                                    referrerPolicy="no-referrer"
                                />
                                <div className="mb-3 flex justify-between flex-wrap gap-5">
                                    <div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <h2 className="text-xl">{item.hotel.name}</h2>
                                            <p className="text-xs text-gray-500">({item.room.roomType})</p>
                                        </div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <img loading="lazy" src={assets.locationIcon} alt="" aria-hidden="true" />
                                            <p className="text-sm text-gray-500">{item.hotel.address}</p>
                                        </div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <img loading="lazy" src={assets.guestsIcon} alt="" aria-hidden="true" />
                                            <p className="text-sm text-gray-500">Guests: {item.guests}</p>
                                        </div>
                                        <p className="text-sm font-medium">Total: ${item.totalPrice}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="mb-2">
                                            Check-In: <span className="text-gray-600">{new Date(item.checkInDate).toDateString()}</span>
                                        </p>
                                        <p>
                                            Check-Out: <span className="text-gray-500">{new Date(item.checkOutDate).toDateString()}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`h-3 w-3 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <p className={`${item.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.isPaid ? 'Paid' : 'Unpaid'}
                                    </p>
                                </div>
                                {!item.isPaid && (
                                    <button
                                        onClick={() => handlePayment(item._id)}
                                        className="mt-3 px-5 py-2 border border-gray-300 text-xs hover:bg-gray-100 transition text-gray-500 rounded-2xl cursor-pointer w-full"
                                    >
                                        Pay now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
