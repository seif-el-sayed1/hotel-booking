import React from 'react'
import { assets, testimonials } from '../assets/assets'

export const Testimonials = () => {
    return (
        <section
            className='pt-20 px-6 md:px-16 lg:px-24 bg-slate-50 pb-20'
            aria-labelledby="testimonials-heading"
        >
            <div className='flex flex-col items-center text-center pb-10'>
                <h2 id="testimonials-heading" className='font-light text-4xl mb-3'>
                    What Our Guests Say
                </h2>
                <p className='text-gray-500 max-w-3xl'>
                    Discover why discerning travelers consistently choose QuickStay for their exclusive
                    and luxurious accommodations around the world.
                </p>
            </div>

            <div
                className="flex flex-wrap items-center justify-center gap-6"
                role="list"
                aria-label="Guest testimonials"
            >
                {testimonials.map((testimonial) => (
                    <article
                        key={testimonial.id}
                        className="bg-white p-6 rounded-xl shadow max-w-xs"
                        role="listitem"
                        aria-label={`Testimonial by ${testimonial.name} from ${testimonial.address}`}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                loading='lazy'
                                className="w-12 h-12 rounded-full object-cover"
                                src={testimonial.image}
                                alt={`Photo of ${testimonial.name}`}
                            />
                            <div>
                                <p className="font-playfair text-xl text-gray-800">{testimonial.name}</p>
                                <p className="text-gray-500 text-sm">{testimonial.address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 mt-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <img
                                    key={index}
                                    loading='lazy'
                                    src={testimonial.rating > index
                                        ? assets.starIconFilled
                                        : assets.starIconOutlined}
                                    alt={testimonial.rating > index ? "Filled star" : "Empty star"}
                                    className="w-4 h-4"
                                />
                            ))}
                        </div>

                        <p className="text-gray-600 mt-4 italic">
                            “{testimonial.review}”
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}
