"use client";

import { motion } from 'framer-motion';

export default function Card({ children, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`bg-bg-card rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] p-8 border border-glass-border backdrop-blur-[20px] relative overflow-hidden text-text-primary ${className}`}
        >
            {children}
        </motion.div>
    );
}
