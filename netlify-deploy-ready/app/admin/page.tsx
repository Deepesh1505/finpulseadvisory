'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  User,
  LogOut,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  Phone,
  MessageCircle,
  Eye,
  TrendingUp,
  Download,
  Search,
  Filter,
  RefreshCw,
  BarChart2,
  Calendar,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { Lead, PerformanceRecord } from '@/lib/store';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'leads' | 'upload' | 'performance' | 'analytics'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [performance, setPerformance] = useState<PerformanceRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters for leads
  const [leadSearch, setLeadSearch] = useState('');
  const [leadSegmentFilter, setLeadSegmentFilter] = useState('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');

  // Excel upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  // Check auth session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadDashboardData();
        }
      } catch (e) {
        console.error('Auth check error', e);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [leadsRes, perfRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/performance'),
      ]);
      const leadsData = await leadsRes.json();
      const perfData = await perfRes.json();

      if (leadsData.success) setLeads(leadsData.leads);
      if (perfData.success) setPerformance(perfData.records);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        toast.success('Welcome back, Admin!');
        loadDashboardData();
      } else {
        toast.error(data.message || 'Invalid login credentials.');
      }
    } catch {
      toast.error('Network error during login.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setIsAuthenticated(false);
      toast.success('Logged out successfully.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (id: string | number, newStatus: 'New' | 'Contacted' | 'Converted') => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Lead status updated to ${newStatus}`);
        setLeads((prev) =>
          prev.map((item) => (String(item.id) === String(id) ? { ...item, status: newStatus } : item))
        );
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleExportExcel = () => {
    window.open('/api/admin/export', '_blank');
    toast.success('Generating and downloading Excel report...');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadResult(null);
    }
  };

  const handleUploadTrackSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an Excel (.xlsx) file to upload.');
      return;
    }

    setUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/admin/upload-performance', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message);
        setUploadResult(data.message);
        setSelectedFile(null);
        loadDashboardData();
      } else {
        toast.error(data.message || 'Upload failed.');
        setUploadResult(`Error: ${data.message}`);
      }
    } catch {
      toast.error('Network error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const query = leadSearch.toLowerCase();
    const matchesSearch =
      lead.full_name.toLowerCase().includes(query) ||
      lead.phone_number.toLowerCase().includes(query) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.plan_name && lead.plan_name.toLowerCase().includes(query));

    const matchesSegment =
      leadSegmentFilter === 'All' || lead.trading_segment.includes(leadSegmentFilter);
    const matchesStatus = leadStatusFilter === 'All' || lead.status === leadStatusFilter;

    return matchesSearch && matchesSegment && matchesStatus;
  });

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-800 border border-emerald-500/40 p-2 flex items-center justify-center shadow-lg">
              <Image
                src="/logo.png"
                alt="FinPulse Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Fin<span className="text-emerald-500">PULSE</span> Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized personnel access only • High-security terminal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 space-y-0.5">
              <div>Default credential configured in <code className="text-emerald-400">.env.local</code>:</div>
              <div>Username: <span className="text-white font-mono font-bold">admin</span></div>
              <div>Password: <span className="text-white font-mono font-bold">FinPulse@2026</span></div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 transition active:scale-98 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-emerald-400 transition inline-flex items-center gap-1"
            >
              <span>← Return to FinPulse Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-emerald-500/40 p-1 flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">FinPulse Management Portal</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Deepesh Mandloi Advisory System</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 transition border border-rose-800/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <span className="text-xs uppercase font-semibold text-slate-400">Total Leads Captured</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
              {leads.length}
            </div>
            <span className="text-[11px] text-emerald-400 mt-0.5 block">{newLeadsCount} pending follow-up</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <span className="text-xs uppercase font-semibold text-slate-400">Converted Clients</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1">
              {convertedCount}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Active paid subscriptions</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <span className="text-xs uppercase font-semibold text-slate-400">Track Record Trades</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
              {performance.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Published recommendations</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <span className="text-xs uppercase font-semibold text-slate-400">Accuracy Benchmark</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-500 mt-1">
              89.6%
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Target hit ratio</span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Leads Management ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Track Sheet (.xlsx)</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'performance'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trade Performance Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Visitor Analytics</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            
            {/* Filter & Action Toolbar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, email..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <select
                  value={leadSegmentFilter}
                  onChange={(e) => setLeadSegmentFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="All">All Segments</option>
                  <option value="F&O">F&O Options</option>
                  <option value="Equity">Equity Cash</option>
                  <option value="Commodity">Commodity</option>
                </select>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={loadDashboardData}
                  disabled={loadingData}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
                  title="Refresh Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-white shadow-md shadow-emerald-500/20 transition flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export to Excel (.xlsx)</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-850 uppercase text-slate-400 font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Inquiry Time</th>
                    <th className="py-3 px-4">Investor Name</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Segment & Capital</th>
                    <th className="py-3 px-4">Selected Plan</th>
                    <th className="py-3 px-4">Occupation</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No leads found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/50 transition">
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                          {item.full_name}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-mono text-emerald-400 font-semibold">
                            {item.phone_number}
                          </div>
                          {item.email && (
                            <div className="text-slate-400 text-[11px]">{item.email}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-semibold text-slate-200">{item.trading_segment}</span>
                          <div className="text-amber-400 font-mono text-[11px]">
                            {item.investment_capital}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                          {item.plan_name || 'General Inquiry'}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-400">
                          {item.occupation || '-'}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(
                                item.id,
                                e.target.value as 'New' | 'Contacted' | 'Converted'
                              )
                            }
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${
                              item.status === 'Converted'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : item.status === 'Contacted'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            }`}
                          >
                            <option value="New" className="bg-slate-900 text-white">New</option>
                            <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                            <option value="Converted" className="bg-slate-900 text-white">Converted</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <a
                              href={`https://wa.me/${item.phone_number.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                                item.full_name
                              )}%2C%20this%20is%20FinPulse%20Research%20team.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${item.phone_number.replace(/\s+/g, '')}`}
                              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition"
                              title="Call Lead"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: UPLOAD TRACK SHEET (.XLSX) */}
        {activeTab === 'upload' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Upload Trade Track Sheet</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload an Excel file (.xlsx) containing historical or active stock recommendations.
                  </p>
                </div>
                <a
                  href="/api/admin/upload-performance"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Sample (.xlsx)</span>
                </a>
              </div>

              <form onSubmit={handleUploadTrackSheet} className="mt-6 space-y-6">
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-8 text-center bg-slate-850/50 transition">
                  <UploadCloud className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-sm font-bold text-white hover:text-emerald-400">
                      Click to choose an Excel file
                    </span>
                    <span className="text-xs text-slate-400 block mt-1">
                      Supports .xlsx, .xls, and .csv formats
                    </span>
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {selectedFile && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-mono inline-block">
                      Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </div>
                  )}
                </div>

                {uploadResult && (
                  <div className={`p-4 rounded-xl text-xs font-semibold ${
                    uploadResult.startsWith('Error')
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {uploadResult}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50 flex items-center gap-2 text-sm"
                  >
                    {uploading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileSpreadsheet className="w-4 h-4" />
                    )}
                    <span>Import & Update Performance Table</span>
                  </button>
                </div>
              </form>

              {/* Instructions */}
              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="font-semibold text-white">Expected Column Headers in Excel:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <span className="p-1.5 rounded bg-slate-800">Trade Date</span>
                  <span className="p-1.5 rounded bg-slate-800">Symbol</span>
                  <span className="p-1.5 rounded bg-slate-800">Segment (F&O / Equity)</span>
                  <span className="p-1.5 rounded bg-slate-800">Buy Price</span>
                  <span className="p-1.5 rounded bg-slate-800">Target Price</span>
                  <span className="p-1.5 rounded bg-slate-800">Stop Loss</span>
                  <span className="p-1.5 rounded bg-slate-800">Exit Price</span>
                  <span className="p-1.5 rounded bg-slate-800">Status (Target Hit)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PERFORMANCE MANAGER */}
        {activeTab === 'performance' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Live Website Performance Records</h3>
                <p className="text-xs text-slate-400">
                  Total of {performance.length} active records displayed on the public landing page.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-white transition flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload New Sheet</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-850 font-sans uppercase text-slate-400 font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4 font-sans">Segment</th>
                    <th className="py-3 px-4 text-right">Entry</th>
                    <th className="py-3 px-4 text-right">Target</th>
                    <th className="py-3 px-4 text-right">Stop Loss</th>
                    <th className="py-3 px-4 text-right">Exit</th>
                    <th className="py-3 px-4 text-center font-sans">Status</th>
                    <th className="py-3 px-4 text-right">P&L %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {performance.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 px-4 text-slate-400">{p.trade_date}</td>
                      <td className="py-2.5 px-4 font-bold text-white">{p.symbol}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-300">{p.segment}</td>
                      <td className="py-2.5 px-4 text-right">₹{p.buy_price}</td>
                      <td className="py-2.5 px-4 text-right text-emerald-400">₹{p.target_price}</td>
                      <td className="py-2.5 px-4 text-right text-rose-400">₹{p.stop_loss}</td>
                      <td className="py-2.5 px-4 text-right">₹{p.exit_price || '-'}</td>
                      <td className="py-2.5 px-4 text-center font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Target Hit'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className={`py-2.5 px-4 text-right font-bold ${
                        p.pnl_percentage > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {p.pnl_percentage > 0 ? `+${p.pnl_percentage}%` : `${p.pnl_percentage}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: VISITOR ANALYTICS PANEL */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Traffic Source Breakdown */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-4">Traffic Acquisition Sources</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 text-slate-300">
                      <span>Google Ads (Search & Discovery)</span>
                      <span className="font-bold text-white">44%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[44%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-300">
                      <span>Meta Ads (Instagram / FB)</span>
                      <span className="font-bold text-white">32%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-teal-400 h-full w-[32%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-300">
                      <span>WhatsApp Direct Community</span>
                      <span className="font-bold text-white">16%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-[#25D366] h-full w-[16%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-slate-300">
                      <span>Organic Search & Telegram</span>
                      <span className="font-bold text-white">8%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[8%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Segment Popularity */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-4">Top Inquired Segments</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-850">
                    <span className="text-slate-300">BankNifty / Nifty Options</span>
                    <span className="font-mono font-bold text-emerald-400">58% of Leads</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-850">
                    <span className="text-slate-300">Equity Cash & Swing</span>
                    <span className="font-mono font-bold text-teal-400">24% of Leads</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-850">
                    <span className="text-slate-300">MCX Commodities</span>
                    <span className="font-mono font-bold text-amber-400">12% of Leads</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-850">
                    <span className="text-slate-300">HNI Portfolio Hedging</span>
                    <span className="font-mono font-bold text-purple-400">6% of Leads</span>
                  </div>
                </div>
              </div>

              {/* Conversion Stats */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-4">Conversion Health</h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <span className="text-xs text-slate-400">Lead to Payment Unlock Rate</span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                      78.2%
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Avg Session Time:</span>
                      <span className="font-semibold text-white">3m 42s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bounce Rate:</span>
                      <span className="font-semibold text-white">28.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp Click-throughs:</span>
                      <span className="font-semibold text-white">142 clicks/week</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
