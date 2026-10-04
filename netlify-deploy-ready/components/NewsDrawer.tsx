'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper, X, ExternalLink, RefreshCw, TrendingUp, TrendingDown, Radio } from 'lucide-react';
import { NewsItem } from '@/lib/news';

export default function NewsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data && data.news) {
        setNews(data.news);
      }
    } catch (e) {
      console.error('Failed to fetch news', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {/* Floating Trigger Pill on Right Margin (Groww-Style) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-slate-900 text-white dark:bg-emerald-600 dark:text-white px-3.5 py-3 rounded-l-2xl shadow-xl flex items-center gap-2 border-l border-t border-b border-emerald-500/30 hover:pr-5 transition-all group"
        aria-label="Open Market Impact News"
      >
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </div>
        <Newspaper className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide uppercase writing-mode-vertical [writing-mode:vertical-rl] rotate-180 hidden sm:inline-block">
          Market News
        </span>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Market Impact News</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live Indian financial & index triggers</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchNews}
              disabled={loading}
              title="Refresh News"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body / Feed List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {news.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No live updates at the moment.
            </div>
          )}

          {news.map((item) => (
            <article
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {item.source} • {item.pubDate}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                    item.sentiment === 'Bullish'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : item.sentiment === 'Bearish'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                  }`}
                >
                  {item.sentiment === 'Bullish' && <TrendingUp className="w-3 h-3" />}
                  {item.sentiment === 'Bearish' && <TrendingDown className="w-3 h-3" />}
                  {item.sentiment}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                {item.title}
              </h4>

              {item.summary && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                  {item.summary}
                </p>
              )}

              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950">
          News sourced from certified financial RSS feeds • 15 min cache cycle
        </div>
      </div>
    </>
  );
}
