import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Megaphone, Instagram, Facebook, Linkedin, Youtube, Mail, Info } from 'lucide-react';

import { workforceApi } from '../api';

export default function OurHiring() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const res = await workforceApi.getVacancies();
            setVacancies(res.data);
        } catch (err) {
            console.error('Error fetching vacancies:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-3 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-3 md:p-12">

                        {/* Header Section */}
                        <div className="border-b border-slate-200 pb-8 mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                                    <Megaphone size={24} />
                                </span>
                                <span className="text-purple-700 font-bold tracking-wider text-sm uppercase">Join Our Team</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">
                                CURRENT OPENINGS
                            </h1>
                            <p className="text-xl text-slate-500 font-medium">
                                Explore opportunities to grow with us
                            </p>
                        </div>

                        {/* Hiring Listings */}
                        <div className="space-y-12">
                            {vacancies.map((job, idx) => (
                                <motion.div
                                    key={job._id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                            {job.type}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-sm text-slate-600">
                                            <Info size={14} className="text-slate-400" /> {job.location || "Any Location"}
                                        </span>
                                    </div>

                                    <div className="mb-8">
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{job.title}</h2>
                                        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                        {job.requirements && (
                                            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                                                    Key Requirements
                                                </h3>
                                                <ul className="space-y-2">
                                                    {job.requirements.split('\n').filter(r => r.trim()).map((req, rIdx) => (
                                                        <li key={rIdx} className="flex gap-2 text-slate-700 text-sm leading-relaxed">
                                                            <span className="text-purple-600 font-bold">•</span>
                                                            {req.trim()}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-center">
                                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                                <Mail className="text-purple-400" size={18} /> How to Apply
                                            </h3>
                                            <p className="text-slate-400 text-sm mb-4">
                                                Please send your updated Resume/CV to our recruitment team.
                                            </p>
                                            <a 
                                                href="mailto:hemant.parekh2012@gmail.com" 
                                                className="text-purple-400 font-black hover:text-white transition-colors underline decoration-purple-600/50 underline-offset-4"
                                            >
                                                hemant.parekh2012@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {vacancies.length === 0 && !loading && (
                                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <div className="mb-4 text-slate-300 flex justify-center">
                                        <Megaphone size={48} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No Current Openings</h3>
                                    <p className="text-slate-500">Check back later for new opportunities or follow us on social media.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div >
            <Footer />
        </div >
    );
}
