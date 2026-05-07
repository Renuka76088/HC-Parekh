import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, MapPin, CheckCircle } from 'lucide-react';

import { corporateApi, contentApi } from '../api';

export default function ProjectNotice() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [notices, setNotices] = useState([]);
    const [settings, setSettings] = useState({
        providerTitle: 'Interested Service Providers',
        providerDescription: 'Companies (other than OPC) which have prescribed different clear Price-Plans and Service-Plans may contact us “in-person” for a Face-To-Face Meeting with HC Parekh or any of his Authorized Officials or Authorized Agencies of HC Parekh & Associates, with a prior appointment, at the respective Location(s).',
        noteTitle: 'Note :',
        noteDescription: 'We are not End-users. We supply the Business on a Retainership. Our consultation charges are applicable.'
    });
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [noticesRes, settingsRes] = await Promise.all([
                    corporateApi.getNotices(),
                    contentApi.getNoticeSettings()
                ]);
                setNotices(noticesRes.data);
                if (settingsRes.data) setSettings(settingsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
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
                                <span className="bg-rose-100 text-rose-600 p-2 rounded-lg">
                                    <FileText size={24} />
                                </span>
                                <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">Official Announcement</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                PROJECT NOTICE
                            </h1>
                            <p className="text-xl text-slate-600 font-medium">
                                Information Technology <span className="text-slate-400">|</span> F.Y. 2026-27
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-12">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-slate-500 font-bold">Loading notices...</p>
                                </div>
                            ) : (
                                <>
                                    {notices.map((notice, nIdx) => (
                                        <div key={notice._id || nIdx} className="space-y-8 animate-in fade-in duration-500">
                                            <div className="prose prose-slate max-w-none">
                                                <h2 className="text-xl font-bold text-slate-900 border-l-4 border-rose-600 pl-4">{notice.title}</h2>
                                                <div 
                                                    className="text-lg leading-relaxed text-slate-700 mt-4 quill-content"
                                                    dangerouslySetInnerHTML={{ __html: (notice.description || '').replace(/&nbsp;/g, ' ') }}
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                        <MapPin size={18} className="text-rose-500" /> {notice.projectLocationsHeading || 'Project Locations'}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(Array.isArray(notice.projectLocations) ? notice.projectLocations : (notice.projectLocations || "Global").split(',')).map((loc, idx) => (
                                                            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-slate-600 shadow-sm border border-slate-100">
                                                                {typeof loc === 'string' ? loc.trim() : loc}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-[#f8fafc] p-8 rounded-[2rem] border border-[#f1f5f9] shadow-sm">
                                                    <h3 className="text-[1.25rem] font-bold text-[#0f172a] mb-6">{notice.targetSectorsHeading || 'Target Sectors'}</h3>
                                                    <div className="space-y-4">
                                                        {(Array.isArray(notice.targetSectors) ? notice.targetSectors : (notice.targetSectors || "").split(',')).filter(s => typeof s === 'string' ? s.trim() : s).map((sector, idx) => (
                                                            <div key={idx} className="flex items-start gap-4">
                                                                <div className="w-2 h-2 rounded-full bg-[#c81e1e] shrink-0 mt-2.5" />
                                                                <span className="text-[#0f172a] font-medium text-[17px] leading-tight">
                                                                    {typeof sector === 'string' ? sector.trim() : sector}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {(!notice.targetSectors || (Array.isArray(notice.targetSectors) && notice.targetSectors.length === 0)) && (
                                                            <span className="text-slate-400 italic text-sm">Multi-sector</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {notice.ourRequirements && (
                                                <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100">
                                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{notice.ourRequirementsHeading || 'Our Requirements'}</h3>
                                                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                                        {(Array.isArray(notice.ourRequirements) ? notice.ourRequirements : notice.ourRequirements.split('\n')).filter(r => typeof r === 'string' ? r.trim() : r).map((req, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <CheckCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                                                                <span className="text-slate-700 font-medium">{typeof req === 'string' ? req.trim() : req}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="h-px bg-slate-100 my-8" />
                                        </div>
                                    ))}

                                    {notices.length === 0 && (
                                        <p className="text-center text-slate-400 py-12 italic">Currently, there are no project notices published for F.Y. 2026-27.</p>
                                    )}

                                    {/* Footer Note */}
                                    <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 blur-[80px] opacity-20 rounded-full"></div>
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold mb-3">{settings.providerTitle}</h3>
                                            <div 
                                                className="text-slate-300 leading-relaxed mb-6 quill-content w-full"
                                                dangerouslySetInnerHTML={{ __html: (settings.providerDescription || '').replace(/&nbsp;/g, ' ') }}
                                            />
                                            <Link to="/contact" className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
                                                Book Appointment
                                            </Link>
                                        </div>

                                        <div className="relative z-10 mt-10">
                                            <div className="mb-6 flex items-start gap-2">
                                                <span className="font-bold text-xl shrink-0">{settings.noteTitle}</span>
                                                <div 
                                                    className="text-slate-300 leading-relaxed quill-content"
                                                    dangerouslySetInnerHTML={{ __html: (settings.noteDescription || '').replace(/&nbsp;/g, ' ') }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
