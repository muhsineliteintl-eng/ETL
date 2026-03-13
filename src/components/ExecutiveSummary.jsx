"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ExecutiveSummary() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showExecutiveSummary) return null;

    const { executiveSummary } = data;

    return (
        <section className="py-32 px-8 bg-primary-navy relative">
            <div className="max-w-[1000px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-text-primary mb-12 text-center tracking-[-2px]">
                        {executiveSummary.title.split(' ')[0]} <span className="text-accent-green">{executiveSummary.title.split(' ').slice(1).join(' ')}</span>
                    </h2>

                    <div className="text-lg leading-relaxed text-text-secondary flex flex-col gap-8">
                        {executiveSummary.paragraphs.map((p, i) => (
                            <p key={i} className={i === 1 ? "border-l-4 border-accent-green p-8 bg-bg-dark rounded-r-[20px] backdrop-blur-[10px] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-text-primary italic font-medium" : "relative z-[1]"}>
                                {p}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(0,255,157,0.03)_0%,transparent_70%)] z-0 pointer-events-none" />
        </section>
    );
}
