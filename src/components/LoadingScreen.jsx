"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading, loadingText = "Loading..." }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 10;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            setProgress(100);
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-primary-navy flex flex-col items-center justify-center"
                >
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.02]">
                        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-green rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-green rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="mb-12"
                        >
                            <img 
                                src="/images/logo.png" 
                                alt="Elite International" 
                                className="h-20 w-auto object-contain"
                            />
                        </motion.div>

                        {/* Seekbar Loading Animation */}
                        <div className="w-80 mb-6">
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="h-full bg-accent-green rounded-full"
                                />
                            </div>
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-text-secondary text-sm font-medium"
                        >
                            {loadingText}
                        </motion.p>

                        {/* Company Name */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-text-secondary/60 text-xs tracking-[2px] uppercase">
                                Elite International Company
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}