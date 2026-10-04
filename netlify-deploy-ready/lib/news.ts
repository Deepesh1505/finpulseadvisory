import Parser from 'rss-parser';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  summary?: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'n-1',
    title: 'Nifty 50 surges past key hurdle; banking & auto stocks lead rally ahead of RBI policy',
    link: 'https://www.moneycontrol.com/news/business/markets/',
    pubDate: '15 mins ago',
    source: 'Moneycontrol',
    sentiment: 'Bullish',
    summary: 'Institutional buying and strong FII inflows push benchmark indices to fresh momentum highs with heavy call unwinding observed at 25,800 strike.'
  },
  {
    id: 'n-2',
    title: 'Tata Motors PV & EV division reports record monthly retail dispatches; margin expansion eyed',
    link: 'https://economictimes.indiatimes.com/markets',
    pubDate: '32 mins ago',
    source: 'Economic Times',
    sentiment: 'Bullish',
    summary: 'Strong order books for flagship EV models and commercial vehicle recovery boost analyst target upgrades across brokerage houses.'
  },
  {
    id: 'n-3',
    title: 'Crude Oil dips below $72 as global inventory figures swell; MCX contracts face resistance',
    link: 'https://www.moneycontrol.com/news/business/commodities/',
    pubDate: '1 hour ago',
    source: 'LiveMint',
    sentiment: 'Neutral',
    summary: 'OPEC+ supply trajectory and US inventory build-up keep commodity volatility high; intraday traders advised trailing stop losses.'
  },
  {
    id: 'n-4',
    title: 'FIIs turn net buyers in Indian equities with ₹2,450 Cr purchase; DIIs absorb midcap profit booking',
    link: 'https://economictimes.indiatimes.com/markets',
    pubDate: '2 hours ago',
    source: 'Economic Times',
    sentiment: 'Bullish',
    summary: 'Foreign Institutional Investors reverse selling streak, accumulating bluechip banking and metal scrips in large block trades.'
  },
  {
    id: 'n-5',
    title: 'Bank Nifty options show heavy put writing at 53,500; indicates robust weekly support floor',
    link: 'https://www.moneycontrol.com/news/business/markets/',
    pubDate: '3 hours ago',
    source: 'Moneycontrol',
    sentiment: 'Bullish',
    summary: 'Derivative setup points toward strong bullish bias as private banking giants maintain price action above 20-day exponential moving average.'
  }
];

let cachedNews: { data: NewsItem[]; timestamp: number } | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export async function getMarketNews(): Promise<NewsItem[]> {
  if (cachedNews && Date.now() - cachedNews.timestamp < CACHE_DURATION_MS) {
    return cachedNews.data;
  }

  const parser = new Parser({
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) FinPulseMarketReader/1.0',
    },
  });

  const feedUrls = [
    'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
    'https://www.moneycontrol.com/rss/MCtopnews.xml',
  ];

  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      if (feed && feed.items && feed.items.length > 0) {
        const items: NewsItem[] = feed.items.slice(0, 10).map((item, index) => {
          const title = item.title || '';
          let sentiment: 'Bullish' | 'Bearish' | 'Neutral' = 'Neutral';
          const lower = title.toLowerCase();
          if (lower.includes('surge') || lower.includes('gain') || lower.includes('high') || lower.includes('rally') || lower.includes('buy') || lower.includes('jump')) {
            sentiment = 'Bullish';
          } else if (lower.includes('fall') || lower.includes('drop') || lower.includes('plunge') || lower.includes('down') || lower.includes('loss') || lower.includes('sell')) {
            sentiment = 'Bearish';
          }

          return {
            id: `rss-${index}-${Date.now()}`,
            title: title.replace(/&amp;/g, '&'),
            link: item.link || '#',
            pubDate: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live',
            source: url.includes('economictimes') ? 'Economic Times' : 'Moneycontrol',
            sentiment,
            summary: item.contentSnippet ? item.contentSnippet.slice(0, 150) + '...' : undefined,
          };
        });

        cachedNews = { data: items, timestamp: Date.now() };
        return items;
      }
    } catch {
      // Continue to next feed or fallback
    }
  }

  return FALLBACK_NEWS;
}
