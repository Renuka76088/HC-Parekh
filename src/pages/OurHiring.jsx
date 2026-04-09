import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Megaphone, Instagram, Facebook, Linkedin, Youtube, Mail, Info } from 'lucide-react';

export default function OurHiring() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const platforms = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "text-blue-700",
            link: ""
        },
        { name: "Facebook", icon: Facebook, color: "text-blue-600" },
        { name: "Instagram", icon: Instagram, color: "text-pink-600" },
        { name: "Youtube", icon: Youtube, color: "text-red-600" },
        { name: "Other Platforms", icon: Megaphone, color: "text-slate-600" }
    ];

    const sectors = [
        "Textile & Garments",
        "Pulp & Paper Industry",
        "Medical & Healthcare",
        "F.M.C.G.",
        "Industrial & Corporate Projects",
        "Tenders and M.O.U."
    ];

    const hiringPositions = [
        {
            id: "on-payroll",
            type: "full-time",
            badge: "On Pay Roll",
            title: "On Pay Roll",
            description: "We are currently hiring talented professionals for the following positions:",
            positions: [
                "Project Assistants",
                "Fashion Designers",
                "Quality Associates (Fabrics)",
                "Customer Relationship Associates",
                "Accountants",
                "Delivery Boy"
            ],
            contactNote: "For further details, contact us",
            email: "hemant.parekh2012@gmail.com"
        },
        // {
        //     id: "hr-manager",
        //     type: "full-time",
        //     badge: "Management",
        //     title: "HR Manager",
        //     location: "Bengaluru, Karnataka",
        //     ctc: "Rs. 5.25 L.P.A.",
        //     essentialCriteria: [
        //         "Preferably MBA (HR) or any Graduate with at least 8 years net experience in End-To-End recruitment of Technical and Non-Technical Manpower in different profiles in any Manufacturing Industries or Corporate Sectors (other than OPC).",
        //         "Should have proficiency in English, Hindi and Regional language equally.",
        //         "Should be acquainted with official Tour & Travel within India."
        //     ],
        //     responsibilities: [
        //         "End-to-End Recruitment of Technical and Non-Technical Manpower (CV Invitation, Short-listing, 3-Round Interviews, On-boarding & Induction).",
        //         "Pay-Roll Management, Leave, EPF, ESI, Labour Law Compliance.",
        //         "Re-Location of Manpower, Relieving and Full & Final Settlement.",
        //         "Plan, coordinate and organize campus Interviews in different Colleges and Universities as and when and where required."
        //     ],
        //     notes: [
        //         "This is not a Placement Consultancy.",
        //         "Hiring process opens till appointment of the deserving candidate by 3-Round interview."
        //     ],
        //     email: "hemant.parekh2012@gmail.com"
        // },
        {
            id: "influencer",
            type: "campaign",
            badge: "Social Media",
            title: "Social Media Influencer ( On Contract)",
            subtitle: "Brand Promotion",
            description: "Experienced Social Media Influencers irrespective of locations are required for our long-term Online Business Advertisements (informative) on their own social media platforms for our tangible and intangible products.",
            sectors: sectors,
            platforms: platforms,
            submissionDetails: [
                "Quotation must be in PDF format.",
                "Excludes 3rd Party & GST.",
                "Include Payment Terms & Conditions."
            ],
            importantNotes: [
                "Influencers are not responsible for marketing our products.",
                "We will provide well-designed advertisements ready for posting."
            ],
            email: "hemant.parekh2012@gmail.com"
        }
    ];


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
                        <div className="space-y-20">
                            {hiringPositions.map((job) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    {/* Job Badge */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                            {job.badge}
                                        </span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
                                            {job.type.replace('-', ' ')}
                                        </span>
                                    </div>

                                    {/* Job Title & Meta */}
                                    <div className="mb-8">
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                                            {job.title}
                                        </h2>
                                        {job.subtitle && (
                                            <p className="text-xl text-indigo-600 font-bold mb-4">{job.subtitle}</p>
                                        )}
                                        <div className="flex flex-wrap gap-4 text-slate-600 font-medium">
                                            {job.location && (
                                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-sm">
                                                    <Info size={14} className="text-slate-400" /> {job.location}
                                                </span>
                                            )}
                                            {job.ctc && (
                                                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm border border-green-100">
                                                    <span className="font-bold">CTC:</span> {job.ctc}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Job Content Sections */}
                                    <div className="grid lg:grid-cols-12 gap-10">
                                        {/* Left Side - Positions List */}
                                        <div className={`${job.positions ? 'lg:col-span-6' : 'lg:col-span-8'} space-y-8`}>
                                            {/* On PayRoll Specific Content */}
                                            {job.positions && (
                                                <div>
                                                    <p className="text-lg leading-relaxed text-slate-700 mb-6">
                                                        {job.description}
                                                    </p>
                                                    <div className="space-y-3">
                                                        {job.positions.map((position, idx) => (
                                                            <div key={idx} className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-purple-200 transition-colors">
                                                                <span className="text-purple-600 font-bold text-lg flex-shrink-0 mt-1">
                                                                    {idx + 1})
                                                                </span>
                                                                <span className="text-slate-700 font-semibold">{position}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {job.contactNote && (
                                                        <p className="text-lg font-semibold text-slate-900 mt-8 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                                                            {job.contactNote}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* HR Manager Specific Content */}
                                            {job.essentialCriteria && (
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                                                        Essential Criteria
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {job.essentialCriteria.map((item, idx) => (
                                                            <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
                                                                <span className="text-purple-600 font-bold">•</span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {job.responsibilities && (
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                        <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                                                        Job Responsibilities
                                                    </h3>
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {job.responsibilities.map((res, idx) => (
                                                            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                                                                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                                                                    {res}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Influencer Specific Content */}
                                            {job.description && !job.positions && (
                                                <div className="prose prose-slate max-w-none">
                                                    <p className="text-lg leading-relaxed text-slate-700">
                                                        {job.description}
                                                    </p>
                                                </div>
                                            )}

                                            {job.sectors && (
                                                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                                    <h3 className="font-bold text-slate-900 mb-4 text-lg">Target Sectors</h3>
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {job.sectors.map((sector, idx) => (
                                                            <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-purple-100 shadow-sm">
                                                                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                                                                    {idx + 1}
                                                                </span>
                                                                <span className="text-slate-700 font-medium">{sector}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side - Contact Card for PayRoll */}
                                        {job.positions && (
                                            <div className="lg:col-span-6 space-y-6">
                                                {/* Contact Card */}
                                                <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-2xl">
                                                    <div className="relative z-10">
                                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                            <Mail className="text-purple-400" size={20} /> Contact Us
                                                        </h3>
                                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                                            Submit your resume and inquire about the available positions.
                                                        </p>
                                                        <div className="mt-6 pt-6 border-t border-white/10">
                                                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-2">
                                                                Contact:
                                                            </span>
                                                            <a
                                                                href={`mailto:${job.email}`}
                                                                className="text-sm font-black text-purple-400 hover:text-white transition-colors break-all underline decoration-purple-600 underline-offset-4"
                                                            >
                                                                {job.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Right Side - Influencer Platforms & Contact */}
                                        {!job.positions && (
                                            <div className="lg:col-span-4 space-y-6">
                                            {/* Influencer Platforms */}
                                            {job.platforms && (
                                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                    <h3 className="font-bold text-slate-900 mb-4 text-lg text-center lg:text-left">Required Platforms</h3>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {job.platforms.map((p, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                                                            >
                                                                <p.icon size={20} className={p.color} />
                                                                <span className="font-semibold text-slate-700">{p.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Submission / Application Card */}
                                            <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-2xl">
                                                <div className="relative z-10">
                                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                        <Mail className="text-purple-400" size={20} /> {job.positions ? "Contact Us" : "Apply Now"}
                                                    </h3>

                                                    {job.submissionDetails ? (
                                                        <div className="space-y-4">
                                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                                Submit your **Quotation** in PDF format including payment terms.
                                                            </p>
                                                            <ul className="space-y-2 text-xs text-slate-400">
                                                                {job.submissionDetails.map((detail, idx) => (
                                                                    <li key={idx} className="flex gap-2">
                                                                        <span className="text-purple-400">•</span> {detail}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                                            {job.positions ? "Submit your resume and inquire about the available positions." : "Please send your updated Resume/CV to the email below. Mention the position in the subject line."}
                                                        </p>
                                                    )}

                                                    <div className="mt-6 pt-6 border-t border-white/10">
                                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-2">
                                                            {job.positions ? "Contact:" : "Email Quotation To:"}
                                                        </span>
                                                        <a
                                                            href={`mailto:${job.email}`}
                                                            className="text-sm font-black text-purple-400 hover:text-white transition-colors break-all underline decoration-purple-600 underline-offset-4"
                                                        >
                                                            {job.email}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                                            </div>

                                            {/* Important/Note Section */}
                                            {(job.importantNotes || job.notes) && (
                                                <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                                                    <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold">
                                                        <Info size={18} />
                                                        <span>Note</span>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {(job.importantNotes || job.notes).map((note, idx) => (
                                                            <li key={idx} className="text-xs text-amber-700 leading-relaxed flex gap-2">
                                                                <span className="text-amber-400 flex-shrink-0">•</span>
                                                                {note}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        )}
                                    </div>

                                    {/* Separator for multiple listings */}
                                    <div className="mt-20 border-t border-slate-100 last:hidden"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
            </div >
            <Footer />
        </div >
    );
}
