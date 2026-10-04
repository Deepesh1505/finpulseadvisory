'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Phone, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenLeadModal: (planName?: string) => void;
}

export default function Navbar({ onOpenLeadModal }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Advisory Services', href: '#services' },
    { label: 'Track Record', href: '#track-record' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-slate-900 dark:bg-slate-800 border border-emerald-500/40 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/logo.png"
                alt="FinPulse Research"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Fin<span className="text-emerald-500">PULSE</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Research
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wide">
                Institutional-Grade Stock Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-600 transition-transform rotate-0" />
              )}
            </button>

            {/* Direct Call Button */}
            <a
              href="tel:+919907278129"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+91 9907278129</span>
            </a>

            {/* Free Trial / Advisory CTA */}
            <button
              onClick={() => onOpenLeadModal('Free Advisory Trial')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition active:scale-95"
            >
              <span>Get Free Advice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Theme Switcher */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            <a
              href="tel:+919907278129"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href="tel:+919907278129"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 9907278129</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal('Mobile CTA');
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-center shadow-lg shadow-emerald-500/20"
            >
              Get Free Advisory Signals
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
