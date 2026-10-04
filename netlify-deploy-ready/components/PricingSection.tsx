'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, HelpCircle, ArrowRight, Tag, Percent } from 'lucide-react';
import { PRICING_PLANS, PricingDuration } from '@/lib/pricing';

interface PricingProps {
  onOpenLeadModal: (planName: string, duration?: PricingDuration, amount?: number) => void;
}

export default function PricingSection({ onOpenLeadModal }: PricingProps) {
  const [duration, setDuration] = useState<PricingDuration>('Monthly');

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing • Instant Dynamic QR Activation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Choose Your Advisory Plan
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Select a specialized segment tailored to your trading style. Unlock high-conviction research alerts via Telegram & WhatsApp.
          </p>

          {/* Coupon Code Announcement Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-sm">
            <Tag className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Limited Offer: Apply Coupon <span className="font-mono font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded tracking-wider">GAIN15</span> in Payment Modal for <strong className="text-emerald-600 dark:text-emerald-400">Flat 15% OFF</strong>!
            </span>
          </div>

          {/* Duration Toggle: Monthly / 6 Months / 1 Year */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
            {(['Monthly', '6 Months', '1 Year'] as PricingDuration[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setDuration(tab)}
                className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                  duration === tab
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab}</span>
                {tab === '6 Months' && (
                  <span className="hidden sm:inline text-[10px] bg-white text-emerald-700 font-extrabold px-1.5 py-0.2 rounded-full">
                    Save 20%
                  </span>
                )}
                {tab === '1 Year' && (
                  <span className="hidden sm:inline text-[10px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full">
                    Best Value
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid (4 Plans: Equity, F&O, Commodity, All-In-One) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = plan.pricing[duration];
            const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/15 md:-translate-y-2'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/40 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider shadow flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {plan.badge || plan.segment}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-5 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-5 pb-5 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {formattedPrice}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      / {duration}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200 block uppercase tracking-wide">
                      Included In Package:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => onOpenLeadModal(plan.name, duration, price)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <span>Choose Plan & Activate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    Dynamic QR Code + Coupon GAIN15 applicable
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Corporate Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center max-w-3xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Need Personalized Multi-Lot Advisory or Proprietary Desk?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Speak directly with Deepesh Mandloi & senior research team at +91 9907278129 for customized hedging setups.
              </p>
            </div>
            <a
              href="tel:+919907278129"
              className="whitespace-nowrap px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold transition"
            >
              Call Desk Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
