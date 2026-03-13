"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Equipment({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    console.log('Equipment component rendering with data:', data?.equipment?.length);
    
    if (!data?.equipment || data.equipment.length === 0) {
        console.log('No equipment data found');
        return (
            <section className="py-32 bg-primary-navy">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-white mb-6">
                        THE <span className="text-accent-green">EQUIPMENT</span> WE USE
                    </h2>
                    <p className="text-white/70">No equipment data available</p>
                </div>
            </section>
        );
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % data.equipment.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + data.equipment.length) % data.equipment.length);
    };

    return (
        <section className="py-32 bg-primary-navy relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight drop-shadow-lg">
                        THE <span className="text-accent-green drop-shadow-[0_2px_4px_rgba(0,255,157,0.3)]">EQUIPMENT</span> WE USE
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                        Professional-grade equipment and tools that ensure the highest standards of service delivery across all our facility management operations.
                    </p>
                </div>

                {/* Equipment Gallery */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Main Display */}
                    <div className="relative bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm shadow-2xl">
                        <div className="aspect-[16/10] relative bg-white/10 rounded-2xl overflow-hidden">
                            <img
                                src={data.equipment[currentIndex].image}
                                alt={data.equipment[currentIndex].title}
                                className="w-full h-full object-contain bg-white/5"
                                onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                }}
                                onLoad={() => console.log('Image loaded successfully:', data.equipment[currentIndex].image)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        </div>
                        
                        {/* Equipment Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight text-white drop-shadow-lg">
                                {data.equipment[currentIndex].title}
                            </h3>
                            {data.equipment[currentIndex].description && (
                                <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-3xl drop-shadow-sm">
                                    {data.equipment[currentIndex].description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/40 hover:bg-accent-green/20 border border-white/30 hover:border-accent-green/60 rounded-full flex items-center justify-center text-white hover:text-accent-green transition-all duration-300 backdrop-blur-md group shadow-lg"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/40 hover:bg-accent-green/20 border border-white/30 hover:border-accent-green/60 rounded-full flex items-center justify-center text-white hover:text-accent-green transition-all duration-300 backdrop-blur-md group shadow-lg"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center gap-3 md:gap-4 mt-8 overflow-x-auto pb-4 px-4">
                        {data.equipment.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                                    index === currentIndex
                                        ? 'border-accent-green shadow-[0_0_20px_rgba(0,255,157,0.4)] scale-105'
                                        : 'border-white/30 hover:border-white/50 hover:scale-102'
                                }`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.error('Thumbnail failed to load:', e.target.src);
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className={`absolute inset-0 transition-all duration-300 ${
                                    index === currentIndex ? 'bg-accent-green/10' : 'bg-black/30 hover:bg-black/20'
                                }`} />
                            </button>
                        ))}
                    </div>

                    {/* Equipment Counter */}
                    <div className="text-center mt-6">
                        <span className="text-white/60 font-bold text-sm md:text-base bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                            {currentIndex + 1} / {data.equipment.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}