"use client";

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnalysisSection from '@/components/AnalysisSection';
import FeaturesSection from '@/components/FeaturesSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <AnalysisSection />
      <FeaturesSection />
      <ContactForm />
      <Footer />
      </main>
    </>
  );
}