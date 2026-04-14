import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileSignature, Monitor, Scissors, ScrollText, CheckCircle2 } from 'lucide-react';

import { corporateApi } from '../api';

export default function CorporateMOU() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [mous, setMous] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchMOUs();
    }, []);

    const fetchMOUs = async () => {
        try {
            const res = await corporateApi.getMOUs();
            setMous(res.data);
        } catch (err) {
            console.error('Error fetching MOUs:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-4 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-8 md:p-12">

                        {/* Header Section */}
                        <div className="border-b border-slate-200 pb-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                                    <FileSignature size={24} />
                                </span>
                                <span className="text-emerald-700 font-bold tracking-wider text-sm uppercase">Business Partnership</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                CORPORATE MOU
                            </h1>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Indian Companies and Agencies are invited for the <span className="font-bold text-slate-800">Memorandum of Understanding (M.O.U.)</span> for the following Projects.
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-8">

                        <div className="space-y-6">
                            {mous.map((mou, idx) => {
                                const themes = [
                                    { wrapper: 'bg-[#f4f8fd] border-[#e6eff8]', title: 'text-[#0f172a]', subtitle: 'text-[#8c9bab]', iconBox: 'bg-white border-[#e2e8f0]', icon: 'text-[#2563eb]', check: 'text-[#3b82f6]', innerBox: 'bg-white', Icon: Monitor },
                                    { wrapper: 'bg-[#fff5f5] border-[#ffe4e6]', title: 'text-[#0f172a]', subtitle: 'text-[#8c9bab]', iconBox: 'bg-white border-[#e2e8f0]', icon: 'text-[#e11d48]', check: 'text-[#f43f5e]', innerBox: 'bg-white', Icon: Scissors },
                                    { wrapper: 'bg-[#f0fdf4] border-[#dcfce7]', title: 'text-[#0f172a]', subtitle: 'text-[#8c9bab]', iconBox: 'bg-white border-[#e2e8f0]', icon: 'text-[#16a34a]', check: 'text-[#22c55e]', innerBox: 'bg-white', Icon: FileSignature },
                                    { wrapper: 'bg-[#faf5ff] border-[#f3e8ff]', title: 'text-[#0f172a]', subtitle: 'text-[#8c9bab]', iconBox: 'bg-white border-[#e2e8f0]', icon: 'text-[#9333ea]', check: 'text-[#a855f7]', innerBox: 'bg-white', Icon: ScrollText }
                                ];
                                const theme = themes[idx % themes.length];
                                const Icon = theme.Icon;
                                const pointsList = Array.isArray(mou.points) ? mou.points : (typeof mou.points === 'string' ? mou.points.split('\n') : []);

                                return (
                                    <motion.div
                                        key={mou._id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border ${theme.wrapper} transition-all`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-14 h-14 rounded-2xl shadow-sm border flex items-center justify-center shrink-0 ${theme.iconBox} ${theme.icon}`}>
                                                <Icon size={26} strokeWidth={2} />
                                            </div>
                                            <div>
                                                <h3 className={`text-2xl font-bold ${theme.title}`}>{mou.title}</h3>
                                                {mou.description && (
                                                    <p className={`text-sm font-bold uppercase tracking-wider ${theme.subtitle}`}>{mou.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {pointsList.length > 0 && (
                                            <div className={`p-6 md:p-8 rounded-2xl md:rounded-[1.5rem] shadow-sm border border-slate-100 ${theme.innerBox}`}>
                                                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                                    {pointsList.filter(p => typeof p === 'string' ? p.trim() : p).map((point, pIdx) => (
                                                        <div key={pIdx} className="flex items-start gap-3">
                                                            <CheckCircle2 size={20} className={`${theme.check} shrink-0 mt-0.5`} />
                                                            <span className="text-[#334155] font-medium text-[15px]">{typeof point === 'string' ? point.trim() : point}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                            {mous.length === 0 && (
                                <p className="text-center text-slate-400 py-12 italic">Currently, there are no active MOU invitations.</p>
                            )}
                        </div>

                            {/* Call to Action */}
                            <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="relative z-10 max-w-2xl">
                                    <h3 className="text-xl font-bold mb-2">Interested in Collaboration?</h3>
                                    <p className="text-slate-300">
                                        We invite eligible agencies to discuss the roadmap and execution strategy.
                                    </p>
                                </div>
                                <div className='relative z-10'>
                                    <Link to="/contact" className="inline-block bg-white text-slate-900 hover:bg-slate-200 px-6 py-3 rounded-xl font-bold transition-colors shadow-lg">
                                        Contact for MOU
                                    </Link>
                                </div>

                                {/* Decorative background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 blur-[80px] opacity-20 rounded-full"></div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
