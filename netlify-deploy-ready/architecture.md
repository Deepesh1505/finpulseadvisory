# ARCHITECTURE.md — System Architecture & Technical Specifications

## 1. Document Purpose
This document outlines the software architecture, tech stack components, data flow, third-party integrations, and infrastructure setup for the Stock Market Advisory Website.

---

## 2. Tech Stack Overview
- **Frontend & Server Engine:** Next.js (React) + Node.js (App Router / Pages API)
- **Styling & UI Theme:** Tailwind CSS (Supporting dynamic `#0F172A` Dark Mode & `#ECFDF5` Light Mode)
- **Database:** Supabase / PostgreSQL (Storing client inquiry leads & admin user credentials)
- **Excel Parser:** `xlsx` (SheetJS) package for dynamic performance sheet uploading
- **Deployment & Hosting:** Vercel / Netlify (CI/CD connected to Git repository)

---

## 3. Free Live Data Integrations

### 3.1 Live Stock Ticker
- **Provider:** TradingView Embed Ticker Tape Widget.
- **Data Range:** NIFTY 50, BANK NIFTY, SENSEX, and top equity instruments.
- **Cost Structure:** $0 / Free Embed.

### 3.2 Market Impact News Sidebar
- **Source:** RSS Feeds from Economic Times / Moneycontrol Financial Feeds.
- **Parser Engine:** Node.js backend API using `rss-parser`.
- **Caching:** In-memory / SWR caching with 15-minute refresh cycles to avoid rate limits.

---

## 4. Admin Security & Routing (`/admin`)
- Direct access via `yourwebsite.com/admin`.
- Authentication handled via JSON Web Tokens (JWT) / Session Cookies.
- Protected API Endpoints:
  - `GET /api/admin/leads` -> Returns all captured inquiry leads.
  - `GET /api/admin/export` -> Generates downloadable Excel (`.xlsx`) sheet.
  - `POST /api/admin/upload-performance` -> Parses uploaded trade sheet and updates client performance table.

---

## 5. System Data Flow Diagram
1. **Visitor:** Homepage Request -> TradingView Ticker loads -> RSS News API fetches latest headlines.
2. **Inquiry Submission:** Form Submit -> Server API -> Saved to Supabase DB -> Redirected to Payment QR Page.
3. **Admin Operation:** Accesses `/admin` -> Authenticates -> Views Leads -> Clicks "Export to Excel" -> Client Downloads File.