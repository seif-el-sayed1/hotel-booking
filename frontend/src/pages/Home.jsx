import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets, cities } from '../assets/assets';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Home = () => {
    const navigate = useNavigate();
    const { setSearchHistory, backendUrl } = useContext(UserContext);
    const [destination, setDestination] = useState('');

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/rooms?destination=${destination}`);

        try {
            const { data } = await axios.post(backendUrl + "/api/user/search-history", { destination });
            if (data.Success) {
                setSearchHistory((prev) => {
                    const updatedHistory = [...prev, destination];
                    if (updatedHistory.length > 3) updatedHistory.shift();
                    return updatedHistory;
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <main
            role="main"
            aria-label="Home page"
            className="flex flex-col gap-5 bg-[url('/src/assets/heroImage.png')]  items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen"
        >
            <header>
                <p
                    className="bg-[#49B9FF]/50 px-3 w-fit py-1 rounded-2xl mt-30 md:mt-0"
                    aria-label="Slogan"
                >
                    The Ultimate Hotel Experience
                </p>
                <h1 className="text-2xl md:text-5xl md:leading-[56px] font-bold max-w-xl mt-4">
                    Discover Your Perfect Gateway Destination
                </h1>
                <p className="max-w-lg text-sm md:text-base mt-2">
                    Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
                </p>
            </header>

            <form
                onSubmit={onSearch}
                role="search"
                aria-label="Search for hotel destination"
                className="bg-white text-gray-800 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto w-full md:w-auto"
            >
                <div className="w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <img
                            loading="lazy"
                            src={assets.calenderIcon}
                            alt="Calendar icon"
                            width={20}
                            height={20}
                        />
                        <label htmlFor="destinationInput" className="text-gray-800 font-medium">
                            Destination
                        </label>
                    </div>
                    <input
                        onChange={(e) => setDestination(e.target.value)}
                        value={destination}
                        list="destinations"
                        id="destinationInput"
                        type="text"
                        className="rounded border border-gray-400 px-3 py-1.5 mt-1.5 text-sm outline-none text-gray-900 placeholder-gray-600 w-full md:w-auto"
                        placeholder="Type here"
                        required
                        aria-required="true"
                        aria-label="Destination input"
                    />
                    <datalist id="destinations">
                        {cities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-2"
                    aria-label="Search destination"
                >
                    <img
                        loading="lazy"
                        src={assets.searchIcon}
                        alt="Search icon"
                        width={18}
                        height={18}
                    />
                    <span>Search</span>
                </button>
            </form>
        </main>
    );
};
