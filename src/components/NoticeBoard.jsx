import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { NOTICES } from '../data';

export default function NoticeBoard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden h-full flex flex-col">
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-600 rounded-lg animate-pulse">
             <Bell size={16} fill="currentColor" />
          </div>
          <span className="font-bold tracking-wide text-sm uppercase">Our Network</span>
        </div>
        <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded border border-white/10">LIVE UPDATES</span>
      </div>
      
      <div className="p-2 overflow-y-auto max-h-[400px] custom-scrollbar flex-1 bg-slate-50/50">
        <div className="space-y-3 p-2">
          {NOTICES.map((note, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-100 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">{note.date}</span>
                 {note.urgent && <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold border border-red-100">URGENT</span>}
              </div>
              <a 
                href={`https://${note.text}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <p className="text-sm text-[#800000] font-black leading-snug group-hover:text-[#a52a2a] transition-colors tracking-tight mb-1">
                  {note.title}
                </p>
                <p className="text-[11px] text-blue-600 font-bold group-hover:underline">
                  {note.text}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="p-3 bg-white border-t border-slate-100 text-center">
        <button className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline">View Archive</button>
      </div>
    </div>
  );
}