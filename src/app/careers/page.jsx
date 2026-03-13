"use client";

import JobApplicationForm from '../../components/JobApplicationForm';
import { motion } from 'framer-motion';

export default function Careers() {
    return (
        <div className="pt-[160px] pb-32 bg-primary-navy text-text-primary">
            <div className="max-w-[900px] mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black mb-6 tracking-[-2px]">
                        Join Our <span className="text-accent-green">Team</span>
                    </h1>
                    <div className="w-20 h-1 bg-gradient-accent mx-auto mb-8 rounded-sm"></div>
                    <p className="text-text-secondary text-xl max-w-[600px] mx-auto">
                        We are always looking for talented individuals to help us deliver facility management excellence across Kuwait.
                    </p>
                </motion.div>

                <JobApplicationForm />
            </div>
        </div>
    );
}
