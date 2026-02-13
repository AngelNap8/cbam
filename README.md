# CBAM Calculator Portal

Free EU Carbon Border Adjustment Mechanism cost estimation tool for importers.

**Domain:** cbam-calculator.eu

## Quick Start (GitHub Codespace)

### 1. Upload and Extract

Upload this folder to your GitHub Codespace repository.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to preview the site.

### 4. Build for Production

```bash
npm run build
```

This generates a static `out/` folder ready for deployment.

---

## Deploy to Cloudflare Pages

### Option A: Direct Upload (Recommended)

1. Run `npm run build` in your Codespace
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
3. Create new project → Direct Upload
4. Upload the entire `out/` folder
5. Set custom domain: `cbam-calculator.eu`

### Option B: Git Integration

1. Connect your GitHub repo to Cloudflare Pages
2. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: 18+

---

## Project Structure

```
cbam-calculator/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── calculator/page.tsx   # CBAM Cost Calculator (main tool)
│   │   ├── hs-lookup/page.tsx    # HS Code Search
│   │   ├── compliance/page.tsx   # Timeline & Deadlines
│   │   ├── resources/page.tsx    # FAQ & Glossary
│   │   ├── contact/page.tsx      # Contact Form
│   │   ├── privacy/page.tsx      # Privacy Policy
│   │   ├── terms/page.tsx        # Terms of Use
│   │   ├── disclaimer/page.tsx   # Legal Disclaimer
│   │   ├── layout.tsx            # Root Layout
│   │   └── globals.css           # Design System
│   └── components/
│       └── layout/
│           ├── Header.tsx
│           └── Footer.tsx
├── public/
│   ├── llms.txt                  # AI Agent Manifest
│   ├── sitemap.xml               # SEO Sitemap
│   └── robots.txt                # Crawler Rules
├── next.config.mjs               # Static Export Config
├── tailwind.config.ts            # Theme & Colors
└── package.json
```

---

## Forms Integration

Lead capture forms are integrated with **Formspree**.

- Form ID: `mjggvlew`
- Endpoint: `https://formspree.io/f/mjggvlew`

To use your own Formspree:
1. Create a form at [formspree.io](https://formspree.io)
2. Replace `mjggvlew` with your form ID in:
   - `src/app/calculator/page.tsx`
   - `src/app/contact/page.tsx`

---

## Features

- ✅ Multi-step CBAM Cost Calculator
- ✅ 80+ Searchable HS Codes
- ✅ Compliance Timeline & Countdown
- ✅ FAQ & Glossary
- ✅ Lead Capture Forms (Formspree)
- ✅ AI Agent Optimization (llms.txt)
- ✅ SEO Optimized (Schema.org, Sitemap)
- ✅ Mobile Responsive
- ✅ GDPR-Compliant Privacy Policy
- ✅ Static Export (Cloudflare Pages ready)

---

## CBAM Data Sources

Default emission values and regulatory information based on:
- EU CBAM Regulation (EU) 2023/956
- European Commission guidance documents
- EU ETS reference prices

**Disclaimer:** This tool provides estimates only. Not legal/tax advice.

---

## License

MIT License - Built for portfolio/flip purposes.
