import React, { useEffect } from "react";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";



export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(true);

    const [allRooms, setAllRooms] = useState([])
    const [bookings, setBookings] = useState([])
    
    const getRoomsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/ownerHotel/get-rooms");
            if (data.success) {
                setAllRooms(data.rooms);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getUserBookings = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/booking/get-bookings");    
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }  

    const value = {
        getRoomsData,
        allRooms,
        loading,
        setLoading,
        getUserBookings,
        bookings
    }
    useEffect(() => {
        getRoomsData();
    }, [allRooms])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}