import React, { useState, useContext, useMemo, useEffect } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { Link, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const Rooms = () => {
    const { allRooms, getRoomsData, loading } = useContext(AppContext)
    const [searchParam] = useSearchParams()

    const [openFilters, setOpenFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        roomType: [],
        priceRange: [],
    })
    const [selectSortOption, setSelectSortOption] = useState('')

    useEffect(() => {
        getRoomsData()
        setSelectedFilters({ roomType: [], priceRange: [] })
        setSelectSortOption('')
    }, [])

    const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
        const id = label.replace(/\s+/g, '-').toLowerCase()
        return (
            <div className='px-5 flex gap-4 items-center mb-3'>
                <input
                    type="checkbox"
                    id={id}
                    checked={selected}
                    onChange={(e) => onChange(e.target.checked, label)}
                    className='cursor-pointer'
                />
                <label htmlFor={id} className='cursor-pointer text-gray-500 text-sm'>{label}</label>
            </div>
        )
    }

    const Radio = ({ label, selected = false, onChange = () => {} }) => {
        const id = label.replace(/\s+/g, '-').toLowerCase()
        return (
            <div className='px-5 flex gap-4 items-center mb-3'>
                <input
                    type="radio"
                    id={id}
                    name="sortOption"
                    checked={selected}
                    onChange={() => onChange(label)}
                    className='cursor-pointer'
                />
                <label htmlFor={id} className='cursor-pointer text-gray-500 text-sm'>{label}</label>
            </div>
        )
    }

    const roomTypes = ["Single Bed", "Double Bed", "Luxury Bed", "Family Bed"]
    const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"]
    const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"]

    const handleFilterChange = (checked, value, type) => {
        setSelectedFilters(prev => {
            const updated = { ...prev }
            updated[type] = checked
                ? [...updated[type], value]
                : updated[type].filter(item => item !== value)
            return updated
        })
    }

    const handleSortChange = (option) => setSelectSortOption(option)

    const matchesRoomType = (room) => {
        return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType)
    }

    const matchesPriceRange = (room) => {
        return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
            const [min, max] = range.split(' to ').map(Number)
            return room.pricePerNight >= min && room.pricePerNight <= max
        })
    }

    const sortRooms = (a, b) => {
        if (selectSortOption === 'Price Low to High') return a.pricePerNight - b.pricePerNight
        if (selectSortOption === 'Price High to Low') return b.pricePerNight - a.pricePerNight
        if (selectSortOption === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt)
        return 0
    }

    const filterDestination = (room) => {
        const destination = searchParam.get('destination')
        if (!destination) return true
        return room.hotel.city.toLowerCase().includes(destination.toLowerCase())
    }

    const filteredRooms = useMemo(() => {
        return allRooms
            .filter(room => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room))
            .sort(sortRooms)
    }, [allRooms, selectedFilters, selectSortOption, searchParam])

    const clearFilters = () => {
        setSelectedFilters({ roomType: [], priceRange: [] })
        setSelectSortOption('')
    }

    return (
        <div className='pt-35 px-6 md:px-16 lg:px-24 xl:px-32 pb-15'>
            <header>
                <h1 className='font-light text-4xl mb-3'>Hotel Rooms</h1>
                <p className='text-gray-500 pb-10'>
                    Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                </p>
            </header>

            <div className='flex justify-between flex-col-reverse lg:flex-row gap-10'>
                {loading &&
                    <div className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
                            <div className="w-5 h-5 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
                        </div>
                    </div>
                }

                <div>
                    {filteredRooms.map(room => (
                        <Link key={room._id} onClick={() => window.scrollTo(0, 0)} to={`/rooms/${room._id}`}>
                            <article className='flex flex-col sm:flex-row gap-10 pt-5 pb-10 border-b border-gray-200'>
                                <img
                                    loading='lazy'
                                    className='w-72 h-48 object-cover rounded-xl'
                                    src={`${room.images[0]}?w=600&auto=compress`}
                                    alt={`Room at ${room.hotel.name} in ${room.hotel.city}`}
                                />
                                <div>
                                    <h2 className='text-gray-500 mb-3'>{room.hotel.city}</h2>
                                    <p className='text-2xl font-serif mb-3'>{room.hotel.name}</p>
                                    <div className='flex items-center gap-1 mb-3'>
                                        {Array(5).fill(0).map((_, i) => (
                                            <img
                                                loading='lazy'
                                                key={i}
                                                src={i < 4 ? assets.starIconFilled : assets.starIconOutlined}
                                                alt="rating star"
                                            />
                                        ))}
                                    </div>
                                    <div className='flex items-center gap-1 text-gray-500 mb-5'>
                                        <img loading='lazy' src={assets.locationIcon} alt="location icon" />
                                        <p>{room.hotel.address}</p>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-3 mb-5'>
                                        {room.amenities.map(amenity => (
                                            <div key={amenity} className='flex items-center gap-1 bg-gray-100 py-2 px-3 rounded-xl w-fit'>
                                                <img loading='lazy' src={facilityIcons[amenity]} alt={amenity} />
                                                <p className='text-sm'>{amenity}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className='text-xl text-gray-500'>${room.pricePerNight} / night</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Filters */}
                <aside className='h-fit w-80 lg:min-w-70'>
                    <div className='flex items-center justify-between py-2 px-5 border border-gray-200'>
                        <h2 className='font-bold'>FILTERS</h2>
                        <span onClick={clearFilters} className='text-sm text-gray-500 hidden lg:block cursor-pointer'>Clear</span>
                        <span onClick={() => setOpenFilters(!openFilters)} className='text-sm text-gray-500 lg:hidden cursor-pointer'>
                            {openFilters ? "Hide" : "Show"}
                        </span>
                    </div>

                    <div className={`${openFilters ? "block" : "hidden lg:block"} border-t pt-5 border-gray-200`}>
                        <section>
                            <h3 className='px-5 mb-4 font-semibold'>Room Type</h3>
                            {roomTypes.map(type => (
                                <CheckBox
                                    key={type}
                                    label={type}
                                    selected={selectedFilters.roomType.includes(type)}
                                    onChange={(checked) => handleFilterChange(checked, type, 'roomType')}
                                />
                            ))}
                        </section>

                        <section>
                            <h3 className='px-5 mb-4 font-semibold'>Price Range</h3>
                            {priceRanges.map(range => (
                                <CheckBox
                                    key={range}
                                    label={`$ ${range}`}
                                    selected={selectedFilters.priceRange.includes(range)}
                                    onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
                                />
                            ))}
                        </section>

                        <section>
                            <h3 className='px-5 mb-4 font-semibold'>Sort By</h3>
                            {sortOptions.map(option => (
                                <Radio
                                    key={option}
                                    label={option}
                                    selected={selectSortOption === option}
                                    onChange={handleSortChange}
                                />
                            ))}
                        </section>
                    </div>
                </aside>
            </div>
        </div>
    )
}
