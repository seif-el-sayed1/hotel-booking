import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


export const UserContext = createContext();

export const UserContextProvider = (props) => {
    axios.defaults.withCredentials = true   
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState({});
    const [isOwner, setIsOwner] = useState(false)

    const [overlay, setOverlay] = useState(false)
    const [loading, setLoading] = useState(false);


    const authState = async () => {
        try {
            const {data} = await axios.get(backendUrl + "user/is-auth")
            if(data.Success) {
                setIsLoggedin(true)
                getUserData()
            } else {
                setUserData(false)
                navigate("/")
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const getUserData = async () => {
        const {data} = await axios.get(backendUrl + "user/getUser")
        if(data.Success) {
            setUserData(data.userData)
            setIsOwner(data.userData.role == "owner");
        } else {
            toast.error(data.message) 
        }
    }
    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData,
        authState,
        overlay,
        setOverlay,
        isOwner,
        setIsOwner,
        loading,
        setLoading
    };

    useEffect(() => {
        authState()
    },[])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};