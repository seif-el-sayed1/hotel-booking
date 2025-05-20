import React from 'react'
import { assets, testimonials } from '../assets/assets'

export const Testimonials = () => {
    return (
        <div className='pt-20 px-6 md:px-16 lg:px-24 bg-slate-50 pb-15'>
            <div className='flex flex-col items-center justify-center pb-5'>
                <h1 className='font-light text-4xl mb-3'>What Our Guests Say</h1>
                <p className='text-gray-500 text-center max-w-150'>Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.</p>
            </div>  
            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={testimonial.rating > index ?  assets.starIconFilled 
                                    : assets.starIconOutlined
                                } alt="rating" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
