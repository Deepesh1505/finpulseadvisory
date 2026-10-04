import fs from 'fs';
import path from 'path';

export interface Lead {
  id: string | number;
  full_name: string;
  phone_number: string;
  email?: string;
  occupation?: string;
  trading_segment: string;
  investment_capital: string;
  status: 'New' | 'Contacted' | 'Converted';
  created_at: string;
  plan_name?: string;
}

export interface PerformanceRecord {
  id: string | number;
  trade_date: string;
  symbol: string;
  segment: 'Equity' | 'F&O' | 'Commodity';
  buy_price: number;
  target_price: number;
  stop_loss: number;
  exit_price?: number;
  status: 'Target Hit' | 'SL Hit' | 'Booked' | 'Active';
  pnl_percentage: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const PERFORMANCE_FILE = path.join(DATA_DIR, 'performance.json');

const INITIAL_PERFORMANCE: PerformanceRecord[] = [
  {
    id: 'PR-101',
    trade_date: '2026-09-28',
    symbol: 'BANKNIFTY 54200 CE',
    segment: 'F&O',
    buy_price: 320,
    target_price: 580,
    stop_loss: 240,
    exit_price: 582,
    status: 'Target Hit',
    pnl_percentage: 81.87,
  },
  {
    id: 'PR-102',
    trade_date: '2026-09-26',
    symbol: 'TATA MOTORS',
    segment: 'Equity',
    buy_price: 940,
    target_price: 1045,
    stop_loss: 895,
    exit_price: 1042,
    status: 'Target Hit',
    pnl_percentage: 10.85,
  },
  {
    id: 'PR-103',
    trade_date: '2026-09-24',
    symbol: 'NIFTY 25800 PE',
    segment: 'F&O',
    buy_price: 145,
    target_price: 240,
    stop_loss: 110,
    exit_price: 238,
    status: 'Target Hit',
    pnl_percentage: 64.13,
  },
  {
    id: 'PR-104',
    trade_date: '2026-09-22',
    symbol: 'GOLD MINI (MCX)',
    segment: 'Commodity',
    buy_price: 74200,
    target_price: 75800,
    stop_loss: 73600,
    exit_price: 75650,
    status: 'Booked',
    pnl_percentage: 1.95,
  },
  {
    id: 'PR-105',
    trade_date: '2026-09-19',
    symbol: 'RELIANCE IND',
    segment: 'Equity',
    buy_price: 2950,
    target_price: 3180,
    stop_loss: 2860,
    exit_price: 3175,
    status: 'Target Hit',
    pnl_percentage: 7.62,
  },
  {
    id: 'PR-106',
    trade_date: '2026-09-17',
    symbol: 'FINNIFTY 24500 CE',
    segment: 'F&O',
    buy_price: 95,
    target_price: 190,
    stop_loss: 65,
    exit_price: 185,
    status: 'Target Hit',
    pnl_percentage: 94.73,
  },
  {
    id: 'PR-107',
    trade_date: '2026-09-15',
    symbol: 'CRUDE OIL (MCX)',
    segment: 'Commodity',
    buy_price: 5850,
    target_price: 6150,
    stop_loss: 5720,
    exit_price: 6120,
    status: 'Target Hit',
    pnl_percentage: 4.61,
  },
  {
    id: 'PR-108',
    trade_date: '2026-09-12',
    symbol: 'BHARTI AIRTEL',
    segment: 'Equity',
    buy_price: 1540,
    target_price: 1680,
    stop_loss: 1485,
    exit_price: 1675,
    status: 'Target Hit',
    pnl_percentage: 8.76,
  },
  {
    id: 'PR-109',
    trade_date: '2026-09-10',
    symbol: 'BANKNIFTY 53800 PE',
    segment: 'F&O',
    buy_price: 280,
    target_price: 490,
    stop_loss: 210,
    exit_price: 210,
    status: 'SL Hit',
    pnl_percentage: -25.0,
  },
  {
    id: 'PR-110',
    trade_date: '2026-09-08',
    symbol: 'STATE BANK OF INDIA',
    segment: 'Equity',
    buy_price: 785,
    target_price: 865,
    stop_loss: 755,
    exit_price: 860,
    status: 'Target Hit',
    pnl_percentage: 9.55,
  }
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LD-901',
    full_name: 'Rajesh Sharma',
    phone_number: '+91 98230 44123',
    email: 'rajesh.sharma@example.com',
    occupation: 'Business Owner',
    trading_segment: 'F&O Options',
    investment_capital: '₹5 Lakhs - ₹10 Lakhs',
    status: 'Converted',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    plan_name: 'Pro F&O Specialist',
  },
  {
    id: 'LD-902',
    full_name: 'Vikram Mehta',
    phone_number: '+91 97112 88901',
    email: 'vmehta.trader@gmail.com',
    occupation: 'IT Consultant',
    trading_segment: 'Equity Cash & Swing',
    investment_capital: '₹2 Lakhs - ₹5 Lakhs',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    plan_name: 'Basic Trader',
  },
  {
    id: 'LD-903',
    full_name: 'Ananya Deshmukh',
    phone_number: '+91 99201 33455',
    email: 'ananya.d@finmail.com',
    occupation: 'Chartered Accountant',
    trading_segment: 'Commodity (MCX)',
    investment_capital: '₹10 Lakhs+',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    plan_name: 'Elite Wealth HNI',
  },
];

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2));
  }
  if (!fs.existsSync(PERFORMANCE_FILE)) {
    fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(INITIAL_PERFORMANCE, null, 2));
  }
}

export function getLocalLeads(): Lead[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADS;
  }
}

export function saveLocalLead(lead: Lead): Lead {
  ensureDataDir();
  const leads = getLocalLeads();
  leads.unshift(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  return lead;
}

export function updateLocalLeadStatus(id: string | number, status: 'New' | 'Contacted' | 'Converted'): boolean {
  ensureDataDir();
  const leads = getLocalLeads();
  const target = leads.find((l) => String(l.id) === String(id));
  if (target) {
    target.status = status;
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return true;
  }
  return false;
}

export function getLocalPerformance(): PerformanceRecord[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(PERFORMANCE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return INITIAL_PERFORMANCE;
  }
}

export function saveLocalPerformanceRecords(records: PerformanceRecord[]): void {
  ensureDataDir();
  fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(records, null, 2));
}

export function appendLocalPerformanceRecord(record: PerformanceRecord): void {
  ensureDataDir();
  const list = getLocalPerformance();
  list.unshift(record);
  fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(list, null, 2));
}
