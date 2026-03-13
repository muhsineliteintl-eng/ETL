"use client";

import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, HeartHandshake, Users, Leaf, Award, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    const values = [
        { icon: <Award />, title: 'Professionalism', desc: 'Competence, discipline, and respect in every aspect of service delivery.' },
        { icon: <ShieldCheck />, title: 'Integrity', desc: 'Highest standards of transparency, accountability, and ethical conduct.' },
        { icon: <Zap />, title: 'Public Safety', desc: 'Prioritizing health, safety, and well-being through proactive risk management.' },
        { icon: <Target />, title: 'Quality Excellence', desc: 'Consistently meeting and exceeding performance standards.' },
        { icon: <Leaf />, title: 'Sustainability', desc: 'Responsible management of resources, energy, and environment.' },
        { icon: <Users />, title: 'People Development', desc: 'Investing in training and workforce engagement.' },
        { icon: <HeartHandshake />, title: 'Partnership', desc: 'Building long-term relationships based on trust.' },
    ];

    if (!data || !data.settings.showAbout) return null;

    const { about } = data;

    return (
        <section id="about" className="py-32 px-8 bg-bg-dark relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[20%] right-0 w-[30%] h-[40%] bg-[radial-gradient(circle,var(--accent-green-glow)_0%,transparent_70%)] blur-[100px] z-0 opacity-10" />

            <div className="max-w-[1200px] mx-auto relative z-[1]">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-[-2px] mb-8 text-text-primary leading-none">
                            {about.title.split(' ')[0]} <br /><span className="text-accent-green">{about.title.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-accent rounded-full mb-8"></div>
                        <p className="text-text-secondary text-xl leading-relaxed max-w-[550px]">
                            {about.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white/10 aspect-video lg:aspect-auto h-[400px]"
                    >
                        <img
                            src="/images/hero-bg.png"
                            alt="Elite International Excellence"
                            className="w-full h-full object-contain bg-white/5"
                        />
                    </motion.div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-16 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-12 bg-bg-card rounded-[32px] border border-glass-border backdrop-blur-[20px]"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-8 text-accent-green">
                            <Target size={32} />
                        </div>
                        <h3 className="text-3xl font-extrabold text-text-primary mb-6">
                            Our Mission
                        </h3>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            {about.mission}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-12 bg-bg-card rounded-[32px] border border-glass-border backdrop-blur-[20px]"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center mb-8 text-[#00D1FF]">
                            <Eye size={32} />
                        </div>
                        <h3 className="text-3xl font-extrabold text-text-primary mb-6">
                            Our Vision
                        </h3>
                        <ul className="list-none flex flex-col gap-6">
                            {about.vision.map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="min-w-[4px] h-10 bg-accent-green rounded-sm"></div>
                                    <div>
                                        <strong className="block text-text-primary mb-1">{item.title}</strong>
                                        <span className="text-text-secondary text-[0.95rem]">{item.desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Core Values Grid */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
                    {values.map((val, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, borderColor: 'rgba(0, 255, 157, 0.3)' }}
                            className="p-10 bg-bg-card rounded-3xl border border-glass-border text-center"
                        >
                            <div className="text-accent-green mb-6 flex justify-center">
                                <div className="scale-150 opacity-80">{val.icon}</div>
                            </div>
                            <h4 className="text-xl font-bold text-text-primary mb-3">{val.title}</h4>
                            <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
