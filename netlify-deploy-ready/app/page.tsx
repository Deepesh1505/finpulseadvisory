'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import PerformanceSection from '@/components/PerformanceSection';
import WhyUsSection from '@/components/WhyUsSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import GatedLeadModal from '@/components/GatedLeadModal';
import { PricingDuration } from '@/lib/pricing';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('F&O Specialist');
  const [selectedDuration, setSelectedDuration] = useState<PricingDuration>('Monthly');
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);

  const handleOpenLeadModal = (planName?: string, duration?: PricingDuration, amount?: number) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    if (duration) {
      setSelectedDuration(duration);
    }
    if (amount) {
      setSelectedAmount(amount);
    }
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      {/* Sticky Navigation (Admin link removed per feedback) */}
      <Navbar onOpenLeadModal={handleOpenLeadModal} />

      {/* Hero Section with futuristic AI Quant Execution Engine & Signal Terminal */}
      <Hero onOpenLeadModal={handleOpenLeadModal} />

      {/* Advisory Segments & Packages */}
      <ServicesSection onOpenLeadModal={handleOpenLeadModal} />

      {/* Verified Past Performance & Track Record */}
      <PerformanceSection />

      {/* Core Trading Methodology & Risk Management */}
      <WhyUsSection />

      {/* Dynamic Pricing Plans & GAIN15 Coupon System */}
      <PricingSection onOpenLeadModal={handleOpenLeadModal} />

      {/* Real Trader Testimonials & Reviews */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer with SEBI Risk Warnings & Legal Information */}
      <Footer />

      {/* Gated 2-Step Lead & Dynamic Kotak UPI Payment Modal */}
      <GatedLeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedPlan}
        initialDuration={selectedDuration}
        initialAmount={selectedAmount}
      />
    </main>
  );
}
