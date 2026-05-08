import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, MapPin, CheckCircle, GraduationCap, Globe, Shield } from 'lucide-react';
import { workforceApi } from '../api';

const IconMap = {
    Briefcase: Briefcase,
    MapPin: MapPin,
    CheckCircle: CheckCircle,
    GraduationCap: GraduationCap,
    Users: Users,
    Globe: Globe,
    Shield: Shield
};

export default function OurTeam() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [team, setTeam] = useState([]);
    const [settings, setSettings] = useState({
        heroTitle: 'OUR TEAM',
        heroDescription: 'Expertise Across Sectors & Locations',
        structureTitle: 'Team Structure',
        structureContent: 'We appoint <span class="font-bold text-slate-900">experts of different sectors</span> on Retainership to enroll in our Team irrespective of locations to assist and supervise our Projects.',
        competencies: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamRes, settingsRes] = await Promise.all([
                    workforceApi.getTeam(),
                    workforceApi.getSettings()
                ]);
                setTeam(teamRes.data || []);
                if (settingsRes.data) setSettings(settingsRes.data);
            } catch (err) {
                console.error("Error fetching team data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                                {settings.heroTitle}
                            </h1>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                {settings.heroDescription}
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-12">

                            {/* Core Statement */}
                            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{settings.structureTitle}</h3>
                                    <div 
                                        className="text-lg md:text-xl leading-relaxed text-slate-700 break-words whitespace-normal overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: settings.structureContent }}
                                    />
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            </div>

                            {/* Dynamic Team Grid - Smaller Cards, No Photos */}
                            {loading ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-slate-50 h-32 rounded-xl"></div>
                                    ))}
                                </div>
                            ) : team.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {team.map((member, idx) => (
                                        <motion.div
                                            key={member._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="bg-indigo-50/40 p-6 rounded-2xl border-t-4 border-t-indigo-600 border border-indigo-100/50 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 relative group overflow-hidden"
                                        >
                                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-colors"></div>
                                            
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                                    <Users size={18} />
                                                </div>
                                                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-full">
                                                    Official Member
                                                </span>
                                            </div>

                                            <h4 className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{member.name}</h4>
                                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-4">{member.designation}</p>
                                            
                                            <div className="pt-4 border-t border-indigo-100/50 flex flex-wrap gap-2">
                                                {(member.locations || []).map((loc, i) => (
                                                    <div key={i} className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 uppercase tracking-tight">
                                                        <MapPin size={10} />
                                                        <span>{loc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : null}

                            {/* Dynamic Features grid (Competencies) */}
                            {settings.competencies && settings.competencies.length > 0 && (
                                <div className="grid md:grid-cols-3 gap-6 pt-4">
                                    {settings.competencies.map((item, idx) => {
                                        const Icon = IconMap[item.iconName] || Briefcase;
                                        return (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -5 }}
                                                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <Icon className="text-indigo-600 mb-4" size={28} />
                                                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                                <p className="text-slate-500 text-sm leading-relaxed break-words whitespace-normal">{item.description}</p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}