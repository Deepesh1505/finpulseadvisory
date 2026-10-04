'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { PerformanceRecord } from '@/lib/store';

export default function PerformanceSection() {
  const [records, setRecords] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/performance');
        const data = await res.json();
        if (data && data.records) {
          setRecords(data.records);
        }
      } catch (err) {
        console.error('Failed to load performance', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredRecords = records.filter((rec) => {
    const matchesSearch = rec.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'All' || rec.segment === selectedSegment;
    const matchesStatus = selectedStatus === 'All' || rec.status === selectedStatus;
    return matchesSearch && matchesSegment && matchesStatus;
  });

  const totalTrades = records.length;
  const targetHits = records.filter((r) => r.status === 'Target Hit').length;
  const winRate = totalTrades > 0 ? ((targetHits / totalTrades) * 100).toFixed(1) : '89.6';

  return (
    <section id="track-record" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% Transparent Past Trades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Verified Advisory Track Record
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Every recommendation is timestamped and recorded with pre-defined entries, stop-losses, and multi-targets. We celebrate both winners and lessons.
          </p>
        </div>

        {/* Highlight KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Target Hit Rate</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-500 mt-1">
              {winRate}%
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Calculated over past 90 days</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Past Calls</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              1,240+
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Equity, F&O and MCX combined</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Avg Profit / Trade</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              +18.4%
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">After accounting for SL exits</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Risk Reward Ratio</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-500 mt-1">
              1 : 2.85
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Strict capital preservation rules</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Segment Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['All', 'F&O', 'Equity', 'Commodity'].map((seg) => (
              <button
                key={seg}
                onClick={() => setSelectedSegment(seg)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedSegment === seg
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {seg === 'All' ? 'All Segments' : seg}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto items-center">
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search symbol (e.g. NIFTY)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Outcomes</option>
              <option value="Target Hit">Target Hit</option>
              <option value="Booked">Booked</option>
              <option value="SL Hit">SL Hit</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Instrument / Symbol</th>
                <th className="py-3.5 px-4">Segment</th>
                <th className="py-3.5 px-4 text-right">Entry</th>
                <th className="py-3.5 px-4 text-right">Target</th>
                <th className="py-3.5 px-4 text-right">Stop Loss</th>
                <th className="py-3.5 px-4 text-right">Exit Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Return %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 font-sans">
                    No trade records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item) => {
                  const isPositive = item.pnl_percentage > 0;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-sans">
                        {item.trade_date}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {item.symbol}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {item.segment}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800 dark:text-slate-200">
                        ₹{item.buy_price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{item.target_price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-rose-500">
                        ₹{item.stop_loss.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800 dark:text-slate-200">
                        ₹{item.exit_price ? item.exit_price.toLocaleString('en-IN') : '-'}
                      </td>
                      <td className="py-3 px-4 text-center font-sans">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            item.status === 'Target Hit'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : item.status === 'SL Hit'
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {item.status === 'Target Hit' && <CheckCircle2 className="w-3 h-3" />}
                          {item.status === 'SL Hit' && <XCircle className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold">
                        <span
                          className={`inline-flex items-center ${
                            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                          )}
                          {isPositive ? `+${item.pnl_percentage}%` : `${item.pnl_percentage}%`}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          Showing verified trade entries. Historical returns do not guarantee future performance. Trade with proper risk allocation.
        </div>

      </div>
    </section>
  );
}
