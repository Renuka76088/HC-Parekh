import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeV1 from './pages/Home1';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceCharges from './pages/ServiceCharges';
import ProjectNotice from './pages/ProjectNotice';
import CorporateTenders from './pages/CorporateTenders';
import CorporateMOU from './pages/CorporateMOU';
import OurTeam from './pages/OurTeam';
import OurHiring from './pages/OurHiring';
import SocialServices from './pages/SocialServices';
import PhotoGallery from './pages/PhotoGallery';
import OurTradeInvitation from './pages/OurTradeInvitation';
import Circulars from './pages/Circulars';
import WebMarket from './pages/WebMarket';


import ScrollToTop from './components/ScrollToTop';
import LinkedInFloat from "./components/LinkedInFloat";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative">

        <LinkedInFloat />
        <Routes>
          <Route path="/" element={<HomeV1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-charges" element={<ServiceCharges />} />
          <Route path="/project-notice" element={<ProjectNotice />} />
          <Route path="/corporate-tenders" element={<CorporateTenders />} />
          <Route path="/corporate-mou" element={<CorporateMOU />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-hiring" element={<OurHiring />} />
          <Route path="/our-trade-invitation" element={<OurTradeInvitation />} />
          <Route path="/social-services" element={<SocialServices />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/circulars" element={<Circulars />} />
          <Route path="/web-market" element={<WebMarket />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}