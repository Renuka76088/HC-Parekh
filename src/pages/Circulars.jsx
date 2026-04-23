import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, ChevronRight, X, Mail, Printer, User } from 'lucide-react';
import { corporateApi } from '../api';

const Circulars = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCircular, setSelectedCircular] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCirculars();
  }, []);

  const fetchCirculars = async () => {
    try {
      const res = await corporateApi.getCirculars();
      setCirculars(res.data || []);
    } catch (err) {
      console.error('Error fetching circulars:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCirculars = circulars.filter(c => 
    c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.circularNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <span className="bg-rose-100 text-rose-700 p-2 rounded-lg">
                  <FileText size={24} />
                </span>
                <span className="text-rose-700 font-bold tracking-wider text-sm uppercase">Official Publications</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                OFFICIAL <span className="text-rose-600">CIRCULARS</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-2xl">
                Stay updated with the latest official announcements and directives from HC Parekh & Associates.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-10 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search circulars by subject or number..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-rose-50 focus:border-rose-300 transition-all font-medium text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Circulars Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-600 border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredCirculars.map((c, index) => (
                    <motion.div
                      key={c._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedCircular(c)}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                          <Mail size={24} />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">{c.circularNo}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{c.circularDate}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-black text-slate-800 tracking-tight mb-4 line-clamp-2 flex-1 relative z-10">
                        {c.subject}
                      </h3>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 relative z-10">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <User size={14} /> View Details
                        </span>
                        <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-rose-600 group-hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && filteredCirculars.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium italic">No circulars matching your search were found.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {/* Circular Detail Modal (Same logic as before, just styled to match) */}
      <AnimatePresence>
        {selectedCircular && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCircular(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none uppercase">Official Circular</h3>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">HC Parekh & Associates</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCircular(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-1 bg-white">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Circular No.</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCircular.circularNo}</p>
                    </div>
                    <div className="space-y-1 md:text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Date</p>
                      <p className="text-sm font-bold text-slate-800">{selectedCircular.circularDate}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-black text-rose-600 uppercase tracking-[0.2em] mb-2">Subject</p>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-snug">
                        {selectedCircular.subject}
                      </h2>
                    </div>
                    {selectedCircular.kindAttention && (
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Kind Attention</p>
                        <p className="text-sm font-bold text-slate-700">{selectedCircular.kindAttention}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 min-h-[300px]">
                    <div 
                      className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-800 prose-headings:font-black prose-strong:text-slate-800"
                      dangerouslySetInnerHTML={{ __html: selectedCircular.content }}
                    />
                    
                    <div className="mt-16 pt-8 border-t border-slate-50">
                      <p className="text-sm font-bold text-slate-800 mb-1">Sd/-</p>
                      <p className="text-sm font-black text-rose-600 uppercase tracking-widest">(HC PAREKH)</p>
                      <p className="text-xs font-bold text-slate-500 mt-1 italic">For & On behalf of</p>
                      <p className="text-sm font-black text-slate-800 tracking-tight mt-1">HC PAREKH & ASSOCIATES</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-center shrink-0">
                <button
                  onClick={() => window.print()}
                  className="px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                  <Printer size={18} /> Print Circular
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}} />
    </div>
  );
};

export default Circulars;
