'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldAlert, ArrowUp, Lock } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/40 p-1 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="FinPulse Research Logo"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Fin<span className="text-emerald-500">PULSE</span> Research
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier research and financial intelligence firm delivering high-conviction Equity, Futures & Options, and Commodity market recommendations backed by rigorous technical analysis.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919907278129" className="hover:text-emerald-400 transition font-mono font-semibold">
                  +91 9907278129 (Direct Support Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:deepeshmandloi1505@gmail.com" className="hover:text-emerald-400 transition">
                  deepeshmandloi1505@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Financial District, Indore / Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Advisory Desks</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-emerald-400 transition">Equity Cash & Swing</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition">Index & Stock Options</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition">MCX Commodity Advisory</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition">HNI Portfolio Hedging</a></li>
              <li><a href="#track-record" className="hover:text-emerald-400 transition">Verified Track Record</a></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#pricing" className="hover:text-emerald-400 transition">Pricing Plans</a></li>
              <li><a href="#methodology" className="hover:text-emerald-400 transition">Trading Methodology</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition">Frequently Asked Questions</a></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition flex items-center gap-1"><Lock className="w-3 h-3" /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Payment Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Payment Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We support direct UPI payments and NEFT/RTGS bank transfers. Share your transaction reference with our activation desk for prompt onboarding.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/919907278129?text=Hello%20FinPulse%20Research%20team%2C%20I%20want%20to%20know%20more%20about%20your%20stock%20advisory%20plans."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-semibold transition border border-[#25D366]/30"
              >
                <span>WhatsApp Helpline Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* SEBI Compliance & Mandatory Risk Warning Banner */}
        <div className="my-8 p-5 rounded-2xl bg-slate-900 border border-amber-500/30 text-xs space-y-2 text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>SEBI Mandatory Regulatory Risk Disclosure on Derivatives (F&O) & Equities</span>
          </div>
          <p className="leading-relaxed">
            <strong>Risk Warning:</strong> Trading in Futures and Options (F&O) and Equity cash segments carries high market risk. According to a study published by SEBI:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
            <li>9 out of 10 individual traders in equity Futures and Options segment incurred net losses.</li>
            <li>On an average, loss makers registered net trading loss close to ₹50,000.</li>
            <li>Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.</li>
            <li>Those making net trading profits incurred between 15% to 50% of such profits as transaction cost.</li>
          </ul>
          <p className="text-[11px] pt-1 text-slate-500">
            <strong>Disclaimer:</strong> Investment in securities market are subject to market risks. Read all related documents carefully before investing. FinPulse Research provides educational technical research and structured advisory. Past performance is no guarantee of future profits. We do not provide profit sharing or guaranteed return services.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FinPulse Research. All rights reserved. Registered Stock Advisory.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-emerald-400 transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
