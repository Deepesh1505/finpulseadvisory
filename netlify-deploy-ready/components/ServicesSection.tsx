'use client';

import React from 'react';
import { LineChart, BarChart3, Coins, Crown, CheckCircle2, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface ServicesProps {
  onOpenLeadModal: (planName: string) => void;
}

export default function ServicesSection({ onOpenLeadModal }: ServicesProps) {
  const services = [
    {
      title: 'Equity Cash & Momentum Swing',
      icon: LineChart,
      tag: 'Low Risk • High Stability',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description:
        'Engineered for investors and swing traders. Multi-bagger chart pattern breakouts with 5-15 days typical holding time.',
      features: [
        '12 - 15 High Conviction Calls/Month',
        'Strict 1:2.5 minimum Risk-Reward ratio',
        'Clear Entry, Target 1, Target 2 & Stop-Loss',
        'Company Fundamental & Technical Rationale',
        'Ideal for capital ₹1,00,000 and above',
      ],
      planKey: 'Equity Advisory',
    },
    {
      title: 'Index & Stock Options (F&O)',
      icon: BarChart3,
      tag: 'Most Popular • High Alpha',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      popular: true,
      description:
        'High-velocity Nifty, Bank Nifty, and FinNifty option buying & selling strategies with institutional open-interest confirmation.',
      features: [
        '2 - 4 Intraday & BTST Option Calls Daily',
        'Nifty & Bank Nifty Expiry Hero-to-Zero Setups',
        'Defined lot sizing and trailing SL rules',
        'Fast telegram & WhatsApp broadcast (Zero delay)',
        'Ideal for active full-time/part-time traders',
      ],
      planKey: 'F&O Specialist',
    },
    {
      title: 'MCX Commodity Advisory',
      icon: Coins,
      tag: 'Evening Trading Market',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      description:
        'Capture macro-economic swings in Gold, Silver, Crude Oil, and Natural Gas during Indian evening trading sessions.',
      features: [
        'Evening session calls (5:00 PM - 11:30 PM)',
        'Global inventory data & dollar index alignment',
        'High precision levels with tight risk protection',
        'Daily commodity market outlook PDF',
        'Perfect for working professionals',
      ],
      planKey: 'Commodity Advisory',
    },
    {
      title: 'All-In-One Institutional Advisory',
      icon: Crown,
      tag: 'Bespoke • Complete Suite',
      tagColor: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-600/20',
      description:
        'Comprehensive 1-on-1 private advisory across Equity, Options & Commodities with customized portfolio risk hedging.',
      features: [
        'Dedicated Senior Research Analyst assigned',
        'Personalized Portfolio Audit & Rebalancing',
        'Options Hedging for Large Portfolios',
        'Direct Priority Call & WhatsApp line',
        'Weekly video review conference calls',
      ],
      planKey: 'All-In-One Institutional',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Structured Financial Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Specialized Advisory Packages
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Whether you trade intraday derivatives or accumulate high-growth stocks, our research desks deliver battle-tested strategies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  service.popular
                    ? 'bg-white dark:bg-slate-800 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 -translate-y-1'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/40 shadow-sm hover:shadow-md'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider shadow flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>Most Subscribed</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${service.tagColor}`}>
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal(service.planKey)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    service.popular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                      : 'bg-slate-100 dark:bg-slate-700/80 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <span>Select & Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
