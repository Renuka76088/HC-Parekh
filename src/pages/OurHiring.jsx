import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Megaphone, Instagram, Facebook, Linkedin, Youtube, Mail, Info } from 'lucide-react';

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
                        <div className="space-y-24">
                            {vacancies.map((job, idx) => {
                                const platformIcons = {
                                    linkedin: <Linkedin size={18} className="text-[#0077b5] shrink-0" />,
                                    facebook: <Facebook size={18} className="text-[#1877f2] shrink-0" />,
                                    instagram: <Instagram size={18} className="text-[#e4405f] shrink-0" />,
                                    youtube: <Youtube size={18} className="text-[#ff0000] shrink-0" />
                                };

                                const getIcon = (plat) => {
                                    const p = plat.toLowerCase();
                                    if (p.includes('linkedin')) return platformIcons.linkedin;
                                    if (p.includes('facebook')) return platformIcons.facebook;
                                    if (p.includes('instagram')) return platformIcons.instagram;
                                    if (p.includes('youtube') || p.includes('tube')) return platformIcons.youtube;
                                    return <Megaphone size={18} className="text-slate-400 shrink-0" />;
                                };

                                const targetSectors = Array.isArray(job.targetSectors) ? job.targetSectors : (typeof job.targetSectors === 'string' ? job.targetSectors.split('\n') : []);
                                const requiredPlatforms = Array.isArray(job.requiredPlatforms) ? job.requiredPlatforms : (typeof job.requiredPlatforms === 'string' ? job.requiredPlatforms.split('\n') : []);

                                const topBadgeText = job.type || 'HIRING';
                                const campaignBadge = job.campaign ? job.campaign : 'OFFICIAL';

                                return (
                                    <div key={job._id || idx} className="w-full">
                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <span className="bg-[#0f172a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                {topBadgeText}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[#64748b] text-[11px] font-bold uppercase tracking-widest">
                                                {job.campaignHeading || 'CAMPAIGN'} : {campaignBadge}
                                            </span>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h2 className="text-2xl md:text-3xl leading-tight font-bold text-[#0f172a] mb-2">
                                            {job.title} {!job.title?.toLowerCase().includes('contract') && job.type === 'On Contract' ? '(On Contract)' : ''}
                                        </h2>
                                        {job.campaign && (
                                            <h3 className="text-lg font-bold text-[#6366f1] mb-2">{job.campaign}</h3>
                                        )}
                                        <p className="text-slate-400 text-sm font-medium mb-8">Date of Publish {formatDate(job.createdAt)}</p>

                                        {/* Description */}
                                        <div className="mb-10 min-h-[60px]">
                                            <p className="text-[1.1rem] text-[#475569] leading-relaxed max-w-4xl">
                                                {job.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-8 mt-10">
                                            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 items-stretch">
                                                {/* Left Column: Sectors */}
                                                {targetSectors.length > 0 && (
                                                    <div className={`bg-[#fdfaff] p-6 lg:p-8 rounded-[2.5rem] border border-[#f3e8ff] ${requiredPlatforms.length === 0 ? '2xl:col-span-2' : ''}`}>
                                                        <h3 className="text-[1.25rem] font-bold text-[#0f172a] mb-8 flex items-center gap-3">
                                                            <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                                                            {job.targetSectorsHeading || 'Target Sectors'}
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {targetSectors.filter(t => typeof t === 'string' ? t.trim() : t).map((sector, sIdx) => (
                                                                <div key={sIdx} className="bg-white rounded-[1.25rem] p-4 flex items-center gap-4 shadow-sm border border-[#f1f5f9] hover:shadow-md transition-shadow min-w-0">
                                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                                                        <Megaphone className="text-slate-400" size={18} />
                                                                    </div>
                                                                    <span className="text-[#334155] font-bold text-[15px] min-w-0">{typeof sector === 'string' ? sector.trim() : sector}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Required Platforms */}
                                                {requiredPlatforms.length > 0 && (
                                                    <div className={`bg-[#f8fafc] p-6 lg:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 ${targetSectors.length === 0 ? '2xl:col-span-2' : ''}`}>
                                                        <h3 className="text-[1.25rem] font-bold text-[#0f172a] mb-8 flex items-center gap-3">
                                                            <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                                                            {job.requiredPlatformsHeading || 'Required Platforms'}
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {requiredPlatforms.filter(p => typeof p === 'string' ? p.trim() : p).map((plat, pIdx) => (
                                                                <div key={pIdx} className="bg-white px-5 py-4 rounded-[1.25rem] border border-[#f1f5f9] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow min-w-0">
                                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                                                        {getIcon(typeof plat === 'string' ? plat : '')}
                                                                    </div>
                                                                    <span className="text-[#334155] font-bold text-[15px] min-w-0">{typeof plat === 'string' ? plat.trim() : plat}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Apply Now - Full Width Banner */}
                                            <div className="bg-[#0f172a] md:bg-gradient-to-br md:from-[#1e1b4b] md:via-[#0f172a] md:to-[#1e1b4b] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                                                {/* Decorative Elements */}
                                                <div className="hidden md:block absolute top-[-20%] right-[-10%] w-80 h-80 bg-purple-600 blur-[100px] opacity-20 rounded-full group-hover:opacity-30 transition-opacity" />
                                                <div className="hidden md:block absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-indigo-600 blur-[100px] opacity-20 rounded-full group-hover:opacity-30 transition-opacity" />

                                                <div className="relative z-10 flex flex-col gap-8 md:gap-10">
                                                    <div>
                                                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                                                            <div className="md:bg-white/10 md:p-3 rounded-2xl md:backdrop-blur-sm md:border md:border-white/10">
                                                                <Mail className="text-[#c084fc]" size={28} />
                                                            </div>
                                                            <h3 className="text-2xl md:text-4xl font-bold text-white">
                                                                {job.applyNowTitle || 'Apply Now'}
                                                            </h3>
                                                        </div>
                                                        <p className="text-[#cbd5e1] text-base md:text-xl leading-relaxed font-normal">
                                                            {job.quotationInstruction || "Submit your Quotation in PDF format including payment terms."}
                                                        </p>
                                                    </div>

                                                    <div className="pt-8 md:pt-10 border-t border-white/10">
                                                        <p className="text-[10px] md:text-[12px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                                                            {job.emailHeading || 'Email To:'}
                                                        </p>
                                                        <div className="flex flex-col md:flex-wrap md:flex-row gap-4">
                                                            {(job.emails && job.emails.length > 0 ? job.emails : []).map((email, eIdx) => (
                                                                <a key={eIdx} href={`mailto:${email.toLowerCase()}`} className="group/email flex items-center gap-4 md:bg-white/5 md:hover:bg-white/10 md:px-6 md:py-4 md:rounded-2xl md:border md:border-white/5 md:hover:border-white/20 transition-all duration-300">
                                                                    <span className="text-[#d8b4fe] font-bold text-base md:text-xl break-all underline md:no-underline underline-offset-4 decoration-[#c084fc]/40">
                                                                        {email.toLowerCase()}
                                                                    </span>
                                                                    <div className="hidden md:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center group-hover/email:bg-[#c084fc] transition-colors">
                                                                        <Mail size={18} className="text-white" />
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
