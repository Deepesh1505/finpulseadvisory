'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How much minimum trading capital do I need to start?',
      answer:
        'For Equity Cash & Swing trading, a capital of ₹50,000 to ₹1,00,000 is recommended for proper position sizing. For Index F&O Option buying, you can begin with ₹25,000 to ₹50,000. For HNI Portfolio Hedging, minimum capital is ₹10 Lakhs.',
    },
    {
      question: 'How are advisory calls and trade alerts delivered?',
      answer:
        'Immediately after a market setup triggers, alerts are dispatched to our Private Telegram Channel and via dedicated WhatsApp VIP Broadcast with specific Scrip Name, Entry Range, Target 1, Target 2, and exact Stop-Loss.',
    },
    {
      question: 'How does the UPI QR and Bank Transfer activation work?',
      answer:
        'Once you choose your plan in our pricing matrix and submit your contact details, our portal unlocks the official FinPulse UPI QR code and Bank account details. After completing the payment, share your UTR or screenshot via WhatsApp to +91 9907278129 for instant onboarding within 15 minutes.',
    },
    {
      question: 'Do you offer a trial period before committing?',
      answer:
        'Yes! You can register for our 7-Day Advisory Trial through any of our "Start Free Trial" buttons to test our signal accuracy and market timing before subscribing to quarterly or annual packages.',
    },
    {
      question: 'Do you guarantee 100% profits or fixed returns?',
      answer:
        'No. Per SEBI compliance guidelines and the fundamental reality of financial markets, nobody can promise fixed or guaranteed returns. We deliver high-probability setups backed by quantitative research and strict stop-loss rules to maintain a long-term profitable edge.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Clear information about our operational policies, delivery channels, and capital guidelines.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 overflow-hidden transition shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-500 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
