"use client";

import { motion } from 'framer-motion';

export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
    const baseClasses = "px-8 py-3 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer tracking-wide uppercase";

    const variantClasses = {
        primary: "bg-gradient-to-br from-accent-green to-[#008450] text-white shadow-[0_10px_25px_rgba(0,132,80,0.3)] border-none",
        outline: "bg-transparent text-accent-green border-2 border-accent-green backdrop-blur-[10px]",
        secondary: "bg-white/8 text-white border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
