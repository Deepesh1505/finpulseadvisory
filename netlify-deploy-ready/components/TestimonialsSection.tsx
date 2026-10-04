'use client';

import React from 'react';
import { Star, CheckCircle2, Quote, TrendingUp } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Sunil Rao',
      role: 'Full-Time Options Trader, Pune',
      segment: 'Pro F&O Plan',
      rating: 5,
      profitText: '+₹1,85,000 Profit in September',
      feedback:
        'Before FinPulse, I was losing money on weekly zero-hero trades. Their stop-loss discipline completely changed my trading psychology. Their BankNifty call on expiry fetched me 130% return in just 45 minutes.',
    },
    {
      name: 'Kavita Singhal',
      role: 'IT Project Lead & Swing Investor, Bengaluru',
      segment: 'Equity Cash Plan',
      rating: 5,
      profitText: '+24.5% Portfolio Return',
      feedback:
        'Because of my office hours, I cannot sit in front of charts all day. FinPulse swing recommendations give me 2 days advance notice to enter solid breakout stocks like Tata Motors and Bharti Airtel. Highly professional research team.',
    },
    {
      name: 'Amitabh Sen',
      role: 'Business Owner & HNI Client, Kolkata',
      segment: 'Elite Wealth Plan',
      rating: 5,
      profitText: '₹14 Lakhs Hedged & Preserved',
      feedback:
        'The 1-on-1 advisor desk is invaluable. During recent market volatility, they hedged my large-cap portfolio with Nifty put spreads that saved me from a major drawdown. Their market intuition is unmatched.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Trader Reviews & Verified Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Trusted by Serious Traders Across India
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Real feedback from subscribers who transformed their trading results with disciplined FinPulse Research recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.profitText}
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
