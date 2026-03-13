"use client";

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function QHSE() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showQHSE) return null;

    const { qhse } = data;

    return (
        <section className="py-32 px-8 bg-bg-dark relative overflow-hidden">
            <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-20 items-center relative z-[1]">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-text-primary mb-8 leading-none tracking-[-2px]">
                        {qhse.title.split(' ')[0]} <br /><span className="text-accent-green">{qhse.title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-12 text-lg">
                        {qhse.description}
                    </p>
                    <ul className="list-none flex flex-col gap-6">
                        {qhse.commitments.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-center gap-4 text-lg text-text-secondary"
                            >
                                <div className="min-w-[32px] h-8 rounded-full bg-accent-green/10 flex items-center justify-center text-accent-green">
                                    <CheckCircle size={18} strokeWidth={3} />
                                </div>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-[550px] rounded-[32px] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5"
                >
                    <img
                        src={qhse.image}
                        alt="QHSE Safety Officer"
                        className="w-full h-full object-contain bg-white/5"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-12">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-accent-green shadow-[0_0_15px_var(--accent-green)]"></div>
                            <p className="text-white font-bold text-xl tracking-wide">Zero Compromise on Safety</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(0,209,255,0.05)_0%,transparent_70%)] blur-[100px] z-0 pointer-events-none" />
        </section>
    );
}
