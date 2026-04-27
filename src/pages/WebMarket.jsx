import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, Briefcase, CheckCircle, ShieldCheck, Mail, Phone, Info, AlertCircle, ChevronRight, X } from 'lucide-react';
import { webMarketApi } from '../api';

const IT_SERVICES = [
  'Website Development',
  'Digital Marketing',
  'Social Media Marketing',
  'Software Development',
  'Mobile App Development',
  'YouTube Marketing',
  'Influencer Services',
  'Others'
];

const MEMBERSHIPS = ['Eco', 'Silver Membership', 'Gold Membership', 'Platinum Membership'];

const WebMarket = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // null, 'end-user', or 'service-provider'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', address: '', businessAddress: '', contactNo: '', email: '',
    website: '', websiteUrl: '', category: 'Individual', natureOfBusiness: '',
    itServicesRequired: [], itServicesOffered: [], otherService: '', otherServices: '',
    tenureRequired: '', budget: '', technicalStaffCount: '', paymentTerms: '',
    membershipType: 'Eco', authorizedOfficial: '', assessCode: ''
  });

  const handleCheckbox = (service, field) => {
    setForm(prev => {
      const list = [...prev[field]];
      if (list.includes(service)) {
        return { ...prev, [field]: list.filter(s => s !== service) };
      } else {
        return { ...prev, [field]: [...list, service] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (activeTab === 'end-user') {
        await webMarketApi.submitEndUser(form);
      } else {
        await webMarketApi.submitServiceProvider(form);
      }

      // Trigger PHP email notification
      try {
        const fallbackMessage = activeTab === 'end-user' 
          ? `END-USER CLIENT ENQUIRY
----------------------------------------
Contact Number: ${form.contactNo}
Address: ${form.address || form.businessAddress}
Website URL: ${form.website || 'N/A'}

REQUIREMENTS
----------------------------------------
Category: ${form.category || 'N/A'}
Business Nature: ${form.natureOfBusiness || 'N/A'}
Budget: ${form.budget || 'N/A'}
Tenure: ${form.tenureRequired || 'N/A'}
IT Services Required: ${form.itServicesRequired.length > 0 ? form.itServicesRequired.join(', ') : 'None'}
Other Services: ${form.otherService || 'None'}

Membership Selected: ${form.membershipType}`
          : `SERVICE PROVIDER ENQUIRY
----------------------------------------
Contact Number: ${form.contactNo}
Address: ${form.address || form.businessAddress}
Website URL: ${form.websiteUrl || 'N/A'}

PROVIDER DETAILS
----------------------------------------
Staff Strength: ${form.technicalStaffCount || 'N/A'}
Payment Terms: ${form.paymentTerms || 'N/A'}
IT Services Offered: ${form.itServicesOffered.length > 0 ? form.itServicesOffered.join(', ') : 'None'}
Other Services: ${form.otherServices || 'None'}

Membership Selected: ${form.membershipType}`;

        const emailPayload = {
          name: form.name,
          email: form.email,
          subject: activeTab === 'end-user' ? 'webmarket_enduser' : 'webmarket_provider',
          message: fallbackMessage,
          webMarketData: {
            contact: form.contactNo,
            address: form.address || form.businessAddress,
            website: activeTab === 'end-user' ? form.website : form.websiteUrl,
            category: form.category || 'N/A',
            natureOfBusiness: form.natureOfBusiness || 'N/A',
            technicalStaffCount: form.technicalStaffCount || 'N/A',
            services: activeTab === 'end-user' ? form.itServicesRequired.join(', ') : form.itServicesOffered.join(', '),
            otherServices: form.otherService || form.otherServices || 'None',
            budget: form.budget || 'N/A',
            tenure: form.tenureRequired || 'N/A',
            paymentTerms: form.paymentTerms || 'N/A',
            membership: form.membershipType
          }
        };
        await fetch('https://hcparekh.com/php/send_email.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload),
        });
      } catch (emailErr) {
        console.error("Email notification failed to send:", emailErr);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setActiveTab(null);
      }, 3000);
      setForm({
        name: '', address: '', businessAddress: '', contactNo: '', email: '',
        website: '', websiteUrl: '', category: 'Individual', natureOfBusiness: '',
        itServicesRequired: [], itServicesOffered: [], otherService: '', otherServices: '',
        tenureRequired: '', budget: '', technicalStaffCount: '', paymentTerms: '',
        membershipType: 'Eco', authorizedOfficial: '', assessCode: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please check your authorization codes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="container mx-auto flex gap-8 py-10 px-4 md:px-6 relative items-start">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

            {/* Main Branding Header */}
            {!activeTab && (
              <div className="p-10 md:p-16 text-center border-b border-slate-50">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                    <span className="text-black">HCP</span> <span className="text-blue-600">Web Market</span>
                  </h1>
                  <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    Choose your platform to get started. A secure gateway for IT solutions and professional service providers.
                  </p>
                </motion.div>
              </div>
            )}

            {/* Selection Screen */}
            {!activeTab ? (
              <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.button
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setActiveTab('end-user')}
                  className="group p-10 rounded-[3rem] bg-rose-50 border-2 border-rose-100 hover:border-rose-300 transition-all text-left space-y-6"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-rose-600 shadow-xl shadow-rose-200/50 group-hover:bg-rose-600 group-hover:text-white transition-all">
                    <User size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">End-User Clients</h3>
                    <p className="text-lg text-slate-600 font-medium mt-2 leading-relaxed">Post requirements and find the best IT agencies for your business needs.</p>
                  </div>
                  <div className="flex items-center gap-2 text-rose-600 font-black uppercase text-sm tracking-widest">
                    Open Form <ChevronRight size={20} />
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setActiveTab('service-provider')}
                  className="group p-10 rounded-[3rem] bg-blue-50 border-2 border-blue-100 hover:border-blue-300 transition-all text-left space-y-6"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-xl shadow-blue-200/50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Briefcase size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Service Providers</h3>
                    <p className="text-lg text-slate-600 font-medium mt-2 leading-relaxed">List your services and connect with global clients looking for IT expertise.</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-sm tracking-widest">
                    Open Form <ChevronRight size={20} />
                  </div>
                </motion.button>
              </div>
            ) : (
              /* Active Form View */
              <div className="p-8 md:p-16">
                <div className="flex items-center justify-between mb-12">
                  <button
                    onClick={() => setActiveTab(null)}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-xs tracking-widest transition-all"
                  >
                    <X size={20} className="p-1 bg-slate-100 rounded-full" /> Back to Selection
                  </button>
                  <div className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${activeTab === 'end-user' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                    {activeTab === 'end-user' ? 'End-User Registration' : 'Service Provider Registration'}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-16">
                  {/* Form Section: Basic Info */}
                  <div className="space-y-10">
                    <div className="border-l-4 border-rose-500 pl-6">
                      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                        {activeTab === 'end-user' ? 'Client Details' : 'Service Provider Details'}
                      </h2>
                      <p className="text-slate-500 font-medium mt-1">Please provide accurate information for verification.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest">
                          {activeTab === 'end-user' ? 'Full Name of the Client' : 'Business Name of the Service Provider'}
                        </label>
                        <input required className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none font-bold text-lg transition-all"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest">{activeTab === 'end-user' ? 'Complete Postal Address' : 'Registered Business Address'}</label>
                        <textarea required rows={3} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none font-bold text-lg transition-all resize-none"
                          value={activeTab === 'end-user' ? form.address : form.businessAddress}
                          onChange={e => setForm({ ...form, [activeTab === 'end-user' ? 'address' : 'businessAddress']: e.target.value })} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Contact Number</label>
                          <input required className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none font-bold text-lg transition-all"
                            value={form.contactNo} onChange={e => setForm({ ...form, contactNo: e.target.value })} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Official Email Address</label>
                          <input required type="email" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none font-bold text-lg transition-all"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Website URL {activeTab === 'end-user' && '(Optional)'}</label>
                        <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-rose-50 focus:border-rose-400 outline-none font-bold text-lg transition-all"
                          value={activeTab === 'end-user' ? form.website : form.websiteUrl}
                          onChange={e => setForm({ ...form, [activeTab === 'end-user' ? 'website' : 'websiteUrl']: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  {/* Form Section: Service Info */}
                  <div className="space-y-10">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                        {activeTab === 'end-user' ? 'Service Requirements' : 'Service Offered'}
                      </h2>
                      <p className="text-slate-500 font-medium mt-1">Select the services you are interested in.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {activeTab === 'end-user' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Client Category</label>
                            <select className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                              <option>Individual</option>
                              <option>Business</option>
                            </select>
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Nature of Profession</label>
                            <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                              value={form.natureOfBusiness} onChange={e => setForm({ ...form, natureOfBusiness: e.target.value })} />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Technical Staff Strength</label>
                          <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                            placeholder="e.g. 50+ Engineers"
                            value={form.technicalStaffCount} onChange={e => setForm({ ...form, technicalStaffCount: e.target.value })} />
                        </div>
                      )}

                      <div className="space-y-6">
                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest block">IT Services {activeTab === 'end-user' ? 'Required' : 'Offered'}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 bg-slate-50 border border-slate-200 rounded-[2rem]">
                          {IT_SERVICES.map(service => (
                            <label key={service} className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-white transition-all">
                              <input type="checkbox" className="w-6 h-6 rounded-lg text-rose-600 focus:ring-rose-200 border-slate-300 transition-all"
                                checked={form[activeTab === 'end-user' ? 'itServicesRequired' : 'itServicesOffered'].includes(service)}
                                onChange={() => handleCheckbox(service, activeTab === 'end-user' ? 'itServicesRequired' : 'itServicesOffered')} />
                              <span className="text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{service}</span>
                            </label>
                          ))}
                        </div>
                        {form[activeTab === 'end-user' ? 'itServicesRequired' : 'itServicesOffered'].includes('Others') && (
                          <input placeholder="Specify any other services required..." className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                            value={activeTab === 'end-user' ? form.otherService : form.otherServices}
                            onChange={e => setForm({ ...form, [activeTab === 'end-user' ? 'otherService' : 'otherServices']: e.target.value })} />
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-8">
                        {activeTab === 'end-user' ? (
                          <>
                            <div className="flex-1 space-y-3">
                              <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Service Tenure</label>
                              <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                                placeholder="e.g. 1 Year"
                                value={form.tenureRequired} onChange={e => setForm({ ...form, tenureRequired: e.target.value })} />
                            </div>
                            <div className="flex-1 space-y-3">
                              <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Client Budget</label>
                              <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                                placeholder="e.g. ₹5,00,000"
                                value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
                            </div>
                          </>
                        ) : (
                          <div className="col-span-2 space-y-3">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Payment Terms & Conditions</label>
                            <input className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg"
                              placeholder="Describe your standard payment structure..."
                              value={form.paymentTerms} onChange={e => setForm({ ...form, paymentTerms: e.target.value })} />
                          </div>
                        )}
                        <div className="col-span-2 space-y-3">
                          <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Membership Selection</label>
                          <select className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none font-bold text-lg appearance-none"
                            value={form.membershipType} onChange={e => setForm({ ...form, membershipType: e.target.value })}>
                            {MEMBERSHIPS.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Authorization Section */}
                  <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-rose-900/20">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600 blur-[150px] opacity-10 rounded-full -mr-64 -mt-64" />
                    <div className="relative z-10 space-y-6 md:space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-600/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                          <ShieldCheck className="w-10 h-10 md:w-12 md:h-12" />
                        </div>
                        <h4 className="text-2xl md:text-4xl font-black tracking-tight uppercase leading-tight">Security Authorization</h4>
                        <p className="text-slate-400 text-sm md:text-lg font-medium max-w-lg mx-auto leading-relaxed">Please enter your official Access Authorization codes to finalize submission.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">Authorized Official Name</label>
                          <input required className="w-full px-6 md:px-8 py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl focus:bg-white/10 focus:border-rose-500 outline-none font-black text-xl md:text-2xl transition-all text-center tracking-tight"
                            value={form.authorizedOfficial} onChange={e => setForm({ ...form, authorizedOfficial: e.target.value })} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">Access Code Number</label>
                          <input required className="w-full px-6 md:px-8 py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl focus:bg-white/10 focus:border-rose-500 outline-none font-black text-xl md:text-2xl transition-all text-center tracking-[0.1em] md:tracking-[0.2em]"
                            value={form.assessCode} onChange={e => setForm({ ...form, assessCode: e.target.value })} />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 md:gap-6 pt-4">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="submit" disabled={loading}
                          className="w-full max-w-md py-4 md:py-6 bg-rose-600 text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-base md:text-lg hover:bg-rose-700 transition-all shadow-2xl shadow-rose-900/60 disabled:opacity-50"
                        >
                          {loading ? 'Validating...' : 'Submit'}
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-[2rem] flex items-center gap-4 text-rose-500 justify-center">
                            <AlertCircle size={24} /> <span className="text-lg font-black uppercase tracking-tight">{error}</span>
                          </motion.div>
                        )}
                        {success && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] flex items-center gap-4 text-emerald-500 justify-center">
                            <CheckCircle size={24} /> <span className="text-lg font-black uppercase tracking-tight">Verified & Submitted Successfully!</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Static Footer Section */}
          <div className="mt-20 space-y-20 pb-20">
            <div className="text-center space-y-10">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Membership Facilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'ECO Membership', color: 'bg-[#f0f9ff] text-[#0369a1] border-[#e0f2fe]' },
                  { name: 'SILVER Membership', color: 'bg-[#ecfdf5] text-[#047857] border-[#d1fae5]' },
                  { name: 'GOLD Membership', color: 'bg-[#fffbeb] text-[#b45309] border-[#fef3c7]' },
                  { name: 'PLATINUM Membership', color: 'bg-[#fff1f2] text-[#be123c] border-[#ffe4e6]' }
                ].map(m => (
                  <div key={m.name} className={`p-10 rounded-[2.5rem] border-2 font-black uppercase text-sm tracking-widest shadow-lg shadow-slate-200/50 flex items-center justify-center text-center transition-transform hover:-translate-y-2 ${m.color}`}>
                    {m.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
                <div className="space-y-2">
                  <span className="text-rose-600 font-black uppercase tracking-widest text-xs">Guidelines</span>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Benefits & Facilities</h3>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">Please refer to our official Manual for complete compliance details.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-rose-600 font-black uppercase tracking-widest text-xs">Security</span>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Digital Register</h3>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed">HC Parekh & Associates safely maintains a Digital Register of all End-user Clients and Service Providers.</p>
                </div>
              </div>

              <div className="bg-slate-900 p-12 rounded-[3rem] shadow-xl text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="space-y-2">
                  <span className="text-rose-500 font-black uppercase tracking-widest text-xs">Assistance</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">DO & DONT'S</h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">Refer our Manual for essential safety and operational guidelines.</p>
                </div>
                <div className="space-y-4">
                  <span className="text-rose-500 font-black uppercase tracking-widest text-xs">Direct Support</span>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-4 group cursor-pointer bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-10 h-10 bg-rose-600/20 text-rose-500 rounded-xl flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shrink-0">
                        <Phone size={20} />
                      </div>
                      <span className="text-xl md:text-2xl font-black tracking-tight">6353778329</span>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="w-10 h-10 bg-white/10 text-rose-500 rounded-xl flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all shrink-0">
                        <Phone size={20} />
                      </div>
                      <span className="text-xl md:text-2xl font-black tracking-tight">8260232337</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default WebMarket;
