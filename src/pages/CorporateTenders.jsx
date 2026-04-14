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
                            <p className="text-xl text-slate-600 font-medium">
                                (At present, No EOI Published)
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            {/* Introduction */}
                            <div className="prose prose-slate max-w-none">
                                <p className="text-xl md:text-3xl font-black text-slate-900 mb-4">
                                   OPEN CONTRACT  </p>
                            </div>

                          {/* Tender Works Grid */}
<div className="space-y-6">
    <h2 className="text-xl font-bold text-slate-900 mb-4">Open contract for the following works</h2>
    
    <div className="grid md:grid-cols-1 gap-4">
        {tenders.map((tender, idx) => (
            <div key={tender._id || idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors">
                <div className="flex items-start gap-4">
                    <div className="bg-rose-500 w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-slate-900 text-lg leading-tight mb-2">{tender.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{tender.description}</p>
                    </div>
                </div>
            </div>
        ))}
        {tenders.length === 0 && <p className="text-slate-400 italic text-center py-4">(At present, No EOI Published)</p>}
    </div>
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
