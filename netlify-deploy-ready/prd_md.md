# PRD.md — Product Requirement Document

## 1. Document Purpose
This document defines the product scope, target audience, core features, business requirements, and operational workflows for the Stock Market Advisory Website. It serves as the single source of truth for design, architecture, and development.

---

## 2. Target Audience
- **Retail Traders & Investors:** Individuals facing losses in the stock market looking for consistent profit strategies.
- **Beginner Investors/Traders:** Newcomers seeking guidance, stock recommendations, and structured advisory.
- **Specific Segment Traders:** 
  - Equity Investors / Swing Traders
  - F&O (Futures & Options) Traders seeking tips and strike-price recommendations
  - Commodity Traders (MCX market participants)

---

## 3. Core Features & Functional Requirements

### 3.1 Top Live Stock Ticker Bar
- A scrolling horizontal ticker band fixed at the top of the website.
- Displays real-time or near-real-time index/stock data (e.g., NIFTY 50, BANK NIFTY, SENSEX, key stocks).

### 3.2 Live Market Impact News Popup / Feed Box
- Popup modal or fixed news feed component displaying top breaking financial headlines that impact the market.
- Auto-updated via free news feeds/APIs.

### 3.3 Lead Capture Inquiry Form
- Interactive contact form collecting detailed client information:
  - Full Name
  - Mobile / Phone Number
  - Email Address
  - Occupation
  - Trading Segment Interest (Equity, F&O Options, Commodity, Long-Term Investment)
  - Trading/Investment Capital Band (e.g., < ₹1 Lakh, ₹1–5 Lakhs, ₹5 Lakhs+)
- Inquiries instantly saved to database and sent via email notification.

### 3.4 Custom Invoicing & Offline/UPI Payment Portal
- Dedicated Pricing & Payment section displaying advisory plan details.
- Clear instructions for custom offline payment:
  - Dynamic/Static UPI QR Code display
  - UPI ID & Direct Bank Account Transfer details
  - Payment confirmation upload / transaction ref input option for clients.

### 3.5 Quick Communication Channels
- Direct **Click-to-Call** button.
- Floating **WhatsApp Live Chat** widget & group joining call-to-actions (CTAs).

### 3.6 SEBI & Risk Compliance Footer
- Mandatory risk disclosure statement for F&O / equity trading.
- SEBI Registration Number placeholder / Disclaimers on all advisory pages.

### 3.7 Admin Panel & Lead Analytics
- **Secure Admin Authentication:** Protected login for site owner.
- **Lead Dashboard:** View, filter, and search all incoming inquiry forms in real-time.
- **Export to Excel/CSV:** One-click download of all lead details into Excel format.
- **Visitor Analytics:** 
  - Total visitor count and live session tracking.
  - Source tracking (identifying visitors coming from Facebook/Google Ads vs organic).
  - Pageview activity (which pages were viewed and time spent per page).

---

## 4. Scope & Page Hierarchy
1. **Home Page:** Hero section, live scrolling ticker, lead inquiry form, core service highlights, live market news popup, pricing summary, and quick contact options.
2. **About Us:** Advisory experience, strategy philosophy, market expertise, and compliance information.
3. **Services:** Detailed breakdown of Equity, Option Tips/Recommendations, and Commodity Advisory packages.
4. **Pricing & Custom Payment:** Advisory plans, pricing matrix, bank transfer/UPI details, QR code, and payment confirmation submission.
5. **Testimonials / Client Success Stories:** Client reviews, verified performance reports, and feedback.
6. **Contact Us:** Interactive inquiry form, address, map, direct WhatsApp chat, and call links.
7. **Admin Dashboard (Protected):** Lead management, analytics, visitor tracking, and Excel export tool.

---

## 5. Key Assumptions
- **Data Feeds:** Live stock prices and news feeds will utilize reliable free widgets (e.g., TradingView, RSS feeds, or public financial APIs) to avoid recurring software license costs.
- **Payments:** No dynamic payment gateway (Stripe/Razorpay) integration is required initially; manual UPI/Bank transfer confirmation will be used.
- **Admin Access:** Only the administrator/owner will have login credentials to view analytics and export leads.

---

## 6. Unresolved Questions
1. **SEBI Registration Details:** Do you have an active SEBI Registered Investment Advisor (RIA) or Research Analyst (RA) registration number to display, or should we include standard disclaimers for non-SEBI advisory/educational guidance?
2. **News Popup Trigger:** Should the breaking news popup trigger automatically on page load (once per session) or stay as a floating clickable news badge?