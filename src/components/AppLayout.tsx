import React from 'react';
import Navigation from './portfolio/Navigation';
import HeroSection from './portfolio/HeroSection';
import ClientLogos from './portfolio/ClientLogos';
import PhilosophySection from './portfolio/PhilosophySection';
import SectionDivider from './portfolio/SectionDivider';
import StatsBar from './portfolio/StatsBar';
import ProductsSection from './portfolio/ProductsSection';
import ChallengesSection from './portfolio/ChallengesSection';
import TechSection from './portfolio/TechSection';
import BlogSection from './portfolio/BlogSection';
import TimelineSection from './portfolio/TimelineSection';
import ContactSection from './portfolio/ContactSection';
import CTASection from './portfolio/CTASection';
import Footer from './portfolio/Footer';
import WhatsAppButton from './portfolio/WhatsAppButton';
import ScrollProgress from './portfolio/ScrollProgress';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[hsl(160,10%,4%)] text-white overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      {/*
        Navigation is `fixed`, so we offset the whole page content by the
        navbar height to prevent the hero/avatar from being hidden underneath.
      */}
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <ClientLogos />
        <SectionDivider />
        <PhilosophySection />
        <SectionDivider />
        <StatsBar />
        <SectionDivider />
        <ProductsSection />
        <SectionDivider />
        <ChallengesSection />
        <SectionDivider />
        <TechSection />
        <SectionDivider />
        <BlogSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <ContactSection />
        <CTASection />
        <Footer />
        <WhatsAppButton />
      </main>
    </div>
  );
};

export default AppLayout;
