import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Send, Loader2, CheckCircle2, XCircle, X } from 'lucide-react';

import { contentApi } from '../api';

const StatusModal = ({ isOpen, type, message, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>

                    <div className="mb-4 flex justify-center">
                        {type === 'success' ? (
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <CheckCircle2 size={40} />
                            </div>
                        ) : (
                            <div className="bg-red-100 p-3 rounded-full text-red-600">
                                <XCircle size={40} />
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {type === 'success' ? 'Thank You!' : 'Submission Failed'}
                    </h3>
                    <p className="text-slate-600 mb-6">{message}</p>

                    <button
                        onClick={onClose}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all ${type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default function Contact() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [contactData, setContactData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [modal, setModal] = useState({ isOpen: false, type: 'success', message: '' });

    React.useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const res = await contentApi.getContact();
            setContactData(res.data);
        } catch (err) {
            console.error('Error fetching contact:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const emailPayload = {
                to: 'hcparekh.associates@gmail.com',
                name: formState.name,
                email: formState.email,
                subject: `Contact Enquiry: ${formState.subject}`,
                message: `CONTACT ENQUIRY\n----------------------------------------\nName: ${formState.name}\nEmail: ${formState.email}\nTopic: ${formState.subject}\n\nMessage:\n${formState.message}`
            };

            const response = await fetch('https://hcparekh.com/php/send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailPayload),
            });

            const result = await response.json();

            if (result.success) {
                setModal({ isOpen: true, type: 'success', message: result.message });
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                setModal({ isOpen: true, type: 'error', message: result.message });
            }
        } catch (error) {
            setModal({ isOpen: true, type: 'error', message: "Connection error. Please check your internet or server." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            {/* Pop-up Modal */}
            <StatusModal
                isOpen={modal.isOpen}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ ...modal, isOpen: false })}
            />

            <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="container mx-auto flex gap-8 py-6 px-3 md:px-6 relative items-start">
                <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />

                <main className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative mb-10">

                    {/* Header Banner */}
                    <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 blur-[80px] opacity-20 rounded-full" />
                        <div className="relative z-10">
                            <h1 className="text-3xl md:text-5xl font-black mb-4">Get in Touch</h1>
                            <p className="text-slate-400 text-lg max-w-2xl">
                                We are here to assist you with your industrial consultation needs. Reach out to us for appointments or service Enquiry.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left Column: Contact Info */}
                        <div className="space-y-10">
                            {/* Locations */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                                    <MapPin className="text-rose-500" /> Our Locations
                                </h3>
                                <div className="space-y-4">
                                    {(contactData?.locations || [
                                        { city: "Bengaluru, Karnataka", address: "Laxmipuram, Bengaluru 560008" },
                                        { city: "Bhubaneswar, Odisha", address: "Sundarpada, Bhubaneswar 751002" },
                                        { city: "Nagpur (Maharashtra)", address: "" }
                                    ]).map((loc, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group"
                                        >
                                            <h4 className="font-bold text-slate-800 mb-1">{loc.city}</h4>
                                            {loc.address && <p className="text-slate-600 text-sm">{loc.address}</p>}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Emails */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                                    <Mail className="text-rose-500" /> Email Contacts
                                </h3>
                                <div className="grid gap-4">
                                    {[
                                        { type: "Appointment", email: contactData?.emails?.appointment || "appointment@hcparekh.com" },
                                        { type: "Project Services", email: contactData?.emails?.services || "services@hcparekh.com" }
                                    ].map((contact, idx) => (
                                        <a
                                            key={idx}
                                            href={`mailto:${contact.email}`}
                                            className="flex items-center gap-2 md:gap-4 p-5 px-2 rounded-xl border border-slate-100 bg-rose-50/50 hover:bg-rose-50 transition-colors group"
                                        >
                                            <div className="p-3 bg-white text-rose-600 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">{contact.type}</p>
                                                <p className="text-slate-700 font-medium break-all">{contact.email}</p>
                                            </div>
                                        </a>
                                    ))}
                                    <p className="text-xs text-slate-500 italic mt-2 ml-1">
                                        * Email is preferred for prior appointments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 md:p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Your Name</label>
                                        <input
                                            type="text" name="name" required disabled={isSubmitting}
                                            value={formState.name} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all disabled:opacity-50"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                        <input
                                            type="email" name="email" required disabled={isSubmitting}
                                            value={formState.email} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all disabled:opacity-50"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                                    <select
                                        name="subject" required disabled={isSubmitting}
                                        value={formState.subject} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all disabled:opacity-50"
                                    >
                                        <option value="">Select a Topic</option>
                                        <option value="appointment">Request Appointment</option>
                                        <option value="consultation">Project Consultation</option>
                                        <option value="service">Service Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Message</label>
                                    <textarea
                                        name="message" required disabled={isSubmitting}
                                        value={formState.message} onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none disabled:opacity-50"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:bg-slate-400"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Map Section */}

                    <div className="w-full h-[400px] border-t border-slate-100">

                        <iframe

                            title="Location Map"

                            width="100%"

                            height="100%"

                            frameBorder="0"

                            scrolling="no"

                            marginHeight="0"

                            marginWidth="0"

                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.3860579281427!2d85.8023868!3d20.204274299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a6665f625d33%3A0x969a2371bea26c6a!2sHi-tech%20Plaza%20Rd%2C%20Bhubaneswar%2C%20Odisha%20751002!5e1!3m2!1sen!2sin!4v1769839336871!5m2!1sen!2sin"

                            className="w-full h-full"

                        ></iframe>

                    </div>


                </main>
            </div>
            <Footer />
        </div>
    );
}