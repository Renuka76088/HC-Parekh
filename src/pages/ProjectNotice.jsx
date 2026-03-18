import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, MapPin, CheckCircle } from 'lucide-react';

export default function ProjectNotice() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const requirements = [
        "The Social Media Influencers Services",
        "Dynamic Website Developments",
        "Digital Marketing Services",
        "Software Development with Integrations",
         "On-line Advertisement Services",
        "Mobile App Developments",
        "Outdoor Publicity & Advertisement Services",
        "Dynamic Website Tutorials",
        "Digital Marketing Tutorials",
        "AI-ML Tutorials",
        "Annual Maintenance Contract"
    ];

    const locations = [
        "Bengaluru", "Hyderabad", "Pune", "Chennai",
        "Ahmedabad", "Bhubaneswar", "Raipur", "Nagpur"
    ];

    const sectors = [
        "Textile & Garments",
        "Pulp & Paper Industry",
        "Medical & Healthcare",
        "F.M.C.G."
    ];

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
                                <span className="bg-rose-100 text-rose-600 p-2 rounded-lg">
                                    <FileText size={24} />
                                </span>
                                <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">Official Announcement</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                PROJECT NOTICE
                            </h1>
                            <p className="text-xl text-slate-600 font-medium">
                                Information Technology <span className="text-slate-400">|</span> F.Y. 2025-26-27
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            {/* Introduction */}
                            <div className="prose prose-slate max-w-none">
                                <p className="text-lg leading-relaxed text-slate-700">
                                    Following are our requirements for our long term Project Works for a tenure of <strong className="text-slate-900">3 years</strong> under the “Contract” to be executed in various cities for our different Clients of the different sectors.
                                </p>
                            </div>

                            {/* Sectors & Locations Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin size={18} className="text-rose-500" /> Project Locations
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map((loc, idx) => (
                                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-slate-600 shadow-sm border border-slate-100">
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4">Target Sectors</h3>
                                    <ul className="space-y-2">
                                        {sectors.map((sector, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                {sector}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Requirements List */}
                            <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Requirements</h3>
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                    {requirements.map((req, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700 font-medium">{req}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 blur-[80px] opacity-20 rounded-full"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3">Interested Service Providers</h3>
                                    <p className="text-slate-300 leading-relaxed mb-6">
                                        Companies (other than OPC) which have prescribed different clear Price-Plans and Service-Plans may contact us “in-person” for a Face-To-Face Meeting at <strong className="text-white">Bhubaneswar / Bengaluru</strong>, with a prior appointment.
                                    </p>
                                    <Link to="/contact" className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
                                        Book Appointment
                                    </Link>
                                </div>

                                  <div className="relative z-10 mt-10">
                                <p className="mb-6">
                                    <span className="font-bold text-xl mr-2">Note :</span>
                                    <span className="text-slate-300 leading-relaxed mb-6">
                                    We are not End-users. We supply the Business on a Retainership.
                                    </span>
                                </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
