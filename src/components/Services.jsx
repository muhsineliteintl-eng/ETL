"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Card from './Card';
import { Settings, Shield, Sparkles, Wrench, Droplet, TreePine, PaintBucket, Zap, ArrowRight } from 'lucide-react';

const icons = {
    'Sparkles': <Sparkles size={32} />,
    'TreePine': <TreePine size={32} />,
    'Shield': <Shield size={32} />,
    'PaintBucket': <PaintBucket size={32} />,
    'Wrench': <Wrench size={32} />,
    'Zap': <Zap size={32} />,
    'Droplet': <Droplet size={32} />,
    'Settings': <Settings size={32} />
};

export default function Services() {
    const [activeTab, setActiveTab] = useState('soft');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, []);

    if (!data || !data.settings.showServices) return null;

    const softServices = data.softServices;
    const hardServices = data.hardServices;

    const getIcon = (title) => {
        if (title.includes('Housekeeping')) return icons.Sparkles;
        if (title.includes('Landscaping')) return icons.TreePine;
        if (title.includes('Security')) return icons.Shield;
        if (title.includes('Façade')) return icons.PaintBucket;
        if (title.includes('HVAC')) return icons.Wrench;
        if (title.includes('Electrical')) return icons.Zap;
        if (title.includes('Plumbing')) return icons.Droplet;
        if (title.includes('Elevator')) return icons.Settings;
        return icons.Settings;
    };

    return (
        <section id="services" className="py-32 px-8 bg-primary-navy relative">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[clamp(2.5rem,5vw,4rem)] font-black text-text-primary mb-6 tracking-[-2px]"
                    >
                        Our <span className="text-accent-green">Expertise</span>
                    </motion.h2>
                    <p className="max-w-[600px] mx-auto text-text-secondary text-lg leading-relaxed">
                        Delivering integrated total facility management solutions tailored to the unique demands of global enterprise.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-6 mb-16">
                    <button
                        onClick={() => setActiveTab('soft')}
                        className={`px-10 py-4 rounded-full text-base font-semibold border transition-all duration-[400ms] ${activeTab === 'soft'
                            ? 'border-accent-green bg-accent-green-glow text-accent-green'
                            : 'border-black/10 bg-transparent text-text-secondary'
                            }`}
                    >
                        Soft Services
                    </button>
                    <button
                        onClick={() => setActiveTab('hard')}
                        className={`px-10 py-4 rounded-full text-base font-semibold border transition-all duration-[400ms] ${activeTab === 'hard'
                            ? 'border-accent-green bg-accent-green-glow text-accent-green'
                            : 'border-black/10 bg-transparent text-text-secondary'
                            }`}
                    >
                        Hard Services
                    </button>
                </div>

                {/* Content */}
                <div className="min-h-[500px]">
                    {activeTab === 'soft' ? (
                        <ServiceGrid services={softServices} color="var(--accent-green)" getIcon={getIcon} />
                    ) : (
                        <ServiceGrid services={hardServices} color="#0077CC" getIcon={getIcon} />
                    )}
                </div>
            </div>
        </section>
    );
}

function ServiceGrid({ services, color, getIcon }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8"
        >
            {services.map((service, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-xl -mx-6 -mt-6 mb-6 bg-white/5">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div style={{ color: color }}>{getIcon(service.title)}</div>
                        <h3 className="text-2xl font-semibold text-text-primary leading-tight">{service.title}</h3>
                    </div>

                    <p className="text-text-secondary leading-relaxed mb-6 text-[0.95rem]">{service.desc}</p>

                    <ul className="list-none p-0">
                        {service.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 mb-2 text-sm text-text-secondary">
                                <ArrowRight size={14} color={color} /> {detail}
                            </li>
                        ))}
                    </ul>
                </Card>
            ))}
        </motion.div>
    );
}
