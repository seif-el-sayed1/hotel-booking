import React, { useEffect } from "react";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";



export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);

    const [allRooms, setAllRooms] = useState([])
    
    const getRoomsData = async () => {

        try {
            setLoading(true);
            const { data } = await axios.get(backendUrl + "ownerHotel/get-rooms");
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
``
    const value = {
        getRoomsData,
        allRooms,
        loading,
        setLoading
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