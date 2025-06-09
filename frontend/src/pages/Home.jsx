import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, cities } from '../assets/assets'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'


export const Home = () => {
    const navigate = useNavigate()

    const {setSearchHistory, backendUrl} = useContext(UserContext)
    const [destination, setDestination] = useState('')
    

    const onSearch = async (e) => {
        e.preventDefault()
        navigate(`/rooms?destination=${destination}`)
        const  {data} =  await axios.post(backendUrl + "user/search-history", {destination})
        if(data.Success) {
            setSearchHistory((prev) => {
                const updatedHistory = [...prev, destination]
                if (updatedHistory.length > 3) {
                    updatedHistory.shift()
                } else {
                    toast.error(data.message)
                }
                return updatedHistory
            })
        }

    }

    return (
        <div className="flex flex-col gap-5 items-start justify-center px-6 md:px-16 lg:px-24
            xl:ox-32 text-white bg-no-repeat
            bg-[url('/src/assets/heroImage.png')] bg-cover 
            bg-center h-screen">
            <div>
                <p className='bg-[#49B9FF]/50 px-3 mt-30 md:mt-0
                w-fit py-1 rounded-2xl'>The Ultimate Hotel Experience</p>
                <h2 className='text-2xl md:text-5xl md:leading-[56px] font-bold  max-w-xl mt-4'>
                    Discover Your Perfect Gateway Destination
                </h2>
                <p className='max-w-lg'>
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
                </p>
            </div>
            {/* Search */}
            <form onSubmit={onSearch}
                className=' bg-white text-gray-500 rounded-lg px-6 py-4   flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>
                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="calenderIcon" />
                        <label htmlFor="destinationInput">Destination</label>
                    </div>
                    <input onChange={(e) => setDestination(e.target.value)} value={destination}
                        list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                    <datalist id='destinations'>
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                </div>

                <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <img src={assets.searchIcon} alt="calender icon" />
                    <span>Search</span>
                </button>
            </form>

        </div>
    )
}
