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
                                                {job.type && job.type !== 'nil/nothing' && (
                                                    <span className="bg-[#991b1b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                        {job.type}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-500 font-medium mb-6">
                                                Date of Publish {formatDate(job.createdAt)}.
                                            </p>

                                            {/* Job Description Section */}
                                            <div className="mb-10">
                                                <h4 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                                                    {job.descriptionHeading || 'JOB DESCRIPTION'}
                                                </h4>
                                                <div 
                                                    className="quill-content text-slate-600 font-medium leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: job.description.replace(/&nbsp;/g, ' ') }}
                                                />
                                            </div>

                                            {/* Quotation Emails */}
                                            <div className="mb-10">
                                                <h4 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-3">
                                                    {job.emailHeading || 'QUOTATION EMAILS'}
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                                                    {(job.emails || []).map((email, eIdx) => (
                                                        <React.Fragment key={eIdx}>
                                                            <a href={`mailto:${email.toLowerCase()}`} className="text-[1.1rem] font-bold text-[#2563eb] hover:underline underline-offset-4 decoration-[#2563eb]/30 transition-all">
                                                                {email.toLowerCase()}
                                                            </a>
                                                            {eIdx < job.emails.length - 1 && <span className="text-[#2563eb] font-bold">,</span>}
                                                        </React.Fragment>
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
