"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ServiceSlider() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showServiceSlider) return null;

    // Combine soft and hard services for the slider
    // Fallback to empty array if undefined
    const allServices = [
        ...(data.softServices || []),
        ...(data.hardServices || [])
    ];

    if (allServices.length === 0) return null;

    return (
        <div className="overflow-hidden py-24 bg-bg-dark border-b border-white/5">
            <motion.div
                className="flex gap-8 w-fit px-8"
                animate={{ x: [0, -2000] }} // You might need to adjust the scroll distance based on content width dynamically, but for now fixed is okay if content is wide enough
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 60, // Slower for better readability
                        ease: "linear",
                    },
                }}
            >
                {/* Duplicate the list to create seamless loop effect */}
                {[...allServices, ...allServices, ...allServices].map((service, index) => (
                    <div
                        key={`${service.id}-${index}`}
                        className="min-w-[300px] w-[300px] sm:min-w-[350px] sm:w-[350px] md:min-w-[400px] md:w-[400px] h-[250px] sm:h-[300px] rounded-3xl overflow-hidden relative shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-white/5 group bg-primary-navy"
                    >
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                {service.title}
                            </h3>
                            <div className="h-1 w-12 bg-accent-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
