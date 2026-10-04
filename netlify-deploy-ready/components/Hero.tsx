'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Zap,
  Award,
  CheckCircle2,
  ChevronRight,
  Activity,
  Terminal,
  Cpu,
  Radio,
  Sliders,
  Sparkles,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: (planName?: string) => void;
}

export default function Hero({ onOpenLeadModal }: HeroProps) {
  const [calculatorCapital, setCalculatorCapital] = useState<number>(200000);

  // Projected 1-month returns based on historical average monthly returns (18.4%)
  const projectedReturn = Math.round(calculatorCapital * 0.184);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background gradient decorative glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Ribbon */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>AI Quant Intelligence • October 2026 Batch Open</span>
            <ChevronRight className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: High-Converting Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Trade Smarter with{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Institutional-Grade
              </span>{' '}
              Stock Advisory
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Stop guessing market directions. Get high-conviction{' '}
              <strong className="text-slate-900 dark:text-emerald-300">
                Equity Swing, F&O Options, and Commodity
              </strong>{' '}
              recommendations backed by quantitative AI execution models, strict Stop-Loss, and real-time Telegram/WhatsApp entry alerts.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenLeadModal('Hero CTA - 7-Day Trial')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition flex items-center justify-center gap-2.5"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Start 7-Day Advisory Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition text-center shadow-sm"
              >
                Explore Pricing Plans
              </a>
            </div>

            {/* Live Trust Badges & Counters */}
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  91.4%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Target Hit Rate
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  ₹4.8 Cr+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Client Profits Generated
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  12,500+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Active Traders
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono">
                  1 : 2.8
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Avg Risk-Reward Ratio
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI QUANT EXECUTION ENGINE & SIGNAL TERMINAL */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0F172A] border border-emerald-500/40 shadow-2xl p-6 glow-emerald backdrop-blur-xl text-slate-200">
              
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold tracking-tight text-white">
                    finpulse-quant-core
                  </span>
                </div>

                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>AI QUANT TERMINAL v2.4 (ACTIVE)</span>
                </div>
              </div>

              {/* Core Algorithmic Scanning Metrics */}
              <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Pattern Match
                  </span>
                  <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5">
                    98.4%
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">Confluence</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Execution
                  </span>
                  <div className="text-sm sm:text-base font-bold font-mono text-cyan-400 mt-0.5">
                    &lt;12ms
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">Low Latency</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Risk Setup
                  </span>
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5">
                    1:2.8 RR
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">Optimal</span>
                </div>
              </div>

              {/* Live Terminal Telemetry Output */}
              <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800/60">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>LIVE SCANNER FEED</span>
                  </span>
                  <span className="text-emerald-400">184 SCRIPS MONITORED</span>
                </div>
                <div className="text-emerald-400 pt-1">
                  &gt; [SCAN]: OI Surge + Volume Breakout in BANKNIFTY 54200 CE
                </div>
                <div className="text-slate-400 text-[10px]">
                  &gt; [ALGO]: Multi-timeframe trend confluence locked @ ₹320
                </div>
                <div className="text-cyan-300 text-[10px]">
                  &gt; [TARGETS]: T1: ₹450 | T2: ₹580 | Hard SL: ₹240 [R:R 1:3.2]
                </div>
              </div>

              {/* Feature Bullets: AI-Powered Advantages */}
              <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Neural Network Volatility Scanning</span>
                  <span className="text-slate-500 text-[11px]">— Real-time regime shifts</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="font-semibold text-white">Automated Multi-Tier Target Calculations</span>
                  <span className="text-slate-500 text-[11px]">— Math-backed Fibonacci pivots</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Super-Fast Signal Updates</span>
                  <span className="text-slate-500 text-[11px]">— Instant VIP Telegram & WhatsApp broadcast</span>
                </div>
              </div>

              {/* Interactive Capital Return Estimator inside Terminal Wrapper */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Returns with Your Capital:</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ₹{calculatorCapital.toLocaleString('en-IN')}
                  </span>
                </div>

                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={calculatorCapital}
                  onChange={(e) => setCalculatorCapital(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-300 block">
                      Estimated Monthly Alpha (18.4% Avg)
                    </span>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      +₹{projectedReturn.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenLeadModal(`AI Quant Terminal: ₹${calculatorCapital}`)}
                    className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Join AI Signal Broadcast</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
