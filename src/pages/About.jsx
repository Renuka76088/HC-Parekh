import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Briefcase, Heart, ChevronRight, Award, ShieldCheck } from 'lucide-react';

const SECTIONS = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'education', label: 'Educational Background', icon: BookOpen },
    { id: 'experience_govt', label: 'Govt. Experience', icon: Award },
    { id: 'experience_corp', label: 'Corporate Experience', icon: Briefcase },
    { id: 'ethics', label: 'Professional Ethics', icon: ShieldCheck },
    { id: 'social', label: 'Social Services', icon: Heart },
];

const CONTENT = {
    personal: (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Birth Place</p>
                    <p className="text-lg font-medium text-slate-800">Surat, Gujarat</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Mother Tongue</p>
                    <p className="text-lg font-medium text-slate-800">Gujarati</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow md:col-span-2">
                    <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Father</p>
                    <p className="text-lg font-medium text-slate-800">Retd. From the Dist. & Session Court, Surat, Gujarat</p>
                </div>
            </div>
        </div>
    ),
    education: (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Educational Background</h3>
            <div className="bg-gradient-to-r from-rose-50 to-white p-8 rounded-2xl border border-rose-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
                        <BookOpen size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">Mechanical</h4>
                </div>
                {/* <p className="text-lg text-slate-700 leading-relaxed">
                    Specialized in <span className="font-bold text-rose-600">Mechanical Engineering</span>.
                </p> */}
            </div>
        </div>
    ),
    experience_govt: (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Government Experience</h3>
            <div className="grid gap-6">
                {[
                    "Nuclear Power Corporation of India Ltd. (A Govt. of India undertaking)",
                    "Environmental & Radiological Laboratory of Bhabha Atomic Research Centre (A Govt. of India)",
                    "Hospital & Medical (A Govt. of India undertaking)",
                    "Mechanical Maintenance (A Govt. of India undertaking)"
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-rose-100 transition-colors"
                    >
                        <div className="mt-1 min-w-8">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs ring-4 ring-white">
                                {idx + 1}
                            </div>
                        </div>
                        <p className="text-slate-700 font-medium text-lg">{item}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    ),
    experience_corp: (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Corporate & Manufacturing</h3>
            <div className="grid grid-cols-1 gap-6">
                {[
                    { title: "Production Consultant", sector: "Textile & Garments" },
                    { title: "General Manager (Business)", sector: "Plastic Industry" },
                    { title: "Chief Business Officer", sector: "Information Technology" },
                    { title: "Trade Consultant", sector: "FMCG" }
                ].map((role, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative overflow-hidden bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="absolute top-0 right-0 w-2 h-full bg-rose-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                        <h4 className="text-lg font-bold text-slate-800 mb-1">{role.sector}</h4>
                        <p className="text-rose-600 font-medium">{role.title}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    ),
    ethics: (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Our Professional Ethics & Commitment</h3>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">
                            We take utmost care, binding to provide services to our valued Clients with our
                            <span className="font-bold text-slate-900"> professional commitments</span>, strictly adhering our set professional ethics, maintaining business and trade secrecy.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        Collaboration Protocol
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                        We always prefer <span className="font-semibold text-slate-800">In-person or Face-to-Face Meeting</span> with the Companies or Agencies before entering into the business tie-up and collaboration with them to avoid any further trade dispute or litigation.
                    </p>
                </div>
            </div>
        </div>
    ),
    social: (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 border-b pb-4 border-slate-200">Social Contributions</h3>
            <div className="bg-rose-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Heart size={150} />
                </div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> Active Role
                    </div>
                    <h4 className="text-2xl font-bold mb-2"><strong>Associated with many Social Organizations</strong>  of India</h4>
                    {/* <p className="text-rose-100 text-lg">A Regd. Social Organization, Hyderabad, Telangana</p> */}
                </div>
            </div>
        </div>
    )
};

export default function About() {
    const [activeTab, setActiveTab] = useState('personal');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-4 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">

                    {/* Inner Sidebar Navigation */}
                    <div className="w-full md:w-72 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-2 z-10">
                        <h2 className="text-xl font-black text-slate-900 mb-4 px-4 hidden md:block">Profile</h2>

                        <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar snap-x">
                            {SECTIONS.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeTab === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveTab(section.id)}
                                        className={`flex-none snap-start flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold relative overflow-hidden whitespace-nowrap md:whitespace-normal md:w-full ${isActive
                                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-200'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                    >
                                        <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                                        <span className="md:flex-1 text-left">{section.label}</span>
                                        {isActive && <ChevronRight size={16} className="text-white/80 hidden md:block" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Display Area */}
                    <div className="flex-1 p-6 md:p-12 md:overflow-y-auto md:max-h-[85vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {CONTENT[activeTab]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </main>
            </div>

            <Footer />
        </div>
    );
}
