import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Megaphone, Instagram, Facebook, Linkedin, Youtube, Mail, Info, ArrowRight } from 'lucide-react';

import { workforceApi } from '../api';

export default function OurHiring() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const res = await workforceApi.getVacancies();
            setVacancies(res.data);
        } catch (err) {
            console.error('Error fetching vacancies:', err);
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.');
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-3 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-3 md:p-12">

                        {/* Header Section */}
                        <div className="border-b border-slate-200 pb-8 mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-purple-100 text-purple-700 p-2 rounded-lg">
                                    <Megaphone size={24} />
                                </span>
                                <span className="text-purple-700 font-bold tracking-wider text-sm uppercase">Join Our Team</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">
                                CURRENT OPENINGS
                            </h1>
                             <p className="text-xl text-slate-500 font-medium">
                                Explore opportunities to grow with us
                            </p>
                        </div>

                        {/* Hiring Listings */}
                        <div className="space-y-12">
                            {vacancies.map((job, idx) => {
                                const targetSectors = Array.isArray(job.targetSectors) ? job.targetSectors : (typeof job.targetSectors === 'string' ? job.targetSectors.split('\n') : []);
                                const requiredPlatforms = Array.isArray(job.requiredPlatforms) ? job.requiredPlatforms : (typeof job.requiredPlatforms === 'string' ? job.requiredPlatforms.split('\n') : []);
                                const isContract = job.type?.toLowerCase().includes('contract');

                                return (
                                    <div key={job._id || idx} className="w-full bg-[#f8fafc] p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex gap-0">
                                        {/* Red Left Accent */}
                                        <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-[#991b1b] rounded-r-full"></div>

                                        <div className="pl-6 w-full">
                                            {/* Header Row */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                                    {job.title}
                                                </h2>
                                                {isContract && (
                                                    <span className="bg-[#991b1b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                        ON CONTRACT
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-500 font-medium mb-10">
                                                Date of Publish {formatDate(job.createdAt)}.
                                            </p>

                                            {/* Quotation Emails */}
                                            <div className="mb-10">
                                                <h4 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                                                    {job.emailHeading || 'QUOTATION EMAILS'}
                                                </h4>
                                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                    {(job.emails || []).map((email, eIdx) => (
                                                        <a key={eIdx} href={`mailto:${email.toLowerCase()}`} className="text-[1.1rem] font-bold text-[#991b1b] hover:underline underline-offset-4 decoration-[#991b1b]/30 transition-all">
                                                            {email.toLowerCase()}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Profile Section */}
                                            {targetSectors.length > 0 && (
                                                <div className="mb-10">
                                                    <h4 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-4">
                                                        {job.targetSectorsHeading || 'PROFILE'}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {targetSectors.filter(t => t.trim()).map((sector, sIdx) => (
                                                            <div key={sIdx} className="bg-[#eff6ff] text-[#1e40af] border border-[#dbeafe] px-5 py-2.5 rounded-2xl font-bold text-sm tracking-tight shadow-sm">
                                                                {sIdx + 1}. {sector.trim()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Required Criteria */}
                                            {requiredPlatforms.length > 0 && (
                                                <div className="mb-10">
                                                    <h4 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-4">
                                                        {job.requiredPlatformsHeading || 'REQUIRED CRITERIA'}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {requiredPlatforms.filter(p => p.trim()).map((plat, pIdx) => (
                                                            <div key={pIdx} className="bg-[#f0fdf4] text-[#166534] border border-[#dcfce7] px-4 py-2 rounded-xl font-bold text-[13px] shadow-sm">
                                                                {plat.trim()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Apply Now Section - Commented out as requested
                                            <div className="mt-8 pt-8 border-t border-slate-100">
                                                <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full group-hover:bg-rose-500/20 transition-all duration-700"></div>
                                                    
                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                                                                <Mail className="text-rose-400" size={20} />
                                                            </div>
                                                            <h3 className="text-xl font-bold tracking-tight">
                                                                {job.applyNowTitle || 'Apply Now'}
                                                            </h3>
                                                        </div>

                                                        <p className="text-slate-400 font-medium mb-6 leading-relaxed max-w-2xl">
                                                            {job.quotationInstruction || "Submit your Quotation in PDF format including payment terms."}
                                                        </p>

                                                        <div className="flex flex-wrap gap-3">
                                                            {(job.emails || []).map((email, eIdx) => (
                                                                <a 
                                                                    key={eIdx} 
                                                                    href={`mailto:${email.toLowerCase()}`}
                                                                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl text-rose-300 font-bold text-sm transition-all flex items-center gap-2"
                                                                >
                                                                    {email.toLowerCase()}
                                                                    <ArrowRight size={14} className="opacity-50" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            */}
                                        </div>
                                    </div>
                                );
                            })}

                            {vacancies.length === 0 && !loading && (
                                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <div className="mb-4 text-slate-300 flex justify-center">
                                        <Megaphone size={48} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No Current Openings</h3>
                                    <p className="text-slate-500">Check back later for new opportunities or follow us on social media.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div >
            <Footer />
        </div >
    );
}
