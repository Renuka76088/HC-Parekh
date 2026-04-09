import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, Calendar, Box, Scissors, Truck, Wallet } from 'lucide-react';

export default function CorporateTenders() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const tenderDetails = [
        { label: "Name of Work", value: "Double Bedsheets, Pillowcover Stitching, Packing", icon: FileText },
        { label: "Quantity", value: "30,000 Sets per EOI (1 Set = 1 Double Bedsheet + 2 Pillowcovers)", icon: Box },
        { label: "Tenure", value: "01 Year", icon: Calendar },
    ];

    const specs = [
        { label: "Double Bedsheets", value: '90” x 100”' },
        { label: "Pillowcover", value: '18” x 24”' },
        { label: "Inner Lid", value: '6”' },
    ];

    const technicalDetails = [
        { label: "Stitching Quality", value: "Double lined Simple stitch OR Single lined zigzag Stitch", icon: Scissors },
        { label: "Thread", value: "Moon Brand or any equivalent Brand", icon: Scissors },
        { label: "Fabrics Issued", value: "Pure Fine Cotton, Printed, 144 TC and above (Supplied to Tailoring Agencies)", icon: Box },
        { label: "Packing Size", value: 'Corrugated Box, 3-Ply, Laminated, Multi-colour (14” x 11” x 1.5“)', icon: Box },
    ];

    const terms = [
        { label: "Transportation", value: "To be borne by the Company upto Transporters. Local Transport to be borne by the Tailoring Agency.", icon: Truck },
        { label: "Payment Terms", value: "50% Advance with each W.O. | 50% on Inspection and L.R.", icon: Wallet },
    ];

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
                                <span className="bg-amber-100 text-amber-700 p-2 rounded-lg">
                                    <FileText size={24} />
                                </span>
                                <span className="text-amber-700 font-bold tracking-wider text-sm uppercase">Expression of Interest</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
                                CORPORATE TENDERS
                            </h1>
                            <p className="text-xl text-slate-600 font-medium">
                                ( At present, No EOI Published)
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-10">

                            {/* Introduction */}
                            <div className="prose prose-slate max-w-none">
                                <p className="text-xl md:text-3xl font-black text-slate-900 mb-4">
                                   OPEN CONTRACT  </p>
                            </div>

                          {/* Tender Works Grid */}
<div className="space-y-6">
    <h2 className="text-xl font-bold text-slate-900 mb-4">Open contract for the following works</h2>
    
    <div className="grid md:grid-cols-1 gap-4">
        {[
            "Supply, Installation and Demo of Domestic & Industrial Sewing Machines",
            "Supply of Cotton Fabrics",
            "Supply of Corrugated Packing Boxes",
            "Supply of Non-technical Manpower",
            "Supply, Installation and Demo of Digital Standees"
        ].map((work, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="bg-rose-500 w-2 h-2 rounded-full flex-shrink-0" />
                <p className="font-semibold text-slate-900 leading-tight">{work}</p>
            </div>
        ))}
    </div>
</div>

                            {/* Footer Note */}
                            <div className="bg-slate-900 text-white p-6 rounded-xl text-center">
                                {/* <p className="text-slate-300 text-sm">
                                    Tender Documents can be obtained <strong>In-person</strong> on payment of prescribed fee (Non-refundable).
                                </p> */}

                                 <p className="text-slate-300 text-sm">
                                    Contract Documents can be obtained in-person on payment of its prescribed fee (Non-refundable) </p>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
