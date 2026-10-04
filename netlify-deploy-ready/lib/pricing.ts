export type PricingDuration = 'Monthly' | '6 Months' | '1 Year';

export interface PlanConfig {
  id: string;
  name: string;
  segment: 'Equity' | 'F&O' | 'Commodity' | 'All-In-One';
  badge?: string;
  popular?: boolean;
  description: string;
  features: string[];
  pricing: Record<PricingDuration, number>;
}

export const PRICING_PLANS: PlanConfig[] = [
  {
    id: 'equity',
    name: 'Equity Advisory',
    segment: 'Equity',
    badge: 'Cash & Swing',
    description: 'High-conviction pure cash breakouts & momentum swing trades for stable wealth compounding.',
    features: [
      '10-14 High-Conviction Cash Swing calls/month',
      'Average holding period: 5 to 20 trading days',
      'Target 1, Target 2, Target 3 & Strict Stop-Loss',
      'Detailed Technical & Fundamental Rationale',
      'Telegram VIP & WhatsApp Broadcast Channel',
      'Quarterly & Annual Portfolio Health Review',
    ],
    pricing: {
      'Monthly': 11999,
      '6 Months': 51999,
      '1 Year': 71999,
    },
  },
  {
    id: 'fno',
    name: 'F&O Specialist',
    segment: 'F&O',
    badge: 'Most Popular • High Alpha',
    popular: true,
    description: 'Index & Stock Option buying setups with open-interest confirmation and tight risk parameters.',
    features: [
      '2-4 Daily BankNifty & Nifty Option calls',
      'Hero-to-Zero Expiry Special Setups',
      'Real-time OI Spike & Institutional Flow Alerts',
      'Strict Trailing SL & Multi-Target Updates',
      'Low Latency Signal Dispatch (<3s Execution)',
      'Dedicated Analyst Support Line',
    ],
    pricing: {
      'Monthly': 22999,
      '6 Months': 71999,
      '1 Year': 121000,
    },
  },
  {
    id: 'commodity',
    name: 'Commodity Advisory',
    segment: 'Commodity',
    badge: 'Evening Sessions',
    description: 'Capture macro swings in MCX Gold, Silver, Crude Oil, and Natural Gas contracts.',
    features: [
      'Evening market trading calls (5 PM - 11:30 PM)',
      'Global inventory & dollar index correlation',
      'High-precision pivot levels with tight risk',
      'Daily MCX Technical Outlook PDF',
      'Ideal for working corporate professionals',
      'Direct Support Desk during MCX hours',
    ],
    pricing: {
      'Monthly': 6999,
      '6 Months': 21999,
      '1 Year': 49999,
    },
  },
  {
    id: 'all-in-one',
    name: 'All-In-One Institutional',
    segment: 'All-In-One',
    badge: 'Complete Suite • Best Value',
    description: 'Unrestricted access to Equity, F&O Derivatives, and MCX Commodities with 1-on-1 desk access.',
    features: [
      'Full Access: Equity Cash + Options + Commodities',
      '1-on-1 Dedicated Senior Research Analyst',
      'Personalized Portfolio Risk Audit & Restructuring',
      'Custom Hedging & Positional Derivative Strategies',
      'Priority Call Desk during Live Market Hours',
      'Weekly Strategy Video Review Calls',
    ],
    pricing: {
      'Monthly': 25999,
      '6 Months': 65999,
      '1 Year': 120999,
    },
  },
];

export const VALID_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  GAIN15: {
    discountPercent: 15,
    description: 'Flat 15% Special Advisory Discount',
  },
};

export const PAYMENT_CONFIG = {
  recipientName: 'Deepesh Mandloi',
  upiId: '9907278129@kotakbank',
  upiNumber: '9907278129',
  bankName: 'Kotak Mahindra Bank',
  accountNumber: '9907278129',
  ifsc: 'KKBK0000123',
  accountName: 'Deepesh Mandloi',
  whatsappNumber: '919907278129',
};
