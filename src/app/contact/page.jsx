"use client";

import BookingForm from '../../components/BookingForm';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="pt-[160px] pb-32 bg-primary-navy text-text-primary">
            <div className="max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-20 mb-32 items-start">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[clamp(3rem,6vw,4.5rem)] font-black mb-8 tracking-[-3px] leading-none"
                        >
                            Get In <br /><span className="text-accent-green">Touch</span>
                        </motion.h1>
                        <p className="text-text-secondary text-xl mb-16 leading-relaxed max-w-[500px]">
                            Ready to elevate your facility management? Our experts are standing by to provide tailored solutions for your business.
                        </p>

                        <div className="flex flex-col gap-6">
                            {[
                                { icon: <Phone size={24} />, title: 'Phone', desc: ['+965 6994 6970', '+965 6069 6065',' +965 6502 8931'] },
                                { icon: <Mail size={24} />, title: 'Email', desc: ['info@elitepfm.com'] },
                                { icon: <MapPin size={24} />, title: 'Office', desc: ['Kuwait – Jaleeb Al-Shuwaik, block -1', 'Faisal al-bander al duwaish bldg. no.24, 2nd floor office no.22'] }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 items-center p-6 bg-bg-card rounded-[20px] border border-glass-border backdrop-blur-[10px]"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-accent-green/10 flex items-center justify-center text-accent-green">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                                        {item.desc.map((d, i) => (
                                            <p key={i} className="text-text-secondary text-[0.95rem]">{d}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <BookingForm />
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full h-[500px] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-glass-border"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3480.713042078335!2d47.93803027552402!3d29.26138687532722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDE1JzQxLjAiTiA0N8KwNTYnMjYuMiJF!5e0!3m2!1sen!2sbd!4v1769474159013!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
}
