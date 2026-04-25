import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, Calendar, Box, Scissors, Truck, Wallet } from 'lucide-react';

import { corporateApi } from '../api';

export default function CorporateTenders() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchTenders();
    }, []);

    const fetchTenders = async () => {
        try {
            const res = await corporateApi.getTenders();
            setTenders(res.data);
        } catch (err) {
            console.error('Error fetching tenders:', err);
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
                                <span className="bg-amber-100 text-amber-700 p-2 rounded-lg">
                                    <FileText size={24} />
                                </span>
                                <span className="text-amber-700 font-bold tracking-wider text-sm uppercase">Expression of Interest</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                CORPORATE TENDERS
                            </h1>
                       
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            <div className="space-y-16">
                                {tenders.map((tender, idx) => {
                                    const pointsList = Array.isArray(tender.points) ? tender.points : (typeof tender.points === 'string' ? tender.points.split('\n') : []);

                                    return (
                                        <div key={tender._id || idx} className="w-full">
                                            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6 uppercase tracking-tight">
                                                {tender.title}
                                            </h2>

                                            {tender.description && (
                                                <h3 className="text-xl text-[#0f172a] mb-6">
                                                    {tender.description}
                                                </h3>
                                            )}

                                            <div className="space-y-3">
                                                {pointsList.filter(p => typeof p === 'string' ? p.trim() : p).map((point, pIdx) => (
                                                    <div key={pIdx} className="bg-[#f8fafc] px-6 py-5 rounded-[1.25rem] flex items-center gap-4 hover:bg-slate-100 transition-colors">
                                                        <div className="w-2 h-2 rounded-full bg-[#c81e1e] shrink-0" />
                                                        <span className="text-[#0f172a] font-medium text-[17px] leading-snug">
                                                            {typeof point === 'string' ? point.trim() : point}
                                                        </span>
                                                    </div>
                                                ))}
                                                {pointsList.length === 0 && (
                                                    <p className="text-slate-400 italic text-sm py-2">No specific points listed for this contract.</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {tenders.length === 0 && (
                                    <p className="text-slate-400 italic text-center py-8 text-lg">(At present, No EOI Published)</p>
                                )}
                            </div>

                            {/* Footer Note */}
                            <div className="bg-slate-900 text-white p-6 rounded-xl text-center">
                                {/* <p className="text-slate-300 text-sm">
                                    Tender Documents can be obtained <strong>In-person</strong> on payment of prescribed fee (Non-refundable).
                                </p> */}

                                <p className="text-slate-300 text-sm">
                                    Contract Documents can be obtained in-person on payment of its prescribed fee (Non-refundable) </p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
