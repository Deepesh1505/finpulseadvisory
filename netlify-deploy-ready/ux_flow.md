# UX_FLOWS.md — User Experience & Admin Workflows

## 1. Visitor Lead & Payment Gated Flow
1. Visitor lands on Home Page -> Views live stock ticker & advisory performance banner.
2. Visitor clicks "Get Advisory / Buy Plan" CTA.
3. **Step 1 Modal/Form:** Asks for Name, Mobile, Email, Occupation, Trading Segment & Capital.
4. Visitor submits form -> Lead data instantly saved to DB & Admin notified.
5. **Step 2 Screen:** Instantly unlocks custom payment page with UPI QR code, UPI ID, and Bank details for immediate transfer.

---

## 2. Floating News Sidebar Flow
1. Floating "Market Impact News" widget anchored to the right side of the screen.
2. Displays real-time live stock news headlines from financial RSS feeds.
3. Clicking any news item slides open a detailed side drawer without navigating away from the page.

---

## 3. Admin Authentication & Management Flow (`/admin`)
1. User types `yourwebsite.com/admin` in browser.
2. System checks authentication state:
   - If **unauthenticated**: Renders clean Admin Login Modal (`User ID` + `Password`).
   - If **authenticated**: Directs to `/admin/dashboard`.
3. Admin inputs credentials (`admin` / secure password) -> Logged into Dashboard.
4. **Dashboard Features:**
   - Real-time Lead Table with search/filter.
   - **"Export to Excel"** button downloads current leads into `.xlsx` / `.csv`.
   - **"Upload Track Sheet"** lets admin upload Excel files containing trade recommendations to automatically update website performance pages.
   - **Visitor Analytics Panel** shows live online traffic, total session time, and ad traffic sources.