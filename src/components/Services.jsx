import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data';

export default function Services() {
  return (
    <div className="py-8">
      <div className="flex items-end justify-between mb-8 px-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Our Expertise</h3>
          <p className="text-slate-500 text-sm mt-1">Comprehensive solutions for industrial growth.</p>
        </div>
        <Link to="/services" className="hidden md:block text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors">See All Services →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => {
          const CardContent = () => (
            <>
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                <service.icon size={24} />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-rose-700 transition-colors">{service.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.desc}
              </p>
            </>
          );
          
          return service.link ? (
            <Link to={service.link} key={idx} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 block h-full">
              <CardContent />
            </Link>
          ) : (
            <div key={idx} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-full">
              <CardContent />
            </div>
          );
        })}
      </div>
    </div>
  );
}