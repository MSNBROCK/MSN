# MSN Market Terminal 

A static, single-page HTML. Upload `index.html`, `README.md`, and `.nojekyll` .

## Included
- Professional login UI with 14 fictional/sample client profiles and a separate  admin role
- Client overview with  balance, investment, profit/loss, pending payment, next allocation, and shares owned
- Admin client-record editing and IPO order review/status controls
- Jio IPO *simulation* with user-requested  price range ₹1,165–₹1,300 and maximum 6 shares per order
- Fictional UTR/reference input, duplicate-reference check, local order history, and simulated 20-month unlock date
- NIFTY 50, SENSEX, Bitcoin, and Ethereum chart selector via embedded TradingView widgets (internet required; data timing depends on provider)
- Local withdrawal requests and transaction history
- CSV exports for clients, orders, and a combined financial report; JSON backup and local reset
- Browser `localStorage`; no server-side database

## Demo sign-in
- Admin: Username `Admin`, Client ID `MSN`, Password `ADMIN`
- Client example: Username ``, Client ID `BRCLT`, Password `XXXX`


## Important limitations
- This is a static browser , not a secure financial platform.  credentials are visible in the page source and browser storage is editable.
- Data exists only in the same browser profile and site origin.

