import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Award, ArrowRight } from 'lucide-react';
import { TOP_CATEGORIES } from '../data';

export default function Header({ toggleSidebar }) {
  return (
    <>
      {/* Top Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden text-slate-700 transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/">

              <div className="flex items-center gap-3">
                <div className="w-14 h-10 md:w-14 md:h-12 text-white flex items-center justify-center rounded-xl">
                  <span className="text-xl md:text-2xl font-black">
                    <img src="./images/HC logo.png" alt="" />
                  </span>
                </div>
                <div>
                  <h2 className="text-[14px] md:text-2xl font-black text-slate-900">HC Parekh & Associates</h2>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold tracking-wider">Project Consultant & Investor</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold tracking-wider">( Industrial & Corporate )</p>

                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2 border border-slate-200">
              <Award size={14} className="text-rose-600" />
              <span>Since 2007</span>
            </div>
            <Link to="/contact" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Need Project Consultant? <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Categories Scroller */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
        <div className="container mx-auto flex px-4 md:px-6 py-2 gap-2">
          {TOP_CATEGORIES.map((cat, idx) => (
            <button key={idx} className="whitespace-nowrap px-4 py-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-md hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}