import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, Scale, Users, FileText, Globe } from 'lucide-react';

import { contentApi } from '../api';

export default function Services() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await contentApi.getServices();
            setServices(res.data);
        } catch (err) {
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-4 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                        {/* Hero Banner */}
                        <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600 blur-[100px] opacity-20 rounded-full translate-x-1/3 -translate-y-1/3" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm border border-white/10">
                                    <Briefcase size={14} className="text-rose-400" /> Professional Solutions
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black mb-4">Our Professional Services</h1>
                                <p className="text-slate-400 text-lg max-w-2xl">
                                    Comprehensive corporate and industrial solutions tailored to your business needs, from legal compliance to project implementation.
                                </p>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="p-8 md:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(services.length > 0 ? services : [
                                    { title: "Industrial & Corporate M.O.U & Joint Ventures" },
                                    { title: "Corporate Investors & Investment" },
                                    { title: "Tender & Contract" },
                                    { title: "Appointment of Dealers and Distributors" },
                                    { title: "Product Indenting & Procurement" },
                                    { title: "Appointment of Sales Agencies" }
                                ]).map((service, idx) => (
                                    <motion.div
                                        key={service._id || idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-default"
                                    >
                                        <div className="mt-1">
                                            <CheckCircle2 size={20} className="text-rose-500 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-700 font-bold text-lg leading-snug group-hover:text-slate-900">
                                                {service.title || service.name}
                                            </p>
                                            {Array.isArray(service.points) && service.points.length > 0 && (
                                                <ul className="mt-2 space-y-1.5 list-disc list-inside">
                                                    {service.points.map((p, pIdx) => (
                                                        <li key={pIdx} className="text-sm text-slate-500 font-medium">{p}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action Footer */}
                        <div className="bg-slate-50 p-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900">Need specific details?</h4>
                                <p className="text-slate-500">Contact us to discuss your requirements.</p>
                            </div>
                            <a href="/contact" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                Get a Consultation
                            </a>
                        </div>

                    </motion.div>

                </main>
            </div>

            <Footer />
        </div>
    );
}
