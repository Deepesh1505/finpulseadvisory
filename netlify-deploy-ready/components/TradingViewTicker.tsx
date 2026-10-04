'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FALLBACK_TICKERS = [
  { symbol: 'NIFTY 50', price: '25,815.40', change: '+142.30 (+0.55%)', isUp: true },
  { symbol: 'BANK NIFTY', price: '53,920.85', change: '+380.60 (+0.71%)', isUp: true },
  { symbol: 'SENSEX', price: '84,545.10', change: '+412.15 (+0.49%)', isUp: true },
  { symbol: 'RELIANCE', price: '2,985.60', change: '+24.50 (+0.83%)', isUp: true },
  { symbol: 'HDFC BANK', price: '1,684.20', change: '+18.10 (+1.08%)', isUp: true },
  { symbol: 'TATA MOTORS', price: '984.75', change: '+22.40 (+2.33%)', isUp: true },
  { symbol: 'ICICI BANK', price: '1,248.50', change: '+14.20 (+1.15%)', isUp: true },
  { symbol: 'INFOSYS', price: '1,892.30', change: '-8.50 (-0.45%)', isUp: false },
  { symbol: 'GOLD (MCX)', price: '₹75,420', change: '+340 (+0.45%)', isUp: true },
  { symbol: 'CRUDE OIL', price: '₹5,980', change: '-45 (-0.75%)', isUp: false },
];

export default function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous widget on theme toggle
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.type = 'text/javascript';

    const widgetConfig = {
      symbols: [
        { proName: 'INDEX:NIFTY', title: 'NIFTY 50' },
        { proName: 'INDEX:BANKNIFTY', title: 'BANK NIFTY' },
        { proName: 'BSE:SENSEX', title: 'SENSEX' },
        { description: 'Reliance', proName: 'NSE:RELIANCE' },
        { description: 'HDFC Bank', proName: 'NSE:HDFCBANK' },
        { description: 'Tata Motors', proName: 'NSE:TATAMOTORS' },
        { description: 'ICICI Bank', proName: 'NSE:ICICIBANK' },
        { description: 'MCX Gold', proName: 'MCX:GOLD1!' },
        { description: 'MCX Crude', proName: 'MCX:CRUDEOIL1!' },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'adaptive',
      colorTheme: theme === 'dark' ? 'dark' : 'light',
      locale: 'in',
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    const widgetWrapper = document.createElement('div');
    widgetWrapper.className = 'tradingview-widget-container__widget';
    container.appendChild(widgetWrapper);
    container.appendChild(script);

    const timer = setTimeout(() => {
      setWidgetLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [theme]);

  return (
    <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white overflow-hidden text-xs relative z-40">
      {/* TradingView container */}
      <div
        ref={containerRef}
        className="tradingview-widget-container min-h-[46px] w-full"
      />

      {/* Fallback Animated Ticker if script delayed or offline */}
      {!widgetLoaded && (
        <div className="absolute inset-0 bg-slate-900 flex items-center overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-8 items-center px-4">
            {[...FALLBACK_TICKERS, ...FALLBACK_TICKERS].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 font-mono text-[13px]">
                <span className="font-semibold text-slate-200">{item.symbol}</span>
                <span className="text-white font-medium">{item.price}</span>
                <span
                  className={`flex items-center text-[12px] font-semibold px-1.5 py-0.5 rounded ${
                    item.isUp
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {item.isUp ? (
                    <TrendingUp className="w-3 h-3 mr-1 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 inline" />
                  )}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
