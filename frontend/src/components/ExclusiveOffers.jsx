import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'

export const ExclusiveOffers = () => {
    return (
        <div className='pt-20 px-6 md:px-16 lg:px-24 pb-15'>
            <div className='flex flex-wrap gap-10 justify-center'>
                <div>
                    <h1 className='font-light text-4xl mb-3'>Exclusive Offers</h1>
                    <p className='text-gray-500 pb-10'>
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer group'>
                    <p className='text-sm font-bold'>View All Offers</p>
                    <img loading='lazy' className='group-hover:translate-x-2 duration-300' src={assets.arrowIcon} alt="arrow" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {exclusiveOffers.map((offer) => {
                    return (
                        <div
                            key={offer._id}
                            className="group relative rounded-2xl overflow-hidden bg-cover bg-no-repeat bg-center h-65 "
                            style={{ backgroundImage: `url(${offer.image})` }}
                        >

                            <div className="relative h-full flex flex-col justify-between p-4">
                                <div>
                                    <p className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 w-fit shadow-sm">
                                    {offer.priceOff}% OFF
                                    </p>
                                    <h2 className="mt-4 text-xl font-semibold text-white">{offer.title}</h2>
                                    <p className="mt-2 text-sm text-white/90">{offer.description}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-white/70">Expires {offer.expiryDate}</p>
                                    <div className="flex items-center gap-2 mt-3 group-hover:gap-4 cursor-pointer transition-all duration-300">
                                        <p className="text-sm font-semibold text-white">View All Offers</p>
                                        <img
                                            src={assets.arrowIcon}
                                            alt="arrow"
                                            className="w-4 h-4 invert transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
