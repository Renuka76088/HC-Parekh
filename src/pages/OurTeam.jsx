import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Users, Briefcase, MapPin, CheckCircle } from 'lucide-react';

import { workforceApi } from '../api';

export default function OurTeam() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const res = await workforceApi.getTeam();
            setTeam(res.data);
        } catch (err) {
            console.error('Error fetching team:', err);
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

                            {/* Team Members Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {team.map((member, idx) => (
                                    <motion.div
                                        key={member._id || idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                                    >
                                        <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                                            {member.photoUrl ? (
                                                <img 
                                                    src={member.photoUrl} 
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Users size={64} />
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                                                <h4 className="text-white font-bold text-xl">{member.name}</h4>
                                                <p className="text-slate-200 text-sm font-medium">{member.position}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {team.length === 0 && !loading && (
                                    <p className="col-span-full text-center text-slate-400 py-12 italic">Our team details will be updated soon.</p>
                                )}
                            </div>

                            {/* Core Statement (Keep it as a secondary detail) */}
                            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 relative overflow-hidden mt-12">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Team Structure</h3>
                                    <p className="text-xl leading-relaxed text-slate-700">
                                        We appoint <span className="font-bold text-slate-900">experts of different sectors</span> on Retainership to enroll in our Team irrespective of locations to assist and supervise our Projects.
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
