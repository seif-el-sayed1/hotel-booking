import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

export const SideBar = () => {
    const navigate = useNavigate()
    return (
        <div className='w-fit lg:w-1/5 border-r-1 border-gray-200 py-3 h-screen'>
            <div onClick={() => navigate("/owner")} 
                className={`flex items-center gap-5 px-5 md:px-10 py-3 cursor-pointer duration-500 border-blue-600
                                ${window.location.pathname === "/owner" ?
                                                "bg-blue-100 text-blue-600 border-r-7 border-blue-600" : "hover:bg-gray-200"}
                            `}>
                <img src={assets.dashboardIcon} alt="dashboard" />
                <p className='hidden md:block text-nowrap'>Dashboard</p>
            </div>
            <div onClick={() => navigate("/owner/add-room")} 
                className={`flex items-center gap-5 px-5 md:px-10 py-3 cursor-pointer duration-500 border-blue-600
                                ${window.location.pathname === "/owner/add-room" ?
                                                "bg-blue-100 text-blue-600 border-r-7 border-blue-600" : "hover:bg-gray-200"}
                            `}>
                <img src={assets.addIcon} alt="add" />
                <p className='hidden md:block text-nowrap'>Add Room</p>
            </div>
            <div onClick={() => navigate("/owner/list-room")} 
                className={`flex items-center gap-5 px-5 md:px-10 py-3 cursor-pointer duration-500 border-blue-600
                                ${window.location.pathname === "/owner/list-room" ?
                                                "bg-blue-100 text-blue-600 border-r-7 border-blue-600" : "hover:bg-gray-200"}
                            `}>
                <img src={assets.listIcon} alt="rooms" />
                <p className='hidden md:block text-nowrap'>List Room</p>
            </div>
        </div>
        
    )
}
