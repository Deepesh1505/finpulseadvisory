'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Building2,
  QrCode,
  Tag,
  Percent,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { PRICING_PLANS, PricingDuration, PAYMENT_CONFIG, VALID_COUPONS } from '@/lib/pricing';

interface GatedLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialDuration?: PricingDuration;
  initialAmount?: number;
}

export default function GatedLeadModal({
  isOpen,
  onClose,
  initialPlan,
  initialDuration = 'Monthly',
  initialAmount,
}: GatedLeadModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('Salaried Professional');
  const [tradingSegment, setTradingSegment] = useState('F&O Options');
  const [investmentCapital, setInvestmentCapital] = useState('₹3 Lakhs - ₹5 Lakhs');
  const [utrNumber, setUtrNumber] = useState('');

  // Selected Plan & Duration State
  const [selectedPlanName, setSelectedPlanName] = useState<string>(initialPlan || 'F&O Specialist');
  const [selectedDuration, setSelectedDuration] = useState<PricingDuration>(initialDuration || 'Monthly');

  // Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Synchronize when initialPlan or initialDuration changes
  useEffect(() => {
    if (initialPlan) {
      setSelectedPlanName(initialPlan);
      // Map segment accordingly
      if (initialPlan.includes('Equity')) setTradingSegment('Equity Cash & Swing');
      else if (initialPlan.includes('Commodity')) setTradingSegment('Commodity (MCX)');
      else if (initialPlan.includes('All-In-One')) setTradingSegment('All-in-One Multi-Asset');
      else setTradingSegment('F&O Options');
    }
    if (initialDuration) {
      setSelectedDuration(initialDuration);
    }
  }, [initialPlan, initialDuration]);

  if (!isOpen) return null;

  // Resolve base amount from plan config or fallback
  const currentPlanConfig = PRICING_PLANS.find(
    (p) => p.name.toLowerCase() === selectedPlanName.toLowerCase() || p.id === selectedPlanName.toLowerCase()
  ) || PRICING_PLANS[1]; // default to F&O

  const baseAmount =
    initialAmount && selectedPlanName === initialPlan && selectedDuration === initialDuration
      ? initialAmount
      : currentPlanConfig.pricing[selectedDuration] || 22999;

  // Discount calculation
  const discountAmount = appliedCoupon ? Math.round((baseAmount * discountPercent) / 100) : 0;
  const finalAmount = Math.max(1, baseAmount - discountAmount);

  // Dynamic UPI URI per specification:
  // upi://pay?pa=9907278129@kotakbank&pn=Deepesh%20Mandloi&am={FINAL_AMOUNT}&cu=INR
  const upiUri = `upi://pay?pa=${PAYMENT_CONFIG.upiId}&pn=${encodeURIComponent(
    PAYMENT_CONFIG.recipientName
  )}&am=${finalAmount}&cu=INR`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiUri
  )}`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${key} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (!clean) {
      toast.error('Please enter a coupon code.');
      return;
    }

    if (clean === 'GAIN15' || VALID_COUPONS[clean]) {
      const couponMeta = VALID_COUPONS[clean] || { discountPercent: 15, description: 'Flat 15% Discount' };
      setAppliedCoupon(clean);
      setDiscountPercent(couponMeta.discountPercent);
      toast.success(`Coupon "${clean}" applied! You saved 15% (₹${Math.round((baseAmount * 15) / 100).toLocaleString('en-IN')})`);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      toast.error('Invalid coupon code. Try GAIN15 for 15% off.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setCouponInput('');
    toast.info('Coupon removed.');
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      toast.error('Please enter your full name and phone number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          phone_number: phoneNumber,
          email,
          occupation,
          trading_segment: tradingSegment,
          investment_capital: investmentCapital,
          plan_name: `${selectedPlanName} (${selectedDuration} - ₹${finalAmount.toLocaleString('en-IN')})`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Registration successful! Welcome to FinPulse Research.');
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {}
        setStep(2);
      } else {
        toast.error(data.message || 'Submission failed. Please try again.');
        setStep(2);
      }
    } catch {
      toast.error('Network notice. Proceeding directly to dynamic payment screen.');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp "I Have Paid" Action
  const handleIHavePaidWhatsApp = () => {
    const confirmationText = `Hello FinPulse Team, I have paid ₹${finalAmount.toLocaleString(
      'en-IN'
    )} for the ${selectedPlanName} (${selectedDuration}) plan.\n\nPayment Details:\n- Name: ${fullName}\n- Phone: ${phoneNumber}\n- Plan: ${selectedPlanName} (${selectedDuration})\n- Amount Paid: ₹${finalAmount.toLocaleString('en-IN')}\n- UPI Beneficiary: ${PAYMENT_CONFIG.upiId} (${PAYMENT_CONFIG.recipientName})\n${
      utrNumber ? `- UTR / Ref No: ${utrNumber}\n` : ''
    }${appliedCoupon ? `- Coupon Applied: ${appliedCoupon} (15% OFF)\n` : ''}\nPlease verify and activate my advisory access.`;

    window.open(
      `https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(confirmationText)}`,
      '_blank'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              Step {step} of 2 • {step === 1 ? 'Advisory Registration' : 'Dynamic UPI & Bank Payment'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {step === 1 ? 'Start Your Advisory Enrollment' : 'Complete Instant Payment'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {step === 1
              ? 'Enter your investor details to configure your research desk and signal delivery.'
              : 'Scan the dynamic UPI QR code or transfer to Kotak Mahindra Bank account.'}
          </p>
        </div>

        {/* STEP 1: LEAD CAPTURE FORM */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            
            {/* Plan & Duration Selector in Step 1 */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Target Plan:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  ₹{baseAmount.toLocaleString('en-IN')} / {selectedDuration}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedPlanName}
                  onChange={(e) => setSelectedPlanName(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none"
                >
                  {PRICING_PLANS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value as PricingDuration)}
                  className="px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-emerald-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp / Phone <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 99072 78129"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Trading Segment
                </label>
                <select
                  value={tradingSegment}
                  onChange={(e) => setTradingSegment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="F&O Options">F&O (Nifty & Bank Nifty Options)</option>
                  <option value="Equity Cash & Swing">Equity Cash & Swing Momentum</option>
                  <option value="Commodity (MCX)">Commodity (Gold, Silver, Crude)</option>
                  <option value="All-in-One Multi-Asset">All-in-One Multi-Asset</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Capital Band
                </label>
                <select
                  value={investmentCapital}
                  onChange={(e) => setInvestmentCapital(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="< ₹1 Lakh">&lt; ₹1 Lakh</option>
                  <option value="₹1 Lakh - ₹3 Lakhs">₹1 Lakh - ₹3 Lakhs</option>
                  <option value="₹3 Lakhs - ₹5 Lakhs">₹3 Lakhs - ₹5 Lakhs</option>
                  <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                  <option value="₹10 Lakhs+">₹10 Lakhs+ (HNI)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Occupation
              </label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Salaried Professional">Salaried Professional / Corporate</option>
                <option value="Full-time Trader">Full-time Trader / Investor</option>
                <option value="Business Owner">Business Owner / Entrepreneur</option>
                <option value="Doctor / CA / Lawyer">Professional (Doctor / CA / Lawyer)</option>
                <option value="Retired / Homemaker">Retired / Other</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 active:scale-98 transition disabled:opacity-70"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Proceed to Dynamic Payment Details</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              🔒 Confidential & Encrypted. No spam guarantee.
            </p>
          </form>
        )}

        {/* STEP 2: DYNAMIC PAYMENT & QR CODE PORTAL */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            
            {/* Plan Confirmation Card with Breakup */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[11px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                    Selected Advisory Plan
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedPlanName} <span className="text-xs font-normal text-slate-500">({selectedDuration})</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Client: {fullName} • {phoneNumber}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Payable</span>
                  <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mt-3 pt-3 border-t border-emerald-500/20 text-xs space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Standard Plan Fee ({selectedDuration}):</span>
                  <span className="font-mono">₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>Coupon Discount ({appliedCoupon} - 15%):</span>
                    </span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1 border-t border-emerald-500/20 text-slate-900 dark:text-white font-bold">
                  <span>Final Amount to Pay:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* COUPON CODE FIELD */}
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Have a Discount Coupon?</span>
                </span>
                {!appliedCoupon && (
                  <button
                    type="button"
                    onClick={() => {
                      setCouponInput('GAIN15');
                      setTimeout(() => handleApplyCoupon(), 50);
                    }}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    Tap to apply GAIN15 (15% OFF)
                  </button>
                )}
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5 font-bold font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{appliedCoupon} APPLIED — 15% SAVED</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. GAIN15)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow transition active:scale-95"
                  >
                    Apply Code
                  </button>
                </div>
              )}
            </div>

            {/* DYNAMIC PAYMENT DETAILS: QR CODE + BANK INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Dynamic QR Code Block */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">
                  <QrCode className="w-4 h-4 text-emerald-500" />
                  <span>Scan to Pay ₹{finalAmount.toLocaleString('en-IN')}</span>
                </div>

                {/* Rendered Dynamic QR Code */}
                <div className="w-44 h-44 bg-white p-2.5 rounded-2xl shadow-inner border border-slate-200 flex flex-col items-center justify-center relative group">
                  <img
                    src={qrImageUrl}
                    alt={`UPI QR Code for ₹${finalAmount}`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition text-white text-[11px] font-bold p-2 text-center">
                    Pre-configured with ₹{finalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                  Beneficiary: <strong className="text-slate-700 dark:text-slate-200">{PAYMENT_CONFIG.recipientName}</strong>
                </div>

                <div className="mt-2 w-full space-y-1">
                  {/* UPI ID copy */}
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-[11px]">
                    <span className="font-mono text-slate-800 dark:text-slate-200 truncate">
                      {PAYMENT_CONFIG.upiId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(PAYMENT_CONFIG.upiId, 'UPI ID')}
                      className="text-emerald-500 hover:text-emerald-600 p-0.5"
                      title="Copy UPI ID"
                    >
                      {copiedKey === 'UPI ID' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* UPI Number copy */}
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-[11px]">
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      UPI No: {PAYMENT_CONFIG.upiNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(PAYMENT_CONFIG.upiNumber, 'UPI Number')}
                      className="text-emerald-500 hover:text-emerald-600 p-0.5"
                      title="Copy UPI Number"
                    >
                      {copiedKey === 'UPI Number' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Bank Account Details Block */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex flex-col justify-between text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span>Bank Account Details</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 dark:text-slate-400">Beneficiary:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{PAYMENT_CONFIG.recipientName}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 dark:text-slate-400">Bank:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{PAYMENT_CONFIG.bankName}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 dark:text-slate-400">A/C Number:</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-100">
                      <span>{PAYMENT_CONFIG.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(PAYMENT_CONFIG.accountNumber, 'Account Number')}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        {copiedKey === 'Account Number' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 dark:text-slate-400">IFSC Code:</span>
                    <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span>{PAYMENT_CONFIG.ifsc}</span>
                      <button
                        onClick={() => handleCopy(PAYMENT_CONFIG.ifsc, 'IFSC Code')}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        {copiedKey === 'IFSC Code' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    UTR / Transaction Ref No (Optional)
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 427189102934"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* "I Have Paid" Button & WhatsApp Confirmation */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleIHavePaidWhatsApp}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-lg shadow-[#25D366]/25 transition flex items-center justify-center gap-2 text-sm active:scale-98"
              >
                <span>I Have Paid (Confirm on WhatsApp)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Close / I will send the payment screenshot later
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
