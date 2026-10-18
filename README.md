# MSN Market Terminal — Browser-only College Demo

A static, single-page HTML college-project demo. Upload `index.html`, `README.md`, and `.nojekyll` to the root of a GitHub repository and enable GitHub Pages.

## Included
- Professional login UI with 14 fictional/sample client profiles and a separate demo admin role
- Client overview with sample balance, investment, profit/loss, pending payment, next allocation, and shares owned
- Admin client-record editing and demo IPO order review/status controls
- Jio IPO *simulation* with user-requested demo price range ₹1,165–₹1,300 and maximum 6 shares per order
- Fictional UTR/reference input, duplicate-reference check, local order history, and simulated 20-month unlock date
- NIFTY 50, SENSEX, Bitcoin, and Ethereum chart selector via embedded TradingView widgets (internet required; data timing depends on provider)
- Local demo withdrawal requests and transaction history
- CSV exports for clients, orders, and a combined financial report; JSON backup and local reset
- Browser `localStorage`; no server-side database

## Demo sign-in
- Admin: Username `Admin`, Client ID `MSN-ADMIN`, Password `ADMIN-DEMO-2026`
- Client example: Username `Shreyas`, Client ID `BRCLT-45871293`, Password `SHR129`

All accounts, amounts, and references are fictional demonstration data. The ₹1,165–₹1,300 range is a user-requested simulation range, not an official IPO price band. UTRs are not verified. No real payment, investment, IPO application, stock order, allocation, or withdrawal is performed.

## Important limitations
- This is a static browser demo, not a secure financial platform. Demo credentials are visible in the page source and browser storage is editable.
- Data exists only in the same browser profile and site origin. It will not sync between users, browsers, or devices.
- Do not enter real passwords, bank details, UTRs, or personal/financial information. A real service requires secure server-side authentication, database, audit logs, payment/broker integrations, and appropriate legal/compliance review.
