# Live Cricket API Setup Guide

This guide explains how to integrate the CricketData.org API for real-time cricket statistics.

## Current Setup (Smart Fallback)

The application is configured to work in **two modes**:

### 1. **Without API Key (Default)** ✅
- Uses curated static data with 2026 statistics
- Reliable, fast, no rate limits
- Perfect for development and demonstration

### 2. **With API Key (Live Data)** 🔴
- Fetches real-time cricket statistics
- Automatically falls back to static data if API fails
- Ideal for production with live scores

## How to Enable Live API

### Step 1: Get Your Free API Key

1. Visit **[CricketData.org](https://cricketdata.org)** or **[CricAPI.com](https://cricapi.com)**
2. Click "Sign Up" or "Get API Key"
3. Register with your email
4. Copy your API key from the dashboard

**Free Tier Limits:**
- 100-250 requests per day
- Player statistics, match scores, current matches
- No credit card required

### Step 2: Configure Environment Variables

1. Open `.env.local` file in the project root
2. Add your API key:

```env
# Cricket API Configuration
CRICKET_API_KEY=your_actual_api_key_here
CRICKET_API_BASE_URL=https://api.cricapi.com/v1

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Save the file
4. Restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 3: Verify API Integration

**Test the API:**

```bash
# Test players endpoint - should show "source": "live-api"
curl http://localhost:3000/api/players

# Test specific player
curl http://localhost:3000/api/players/virat-kohli
```

**Check the response:**
```json
{
  "success": true,
  "count": 15,
  "data": [...],
  "source": "live-api"  // ← Should say "live-api" if working
}
```

If `"source": "static-data"`, the API key is not configured or the API is unavailable.

## API Endpoints Available

### Players
- `GET /api/players` - All players (live or static)
- `GET /api/players/:id` - Specific player stats

### Matches  
- `GET /api/matches` - Recent matches (live or static)
- `GET /api/matches/:id` - Specific match scorecard

### Teams
- `GET /api/teams` - All teams (currently static with 2026 rankings)
- `GET /api/teams/:id` - Specific team details

## How the Fallback Works

```javascript
// Automatic fallback mechanism in src/lib/cricketApi.js

1. Try to fetch from CricketData.org API
   ↓
2. If API fails or not configured:
   → Use static data automatically
   ↓
3. Return data with 'source' indicator
```

**Benefits:**
- ✅ Never breaks - always returns data
- ✅ No downtime from API issues
- ✅ Development works without API key
- ✅ Production has real-time data when available

## Customizing the API Service

Edit `src/lib/cricketApi.js` to:
- Change API endpoints
- Modify data mapping
- Add caching layer
- Implement rate limiting

## Production Deployment

### Vercel Deployment:

1. Push code to GitHub
2. Import to Vercel
3. Add environment variable:
   - Key: `CRICKET_API_KEY`
   - Value: `your_api_key`
4. Deploy

### Netlify Deployment:

1. Build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. Environment variables:
   ```
   CRICKET_API_KEY=your_api_key
   NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
   ```

## API Rate Limits

**Free Tier:**
- 100-250 requests/day
GET - ~4-10 requests/hour

**Recommendations:**
- Use static data for development
- Enable live API only in production
- Implement caching for frequently accessed data
- Monitor usage in CricketData.org dashboard

## Troubleshooting

### Issue: Still showing "static-data"

**Solutions:**
1. Check `.env.local` exists and has `CRICKET_API_KEY`
2. Restart dev server after adding API key
3. Verify API key is valid at cricketdata.org
4. Check console for error messages

### Issue: API rate limit exceeded

**Solutions:**
1. Wait 24 hours for rate limit reset
2. Fallback to static data automatically kicks in
3. Implement caching to reduce API calls
4. Upgrade to paid tier if needed

### Issue: Player not found

**Solutions:**
1. API may not have all players
2. Fallback returns static player automatically
3. Check player ID format (lowercase, hyphenated)

## API Documentation

Full API docs: **[CricketData.org Documentation](https://cricketdata.org/docs)**

**Popular Endpoints:**
- `/players` - All players list
- `/players/:id` - Player details with stats
- `/matches` - Recent and live matches
- `/currentMatches` - Ongoing matches (live)
- `/playerStats/:id` - Detailed player statistics

## Cost Comparison

| Plan | Requests/Day | Price | Best For |
|------|--------------|-------|----------|
| Free | 100-250 | $0 | Development, demos |
| Basic | 10,000 | $10/mo | Small sites |
| Pro | 100,000 | $50/mo | Production sites |

**For this project:**
- Free tier is sufficient for assessment/portfolio
- Static data fallback ensures it always works
- Upgrade only if deploying to high-traffic production

## Need Help?

- **API Issues:** support@cricketdata.org
- **Code Issues:** Check `src/lib/cricketApi.js` for implementation
- **Documentation:** See `walkthrough.md` for full implementation details
