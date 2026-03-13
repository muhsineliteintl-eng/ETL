"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReviewSlider() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showReviews || !data.reviews.length) return null;

    const reviews = data.reviews;

    return (
        <div className="overflow-hidden py-24 bg-white border-t border-[#EEE]">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-black text-text-primary tracking-tight">What Our Clients Say</h2>
                <div className="w-15 h-1 bg-accent-green mx-auto mt-4 rounded-sm"></div>
            </div>
            <motion.div
                className="flex gap-12 w-fit"
                animate={{ x: [-1500, 0] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 35,
                        ease: "linear",
                    }
                }}
            >
                {[...reviews, ...reviews, ...reviews].map((review, index) => (
                    <div key={`${review.id}-${index}`} className="min-w-[300px] w-[300px] sm:min-w-[400px] p-6 sm:p-10 bg-bg-dark rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/[0.02] flex flex-col justify-between shrink-0">
                        <div>
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < review.rating ? "var(--accent-green)" : "none"} color={i < review.rating ? "var(--accent-green)" : "#DDD"} />
                                ))}
                            </div>
                            <p className="italic mb-8 text-text-primary text-lg leading-relaxed font-medium">"{review.text}"</p>
                        </div>
                        <div>
                            <h4 className="font-extrabold text-accent-green text-lg mb-1">{review.name}</h4>
                            <span className="text-sm text-text-secondary font-semibold">{review.role}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
