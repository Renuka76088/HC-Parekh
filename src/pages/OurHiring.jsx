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
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">
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

                                const topBadgeText = job.campaign ? job.campaign.split(' ')[0] : (job.type || 'HIRING');

                                return (
                                    <div key={job._id || idx} className="w-full">
                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <span className="bg-[#0f172a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                                {topBadgeText}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[#64748b] text-[11px] font-bold uppercase tracking-widest">
                                                {job.campaignHeading || 'CAMPAIGN'}
                                            </span>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h2 className="text-3xl md:text-[2.5rem] leading-tight font-black text-[#0f172a] mb-2">
                                            {job.title} {!job.title?.toLowerCase().includes('contract') && job.type === 'On Contract' ? '(On Contract)' : ''}
                                        </h2>
                                        {job.campaign && (
                                            <h3 className="text-lg font-bold text-[#6366f1] mb-8">{job.campaign}</h3>
                                        )}

                                        {/* Description */}
                                        <p className="text-[1.1rem] text-[#475569] leading-relaxed max-w-4xl mb-10">
                                            {job.description}
                                        </p>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                            {/* Left Column: Sectors */}
                                            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                                                {targetSectors.length > 0 && (
                                                    <div className="bg-[#fdfaff] p-6 lg:p-8 rounded-[2rem] border border-[#f3e8ff]">
                                                        <h3 className="text-[1.15rem] font-bold text-[#0f172a] mb-6">{job.targetSectorsHeading || 'Target Sectors'}</h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {targetSectors.filter(t => typeof t === 'string' ? t.trim() : t).map((sector, sIdx) => (
                                                                <div key={sIdx} className="bg-white rounded-[1rem] p-3 flex items-center gap-4 shadow-sm border border-[#f8fafc]">
                                                                    <div className="w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center shrink-0">
                                                                        <span className="text-[#9333ea] font-black text-[13px]">{sIdx + 1}</span>
                                                                    </div>
                                                                    <span className="text-[#334155] font-semibold text-[15px]">{typeof sector === 'string' ? sector.trim() : sector}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column: Platforms, Apply, Note */}
                                            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                                                
                                                {/* Required Platforms */}
                                                {requiredPlatforms.length > 0 && (
                                                    <div className="bg-[#f8fafc] p-6 lg:p-8 rounded-[2rem] shadow-sm">
                                                        <h3 className="text-[1.15rem] font-bold text-[#0f172a] mb-6">{job.requiredPlatformsHeading || 'Required Platforms'}</h3>
                                                        <div className="flex flex-col gap-3">
                                                            {requiredPlatforms.filter(p => typeof p === 'string' ? p.trim() : p).map((plat, pIdx) => (
                                                                <div key={pIdx} className="bg-white px-5 py-3.5 rounded-[1.25rem] border border-[#f1f5f9] flex items-center gap-4 shadow-sm">
                                                                    {getIcon(typeof plat === 'string' ? plat : '')}
                                                                    <span className="text-[#334155] font-semibold text-[15px]">{typeof plat === 'string' ? plat.trim() : plat}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Apply Now */}
                                                <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 blur-[80px] opacity-20 rounded-full" />
                                                    <div className="relative z-10">
                                                        <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                                                            <Mail className="text-[#c084fc]" size={24} /> {job.applyNowTitle || 'Apply Now'}
                                                        </h3>
                                                        <p className="text-[#cbd5e1] text-[15px] leading-relaxed mb-6">
                                                            {job.quotationInstruction || "Submit your Quotation in PDF format including payment terms."}
                                                        </p>
                                                        

                                                        <div className="pt-6 border-t border-white/10">
                                                            <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-widest mb-2">{job.emailHeading || 'Email Quotation To:'}</p>
                                                            <div className="flex flex-col gap-2">
                                                                {(Array.isArray(job.emails) && job.emails.length > 0 ? job.emails : ['hemant.parekh2012@gmail.com']).map((email, eIdx) => (
                                                                    <a key={eIdx} href={`mailto:${email}`} className="inline-block text-[#d8b4fe] font-black text-[17px] underline decoration-[#c084fc]/40 xl:no-underline xl:hover:underline underline-offset-4 hover:text-white transition-colors break-all">
                                                                        {email}
                                                                    </a>
                                                                ))}
                                                            </div>
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
