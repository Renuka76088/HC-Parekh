import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Users, Briefcase, MapPin, CheckCircle } from 'lucide-react';

export default function OurTeam() {
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
                                <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
                                    <Users size={24} />
                                </span>
                                <span className="text-indigo-700 font-bold tracking-wider text-sm uppercase">Our Workforce</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                OUR TEAM
                            </h1>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Expertise Across Sectors & Locations
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            {/* Core Statement */}
                            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Team Structure</h3>
                                    <p className="text-xl leading-relaxed text-slate-700">
                                        We appoint <span className="font-bold text-slate-900">experts of different sectors</span> on Retainership to enroll in our Team irrespective of locations to assist and supervise our Projects.
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            </div>

                            {/* Illustration / Features grid */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: Briefcase, title: "Industry Experts", desc: "Specialists from IT, Textile, FMCG, and more." },
                                    { icon: MapPin, title: "Location Independent", desc: "Operating across multiple cities efficiently." },
                                    { icon: CheckCircle, title: "Retainership Model", desc: "Ensuring long-term commitment and quality." }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <item.icon className="text-indigo-600 mb-4" size={28} />
                                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-500 text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}