"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Leadership() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showLeadership || !data.leadership.length) return null;

    return (
        <section className="py-32 px-8 bg-bg-dark border-b border-white/5 relative overflow-hidden">
            <div className="max-w-[1000px] mx-auto relative z-[1]">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-20 justify-center">
                    {data.leadership.map((person, index) => (
                        <motion.div
                            key={person.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="text-center"
                        >
                            <div className="w-full max-w-[350px] aspect-[0.75] mx-auto mb-10 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5 relative">
                                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-20"></div>
                            </div>
                            <h3 className="text-xl text-text-secondary mb-2 font-medium tracking-widest uppercase">{person.prefix}</h3>
                            <h2 className="text-[1.75rem] text-accent-green font-black mb-3 tracking-tight">{person.name}</h2>
                            <p className="text-text-secondary italic text-lg">{person.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,rgba(0,255,157,0.05)_0%,transparent_70%)] z-0 pointer-events-none" />
        </section>
    );
}
