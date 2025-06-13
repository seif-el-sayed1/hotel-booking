import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export const Loader = () => {
    const { nextUrl } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            },8000)
        }
    }, [nextUrl]);

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-gray-500'></div>
        </div>
    )
}
