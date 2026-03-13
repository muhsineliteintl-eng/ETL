"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Partners() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showPartners || !data.partners.length) return null;

    const partners = data.partners;

    return (
        <section className="py-24 bg-white border-t border-black/5 overflow-hidden">
            <p className="text-center mb-16 text-[#666] font-bold tracking-[3px] uppercase text-sm">Trusted By industry leaders in Kuwait</p>

            <motion.div
                className="flex gap-24 w-fit px-8"
                animate={{ x: [-2000, 0] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                    },
                }}
            >
                {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div key={index} className="text-2xl font-black text-text-primary opacity-40 tracking-tight whitespace-nowrap uppercase">
                        {partner}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
