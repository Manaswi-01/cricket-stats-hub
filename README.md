# Cricket Stats Hub - Programmatic SEO Platform

A comprehensive cricket statistics website built with **Next.js 16**, featuring **Server-Side Rendering (SSR)**, **JSON-LD structured data**, and **programmatic SEO** optimization. This project demonstrates complete implementation of SEO best practices for a data-driven content platform.

![Cricket Stats Hub](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)

## 🎯 Project Overview

This project was built to demonstrate programmatic SEO techniques using Next.js Server-Side Rendering. It features:

- **30+ SEO-optimized pages** automatically generated from cricket data
- **15 player profiles** with detailed statistics and career achievements
- **6 international teams** with current ICC rankings and squad details
- **11 cricket matches** from 2023-2026 with full scorecards

## ✨ Key Features

### 🚀 Server-Side Rendering (SSR)
- All pages use async Server Components with `force-dynamic` rendering
- Real-time data fetching from API routes on every request
- No static generation - fresh data on every page load
- Optimized for search engine crawlers

### 📊 Comprehensive Cricket Data
- **Players**: Virat Kohli, MS Dhoni, Rohit Sharma, Jasprit Bumrah, Steve Smith, Kane Williamson, Babar Azam, Joe Root, Ben Stokes, Pat Cummins, Travis Head, Shubman Gill, Rishabh Pant, David Warner, Harry Brook
- **Teams**: India, Australia, England, Pakistan, New Zealand, South Africa
- **Matches**: World Cup Finals, Test Series, ODIs, T20Is (2023-2026)
- **Updated 2026 Statistics**: Current ICC rankings and player stats

### 🔍 SEO Optimization
- **JSON-LD Structured Data**: Schema.org Person, Athlete, SportsTeam, SportsEvent schemas
- **Dynamic Meta Tags**: Unique titles and descriptions for each page
- **OpenGraph Metadata**: Optimized for social media sharing
- **Twitter Cards**: Enhanced Twitter preview cards
- **Keyword Research**: Targeting 165K+ monthly searches for "Virat Kohli stats"
- **Clean URLs**: SEO-friendly URLs like `/players/virat-kohli`

### 🎨 Modern Design
- Responsive design (mobile, tablet, desktop)
- Gradient backgrounds and glassmorphism effects
- Interactive statistics charts
- Professional typography with clean layout
- Optimized for accessibility

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.3
- **Styling**: TailwindCSS 4
- **Charts**: Recharts 3.7.0
- **Icons**: React Icons 5.5.0
- **SEO**: next-seo 7.1.0

### Project Structure
```
src/
├── app/
│   ├── api/                  # API Routes (SSR endpoints)
│   │   ├── players/
│   │   │   ├── route.js      # GET /api/players
│   │   │   └── [id]/route.js # GET /api/players/:id
│   │   ├── teams/
│   │   └── matches/
│   ├── players/
│   │   ├── page.js           # All players listing (SSR)
│   │   └── [id]/page.js      # Individual player page (SSR)
│   ├── teams/
│   ├── matches/
│   └── page.js               # Homepage
├── components/
│   ├── schemas/              # JSON-LD Schema Components
│   │   ├── PlayerSchema.js   # Schema.org Person/Athlete
│   │   ├── TeamSchema.js     # Schema.org SportsTeam
│   │   ├── MatchSchema.js    # Schema.org SportsEvent
│   │   └── OrganizationSchema.js
│   ├── PlayerCard.js
│   ├── TeamCard.js
│   ├── StatsChart.js
│   └── Header.js, Footer.js
├── data/
│   ├── players.js            # 15 players with 2026 stats
│   ├── teams.js              # 6 teams with ICC rankings
│   └── matches.js            # 11 matches (2023-2026)
└── utils/
    └── seo.js                # SEO utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cricket-stats-hub.git

# Navigate to project directory
cd cricket-stats-hub

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Endpoints

The project includes 6 API routes for programmatic data access:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/players` | GET | Returns all 15 players |
| `/api/players/:id` | GET | Returns specific player data |
| `/api/teams` | GET | Returns all 6 teams |
| `/api/teams/:id` | GET | Returns specific team data |
| `/api/matches` | GET | Returns all 11 matches |
| `/api/matches/:id` | GET | Returns specific match data |

**Example:**
```bash
curl http://localhost:3000/api/players/virat-kohli
```

## 🔍 SEO Features

### Keyword Research
Comprehensive keyword research targeting high-volume search terms:
- "virat kohli stats" - 165,000+ monthly searches
- "ms dhoni stats" - 90,500+ monthly searches
- "cricket player stats" - 49,500+ monthly searches
- "cricket team rankings" - 33,100+ monthly searches

See [SEO_STRATEGY.md](.gemini/antigravity/brain/d2013256-54d8-4298-8837-28020c3c07a8/SEO_STRATEGY.md) for full keyword research.

### Meta Tags Implementation
Each page includes:
- Unique, keyword-rich title tags (50-60 characters)
- Descriptive meta descriptions (150-160 characters)
- OpenGraph tags for social sharing
- Twitter Card metadata
- Canonical URLs

### Structured Data
JSON-LD schemas on all content pages:
- **Player Pages**: Person + Athlete schema with career statistics
- **Team Pages**: SportsTeam schema with ICC rankings
- **Match Pages**: SportsEvent schema with scorecard data

**Validation**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📊 Programmatic SEO Pages

### Player Pages (15)
- `/players/virat-kohli` - Virat Kohli stats (165K+ searches/month)
- `/players/ms-dhoni` - MS Dhoni stats (90K+ searches/month)
- `/players/rohit-sharma` - Rohit Sharma stats (74K+ searches/month)
- `/players/jasprit-bumrah` - Jasprit Bumrah bowling stats
- + 11 more international stars

### Team Pages (6)
- `/teams/india` - India cricket team (Rank #1 Test, ODI, T20)
- `/teams/australia` - Australia (6x World Cup winners)
- `/teams/england` - England (Bazball era)
- + Pakist an, New Zealand, South Africa

### Match Pages (11)
- `/matches/ind-vs-aus-wc-final-2023` - 2023 World Cup Final
- `/matches/ind-vs-sa-t20wc-final-2024` - 2024 T20 WC Final
- `/matches/ind-vs-aus-bgt-2024-perth` - BGT 2024 Perth Test
- + 8 more recent matches

## 🎯 Assessment Requirements Met

### ✅ 1. Project Setup
- Next.js 16 with App Router for SSR
- Organized folder structure (components, pages, API routes, data)

### ✅ 2. Data Selection
- **Data Type**: Cricket statistics
- **Data Source**: Programmatic API routes with cricket data
- **Structure**: Normalized JSON with player, team, and match entities

### ✅ 3. Keyword Research & SEO
- Documented keyword research with search volumes
- Target keywords: "virat kohli stats" (165K), "cricket team rankings" (33K)
- SEO best practices: meta tags, OpenGraph, structured data

### ✅ 4. Server-Side Rendering
- Async Server Components with `force-dynamic` rendering
- API routes with `cache: 'no-store'` for fresh data
- Dynamic metadata generation with `generateMetadata()`
- JSON-LD structured data on all pages

### ✅ 5. Design & UI/UX
- Responsive design (tested on mobile, tablet, desktop)
- Modern aesthetics with gradients and animations
- Accessibility considerations (semantic HTML, ARIA labels)
- Interactive charts and statistics visualization

## 🧪 Testing & Validation

### Test SSR Functionality
```bash
# Build production version
npm run build

# Run production server
npm run start

# View page source - should see fully rendered HTML
curl http://localhost:3000/players/virat-kohli
```

### Validate JSON-LD Schema
1. Visit any player page (e.g., `/players/virat-kohli`)
2. View page source (Ctrl+U)
3. Copy `<script type="application/ld+json">` content
4. Test at https://search.google.com/test/rich-results
5. Verify "Person" or "Athlete" schema detected with no errors

### Check Meta Tags
Open DevTools → Elements → `<head>`:
- ✅ Dynamic `<title>` tag
- ✅ Meta description with player stats
- ✅ OpenGraph tags (og:title, og:description, og:image)
- ✅ Twitter Card metadata
- ✅ Canonical URL

##🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable:
   ```
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```
4. Deploy automatically

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

## 📈 Performance Optimization

- **SSR**: Fresh data on every request for search engines
- **API Routes**: Efficient data fetching with minimal processing
- **Component Optimization**: Server Components where possible
- **Image Optimization**: Next.js Image component (to be implemented)
- **Code Splitting**: Automatic route-based splitting

## 📚 Documentation

- [Implementation Plan](. gemini/antigravity/brain/d2013256-54d8-4298-8837-28020c3c07a8/implementation_plan.md) - Technical  implementation details
- [SEO Strategy](.gemini/antigravity/brain/d2013256-54d8-4298-8837-28020c3c07a8/SEO_STRATEGY.md) - Keyword research and SEO approach
- [Walkthrough](.gemini/antigravity/brain/d2013256-54d8-4298-8837-28020c3c07a8/walkthrough.md) - Complete implementation walkthrough

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Cricket data inspired by ICC statistics
- Built as a programmatic SEO demonstration project
- Assessment project for Next.js SSR and SEO best practices

---

**Built with ❤️ using Next.js, React, and TailwindCSS**

**Keywords**: cricket statistics, player stats, team rankings, SEO, Next.js SSR, programmatic SEO, JSON-LD schema, OpenGraph, cricket data
