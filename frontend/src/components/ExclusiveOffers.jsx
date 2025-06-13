import React from 'react'
import { assets, exclusiveOffers } from '../assets/assets'

export const ExclusiveOffers = () => {
    return (
        <section
            className='pt-20 px-6 md:px-16 lg:px-24 pb-20'
            aria-labelledby="exclusive-offers-heading"
        >
            <div className='flex flex-wrap md:gap-10 justify-between items-start mb-10'>
                <div>
                    <h1
                        id="exclusive-offers-heading"
                        className='font-light text-4xl mb-3'
                    >
                        Exclusive Offers
                    </h1>
                    <p className='text-gray-500 max-w-xl'>
                        Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                    </p>
                </div>

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className='flex items-center gap-2 text-sm font-bold group focus:outline-none focus:ring-2 focus:ring-gray-400'
                    aria-label="View all exclusive offers"
                >
                    View All Offers
                    <img
                        loading='lazy'
                        className='group-hover:translate-x-2 duration-300'
                        src={assets.arrowIcon}
                        alt="Arrow icon"
                    />
                </button>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
                aria-label="Offer cards"
            >
                {exclusiveOffers.map((offer) => (
                    <article
                        key={offer._id}
                        role="listitem"
                        aria-label={`Offer: ${offer.title}`}
                        className="group relative rounded-2xl overflow-hidden bg-cover bg-no-repeat bg-center h-[260px] shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{ backgroundImage: `url(${offer.image})` }}
                    >
                        <div className="relative h-full flex flex-col justify-between p-4 bg-black/40">
                            <div>
                                <p className="bg-green-100/90 px-3 py-1 rounded-full text-xs font-bold text-green-700 w-fit shadow-sm">
                                    {offer.priceOff}% OFF
                                </p>
                                <h2 className="mt-4 text-xl font-semibold text-white">{offer.title}</h2>
                                <p className="mt-2 text-sm text-white/90">{offer.description}</p>
                            </div>

                            <div>
                                <p className="text-xs text-white/70">Expires {offer.expiryDate}</p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="flex items-center gap-2 mt-3 group-hover:gap-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                                    aria-label={`View offer details for ${offer.title}`}
                                >
                                    <p className="text-sm font-semibold text-white">View All Offers</p>
                                    <img
                                        src={assets.arrowIcon}
                                        alt="Arrow icon"
                                        className="w-4 h-4 invert transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
