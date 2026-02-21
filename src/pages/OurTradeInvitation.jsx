import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
// Updated icons for Trade/Business context
import { Handshake, Factory, Store, Briefcase } from 'lucide-react';

export default function OurTradeInvitation() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                    {/* Changed Heart to Handshake for partnership */}
                                    <Handshake size={24} />
                                </span>
                                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Business Partnership</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                OUR TRADE INVITATION
                            </h1>
                            <p className="text-xl text-slate-600 font-medium">
                                Invitation to Join Our Trading Community
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            {/* Core Statement - YOUR NEW CONTENT HERE */}
                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Invitation for Partnership</h3>
                                    <p className="text-xl leading-relaxed text-slate-700">
                                        The <span className="font-bold text-slate-900">Traders, Retailers and Manufacturers</span> especially from the <span className="font-bold text-slate-900">Textile & Garments, FMCG, Paper Industries and Medical & Healthcare</span> are invited for Trade Partnership.
                                    </p>
                                </div>
                                {/* Changed decorative color to blue/slate to fit business theme */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            </div>



                            {/* Contact Callout */}
                            <div className="bg-slate-900 text-white p-8 rounded-2xl text-center">
                                <h3 className="text-xl font-bold mb-2">Interested in Partnering?</h3>
                                <p className="text-slate-400 mb-6">Connect with us to explore business opportunities.</p>
                                <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                                    Contact Us
                                </Link>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}