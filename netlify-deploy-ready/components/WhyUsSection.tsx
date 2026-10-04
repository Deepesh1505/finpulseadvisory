'use client';

import React from 'react';
import { Target, ShieldAlert, Cpu, Zap, CheckCircle2, Award } from 'lucide-react';

export default function WhyUsSection() {
  const pillars = [
    {
      icon: Cpu,
      title: 'Institutional Order Flow & OI',
      description:
        'We don’t trade retail chart patterns in isolation. Every signal is vetted through institutional block deal scans, FII/DII net open-interest build-up, and volume profiles.',
    },
    {
      icon: Target,
      title: 'Strict 1:2.5+ Asymmetric Risk-Reward',
      description:
        'Capital preservation is our highest priority. We never enter trades where the risk exceeds half of the realistic target potential. Even with a 50% hit rate, our mathematical model generates profit.',
    },
    {
      icon: ShieldAlert,
      title: 'Zero Averaging in Losing Positions',
      description:
        'The #1 mistake retail traders make is adding to losing options or stocks. We enforce fixed hard stop-losses. If the trade premise fails, we exit and preserve cash for the next setup.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Broadcast Alerts',
      description:
        'Stock and option levels move fast. Recommendations are pushed simultaneously via private VIP Telegram and dedicated WhatsApp channels with automated entry and exit limits.',
    },
  ];

  return (
    <section id="methodology" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Quantitative & Technical Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Why Successful Traders Choose FinPulse
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            A disciplined, rule-based approach built on 12+ years of combined market analysis across bull, bear, and sideways regimes.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row gap-5"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 h-fit">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white">
              Ready to eliminate emotional trading errors?
            </h4>
            <p className="text-sm text-slate-300">
              Join thousands of profitable traders who execute high-probability research setups every trading day.
            </p>
          </div>
          <a
            href="tel:+919907278129"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition flex items-center gap-2"
          >
            <span>Talk to Senior Advisor (+91 9907278129)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
