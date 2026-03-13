"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Sectors() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showSectors || !data.sectors.length) return null;

    const sectors = data.sectors;

    return (
        <section id="sectors" className="py-32 px-8 bg-primary-navy text-text-primary">
            <div className="max-w-[1200px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-20 text-center tracking-[-2px]"
                >
                    Sectors <span className="text-accent-green">We Serve</span>
                </motion.h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10">
                    {sectors.map((sector, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -12 }}
                            className="relative h-[300px] rounded-[32px] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-black/5 group"
                        >
                            {/* Background Image */}
                            <img
                                src={sector.image}
                                alt={sector.title}
                                className="w-full h-full object-contain bg-black/20 transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                                <div>
                                    <div className="w-10 h-1 bg-accent-green rounded-sm mb-4"></div>
                                    <h3 className="text-2xl font-extrabold text-white tracking-[-0.5px]">
                                        {sector.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
