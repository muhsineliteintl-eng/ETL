"use client";

import { motion } from 'framer-motion';
import Button from './Button';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Shield } from 'lucide-react';

export default function Hero({ data }) {
    if (!data || !data.settings.showHero) return null;

    const { hero } = data;
    const bgImage = '/images/hero-bg.png';

    return (
        <section id="hero" className="h-screen w-full relative overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax-like effect */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bgImage})` }}
            />

            {/* Cinematic Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-white z-[1]" />

            <div className="relative z-[2] max-w-[1000px] w-full px-8 text-center mx-auto">
                <div className="text-center">
                    <motion.h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.1] mb-10 tracking-[-2px] text-white flex flex-col gap-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {hero.title1}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-accent-green inline-block drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]"
                        >
                            {hero.title2}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[0.45em] text-white tracking-[4px] mt-2 font-extrabold"
                        >
                            {hero.subtitle}
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="text-white text-xl mb-16 max-w-[700px] mx-auto leading-[1.7] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                        className="flex flex-row gap-8 flex-wrap justify-center"
                    >
                        <Link href="/contact" className="no-underline">
                            <Button variant="primary" className="py-5 px-12 text-lg font-bold">
                                {hero.primaryCTA} <ArrowRight size={22} />
                            </Button>
                        </Link>
                        <Link href="/#services" className="no-underline">
                            <Button variant="secondary" className="py-5 px-12 text-lg font-bold">
                                {hero.secondaryCTA} <ChevronRight size={22} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-[radial-gradient(circle,var(--accent-green-glow)_0%,transparent_70%)] blur-[80px] z-[1] opacity-30" />
            <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(0,209,255,0.2)_0%,transparent_70%)] blur-[80px] z-[1] opacity-20" />
        </section>
    );
}
