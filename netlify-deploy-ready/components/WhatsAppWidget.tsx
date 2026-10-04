'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const whatsappUrl =
    'https://wa.me/919907278129?text=Hello%20FinPulse%20Research%20team%2C%20I%20want%20to%20know%20more%20about%20your%20stock%20advisory%20plans.';

  return (
    <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
      {/* Tooltip on hover */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap">
        <span>Chat with Advisory Desk</span>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with FinPulse Research"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all whatsapp-pulse focus:outline-none"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        {/* Little badge dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full"></span>
      </a>
    </div>
  );
}
