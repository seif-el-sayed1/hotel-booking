import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'

export const SideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            label: 'Dashboard',
            path: '/owner',
            icon: assets.dashboardIcon
        },
        {
            label: 'Add Room',
            path: '/owner/add-room',
            icon: assets.addIcon
        },
        {
            label: 'List Room',
            path: '/owner/list-room',
            icon: assets.listIcon
        }
    ]

    return (
        <aside className='w-1/5  sm:w-fit border-r border-gray-200 py-3 h-screen' aria-label="Sidebar Navigation">
            {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path

                return (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-5 w-full text-left px-5 sm:px-10 py-3 
                                    cursor-pointer  
                                    ${isActive
                                ? 'bg-blue-100 text-blue-600 border-r-4 border-blue-600 font-medium'
                                : 'hover:bg-gray-200 text-gray-700'
                            }`}
                        aria-current={isActive ? 'page' : undefined}
                        aria-label={item.label}
                    >
                        <img loading="lazy" src={item.icon} alt={`${item.label} icon`} />
                        <span className='hidden sm:inline-block text-nowrap'>{item.label}</span>
                    </button>
                )
            })}
        </aside>
    )
}
