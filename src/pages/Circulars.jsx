import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { corporateApi } from '../api';
import {
  FileText,
  Search,
  Calendar,
  ArrowRight,
  Printer,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Circulars = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState(null);

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      const res = await corporateApi.getCirculars();
      setCirculars(res.data || []);
    } catch (error) {
      console.error('Error fetching circulars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCirculars = circulars.filter(c =>
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.circularNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    if (dateString.includes('.')) return dateString;
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const truncateContent = (html, limit = 35) => {
    if (!html) return '';
    let text = html.replace(/<[^>]*>/g, ' ');
    text = decodeHtml(text);
    text = text.replace(/\s+/g, ' ').trim();
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="container mx-auto flex gap-8 py-6 px-4 md:px-6 relative items-start">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden no-print">
          <div className="p-8 md:p-12">

            {/* Header Section (Matching Corporate Tenders Style) */}
            <div className="border-b border-slate-200 pb-8 mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-rose-100 text-rose-700 p-2 rounded-lg">
                    <FileText size={24} />
                  </span>
                  <span className="text-rose-700 font-bold tracking-wider text-sm uppercase">Official Publication</span>
                </div>

                {/* Search Bar inside header area */}
                <div className="relative group max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder="Search circulars..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all text-sm font-medium text-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                OFFICIAL <span className="text-rose-600">CIRCULARS</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl">
                Stay updated with the latest official announcements and directives from <span className="whitespace-nowrap font-bold text-slate-900">HC Parekh & Associates</span>.
              </p>
            </div>

            {/* Circulars List Section */}
            <div className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 bg-slate-50 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : filteredCirculars.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {filteredCirculars.map((circular, index) => (
                      <motion.div
                        key={circular._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group bg-[#f8fafc] p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:border-rose-200 transition-all duration-300 hover:bg-white hover:shadow-lg"
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div className="w-14 h-14 bg-white text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                            <FileText size={24} />
                          </div>
  
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-rose-600 transition-colors mb-1">
                              {circular.subject}
                            </h3>
                            <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Official Document Attached</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <a
                              href={circular.pdfUrl || '#'}
                              target={circular.pdfUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                if (!circular.pdfUrl) {
                                  e.preventDefault();
                                  alert('No PDF document is attached to this circular.');
                                }
                              }}
                              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-xs font-black text-slate-900 rounded-xl hover:bg-slate-50 hover:border-rose-300 transition-all shadow-sm"
                            >
                              <ArrowRight size={16} />
                              VIEW
                            </a>
  
                            <a
                              href={circular.pdfUrl || '#'}
                              target={circular.pdfUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                if (!circular.pdfUrl) {
                                  e.preventDefault();
                                  alert('No PDF document is attached to this circular.');
                                }
                              }}
                              className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 text-white text-xs font-black rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                            >
                              <Printer size={16} />
                              PRINT
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">No circulars matching your search were found.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @media print {
          body, html { 
            visibility: hidden; 
            height: auto !important;
            overflow: visible !important;
          }
          #printable-area, #printable-area * { 
            visibility: visible;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Break the flexbox/fixed constraints for print */
          .fixed.inset-0 {
            position: absolute !important;
            display: block !important;
            overflow: visible !important;
            height: auto !important;
            z-index: auto !important;
            background: white !important;
          }
          #printable-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            display: block !important;
            margin: 0 !important;
            padding: 20px !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
          }
          /* Ensure the scrollable container expands fully */
          .custom-scrollbar, .overflow-y-auto, .flex-1 { 
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            display: block !important;
            flex: none !important;
            padding: 0 !important;
          }
          .no-print { 
            display: none !important; 
          }
          .circular-content, .circular-content * {
            word-break: normal !important;
            overflow-wrap: break-word !important;
            white-space: pre-wrap !important;
          }
        }

        .circular-content p {
          margin-bottom: 1.25rem;
          min-height: 1.2em;
          word-break: normal;
          overflow-wrap: break-word;
          line-height: 1.8;
        }
      `}} />
    </div>
  );
};

export default Circulars;
