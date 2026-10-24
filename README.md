# 🌌 Stories — Surrealist Classic Literature Reader

An atmospheric, surrealist web reading portal crafted for timeless classics and public-domain literature. Designed with inspiration from **René Magritte**, **Salvador Dalí**, and **Giorgio de Chirico**, this reader blends literary dignity with dreamlike visual exploration.

- **Production Domain**: [stories.7400000.xyz](https://stories.7400000.xyz)
- **Repository**: [https://github.com/rubanbalaji-g/stories](https://github.com/rubanbalaji-g/stories)
- **Hosting**: Cloudflare Pages (Free Tier, Unlimited Bandwidth)

---

## 🎨 Architectural Documentation
For both human engineers and AI agents, the codebase is governed by dedicated specifications:

- 📖 **[`design.md`](./design.md)**: Aesthetic principles, surrealist color palettes, typography rules (EB Garamond & Noto Sans Tamil), and anti-AI-slop design heuristics.
- 📜 **[`instructions.md`](./instructions.md)**: AI agent playbook for ingesting, structuring, and formatting new public-domain books and Tamil translations.
- 📐 **[`books.schema.json`](./books.schema.json)**: JSON schema validating master book catalogs and chapter manifests.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/rubanbalaji-g/stories.git
cd stories

# Install dependencies
npm install

# Start local surrealist reading canvas
npm run dev
```

Build for production:
```bash
npm run build
```

---

## ☁️ Deploying to Cloudflare Pages (`stories.7400000.xyz`)

1. Open your **Cloudflare Dashboard** → **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**.
2. Select repository: `rubanbalaji-g/stories` (Private).
3. Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build output directory**: `dist`
4. Custom Domain Setup:
   - In your Cloudflare Pages project settings, click **Custom Domains** → **Set up a custom domain**.
   - Enter `stories.7400000.xyz`.
   - If `7400000.xyz` DNS is hosted on Cloudflare, it configures the DNS CNAME and auto-renewing SSL certificate in 1 click automatically.

---

## 🛠️ Tech Stack
- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS + Custom Surrealist Motion Utilities
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Cinzel`, `Playfair Display`, `EB Garamond`, `Noto Sans Tamil`)
- **Hosting Target**: Cloudflare Pages Edge Network
