"use client";
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Leadership from '../components/Leadership';
import ExecutiveSummary from '../components/ExecutiveSummary';
import Services from '../components/Services';
import ServiceSlider from '../components/ServiceSlider';
import ReviewSlider from '../components/ReviewSlider';
import Sectors from '../components/Sectors';
import Equipment from '../components/Equipment';
import QHSE from '../components/QHSE';
import Partners from '../components/Partners';
import About from '../components/About';
import LoadingScreen from '../components/LoadingScreen';
import { useLoading } from '../contexts/LoadingContext';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setIsPageLoading } = useLoading();

    useEffect(() => {
        setIsPageLoading(true);
        
        const loadData = async () => {
            try {
                const res = await fetch('/api/content', { cache: 'no-store' });
                if (!res.ok) throw new Error('Failed to fetch data');
                const json = await res.json();
                setData(json);
                
                // Small delay to ensure smooth transition
                setTimeout(() => {
                    setLoading(false);
                    setIsPageLoading(false);
                }, 300);
            } catch (err) {
                console.error('Data fetch error:', err);
                setLoading(false);
                setIsPageLoading(false);
            }
        };
        loadData();
    }, [setIsPageLoading]);

    if (loading) {
        return <LoadingScreen isLoading={true} loadingText="Loading..." />;
    }

    if (!data) {
        return (
            <div className="h-screen w-full bg-primary-navy flex flex-col items-center justify-center text-white">
                <h2 className="text-xl font-black text-red-500 mb-4">FAILED TO CONNECT TO SYSTEM</h2>
                <button onClick={() => window.location.reload()} className="px-8 py-4 bg-accent-green text-primary-navy font-bold rounded-2xl">RETRY CONNECTION</button>
            </div>
        );
    }

    return (
        <>
            <Hero data={data} />
            <div className="bg-primary-navy relative z-10">
                <Leadership data={data} />
                <ExecutiveSummary data={data} />
                <div id="about">
                    <About data={data} />
                </div>
                <ServiceSlider data={data} />
                <div id="services">
                    <Services data={data} />
                </div>
                <ReviewSlider data={data} />
                <div id="sectors">
                    <Sectors data={data} />
                </div>
                {data.settings.showEquipment && <Equipment data={data} />}
                <QHSE data={data} />
                <Partners data={data} />
            </div>
        </>
    );
}
