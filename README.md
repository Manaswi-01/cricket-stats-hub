# Cricket Stats Hub 🏏

A modern, SEO-optimized cricket statistics platform built with Next.js 16, featuring server-side rendering, live API integration, and comprehensive player, team, and match data.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🎯 Core Features
- **Server-Side Rendering (SSR)** - All pages use Next.js SSR for optimal SEO and performance
- **Live Cricket API Integration** - Real-time player and match data from CricketData.org
- **Programmatic SEO** - Comprehensive metadata, JSON-LD schemas, and Open Graph tags
- **Responsive Design** - Mobile-first, professional blue theme throughout
- **Modern UI/UX** - Clean, corporate design with consistent styling

### 📊 Content Pages
- **Player Profiles** - Detailed statistics for 15+ international players
  - Career stats, batting/bowling records
  - Comprehensive JSON-LD schema markup
  
- **Team Rankings** - ICC rankings and team information for 6 major cricket nations
  - Test, ODI, and T20 rankings
  - Team statistics and achievements
  
- **Match Center** - Recent international match results and scorecards
  - Live match data from API
  - Detailed scorecard views

### 🔍 SEO Optimization
- Dynamic meta tags for all pages
- Structured data (JSON-LD) for players, teams, matches, and organization
- Optimized for search engines with targeted cricket keywords
- Open Graph and Twitter Card metadata

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router) with Turbopack
- **Frontend**: React 19, TailwindCSS 3.4
- **API**: CricketData.org REST API
- **Icons**: React Icons
- **Deployment**: Vercel-ready

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- CricketData.org API key (optional - falls back to static data)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cricket-stats-hub.git
cd cricket-stats-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# CricketData.org API Configuration
CRICKET_API_KEY=your_api_key_here
CRICKET_API_BASE_URL=https://api.cricapi.com/v1

# Application URL (for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note**: The API key is optional. Without it, the app uses curated static data for teams and falls back to static data for players/matches if the API is unavailable.

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Getting a Cricket API Key

1. Visit [CricketData.org](https://cricketdata.org/)
2. Sign up for a free account
3. Navigate to the API section
4. Copy your API key
5. Add it to `.env.local` as shown above

**Free Tier Limits**: 100 requests/day (sufficient for development)

## 🏗️ Project Structure

```
cricket-stats-hub/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.js              # Homepage
│   │   ├── players/             # Player pages
│   │   │   ├── page.js          # Players listing
│   │   │   └── [id]/page.js     # Player detail (SSR)
│   │   ├── teams/               # Team pages
│   │   │   ├── page.js          # Teams listing
│   │   │   └── [id]/page.js     # Team detail (SSR)
│   │   ├── matches/             # Match pages
│   │   │   ├── page.js          # Matches listing
│   │   │   └── [id]/page.js     # Match detail (SSR)
│   │   └── api/                 # API routes
│   │       ├── players/
│   │       ├── teams/
│   │       └── matches/
│   ├── components/              # React components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── PlayerCard.js
│   │   ├── TeamCard.js
│   │   ├── MatchCard.js
│   │   └── schemas/             # JSON-LD schemas
│   ├── data/                    # Static/fallback data
│   │   ├── players.js
│   │   ├── teams.js
│   │   └── matches.js
│   ├── lib/                     # API service layer
│   │   └── cricketApi.js
│   └── utils/                   # Utility functions
│       └── seo.js
├── public/                      # Static assets
├── .env.local                   # Environment variables (create this)
├── .env.example                 # Example environment file
└── package.json
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `CRICKET_API_KEY`
   - `CRICKET_API_BASE_URL`
   - `NEXT_PUBLIC_BASE_URL` (your production URL)
4. Deploy!

### Environment Variables for Production

```env
CRICKET_API_KEY=your_production_api_key
CRICKET_API_BASE_URL=https://api.cricapi.com/v1
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1e40af` to `#1e3a8a` (blue-700 to blue-900)
- **Accent Blue**: `#2563eb` (blue-600)
- **Background**: `#eff6ff` to `#dbeafe` (blue-50 to blue-100)
- **Text**: `#1f2937` (gray-800)

### Typography
- **Font Family**: System fonts (Apple, Segoe UI, Roboto, etc.)
- **Headings**: Font weight 700-900 (bold to black)
- **Body**: Font weight 400-600 (normal to semibold)

## 📊 Data Sources

- **Live API**: CricketData.org (player stats, match data)
- **Static Data**: Curated team information with 2026 ICC rankings
- **Fallback**: Comprehensive static dataset for offline functionality

## 🔄 API Integration

The app intelligently handles API integration:

1. **Players**: Fetches from live API, falls back to static on failure
2. **Matches**: Fetches from live API, falls back to static on failure  
3. **Teams**: Uses curated static data (API doesn't provide comprehensive team data)

All API calls are server-side only for security and performance.

## 🛠️ Customization

### Adding New Players
Edit `src/data/players.js` to add static player data.

### Adding New Teams
Edit `src/data/teams.js` to add/update team information.

### Modifying Design
All styling uses TailwindCSS. Edit component files directly or modify `tailwind.config.js` for theme changes.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for cricket fans worldwide** 🏏
