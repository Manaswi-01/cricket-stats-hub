import { players as staticPlayers } from '@/data/players';
import { teams as staticTeams } from '@/data/teams';
import { matches as staticMatches } from '@/data/matches';

/**
 * Base API configuration
 */
const API_BASE_URL = process.env.CRICKET_API_BASE_URL || 'https://api.cricapi.com/v1';
const API_KEY = process.env.CRICKET_API_KEY;
const USE_LIVE_API = !!API_KEY;

/**
 * Fetch data from the Cricket API
 */
async function fetchFromAPI(endpoint, params = {}) {
    if (!API_KEY) {
        throw new Error('API key not configured');
    }

    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    url.searchParams.append('apikey', API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        next: { revalidate: 0 } // Always fetch fresh data
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Map API player data to our schema
 */
function mapPlayerData(apiPlayer) {
    return {
        id: apiPlayer.id,
        name: apiPlayer.name,
        country: apiPlayer.country || apiPlayer.team,
        role: apiPlayer.role || apiPlayer.playerRole,
        stats: {
            matches: apiPlayer.stats?.matches || apiPlayer.matchesPlayed || 0,
            runs: apiPlayer.stats?.runs || apiPlayer.totalRuns || 0,
            average: apiPlayer.stats?.average || apiPlayer.battingAverage || 0,
            strikeRate: apiPlayer.stats?.strikeRate || apiPlayer.strikeRate || 0,
            centuries: apiPlayer.stats?.centuries || 0,
            fifties: apiPlayer.stats?.fifties || 0,
            highestScore: apiPlayer.stats?.highestScore || 0,
            wickets: apiPlayer.stats?.wickets,
            bowlingAverage: apiPlayer.stats?.bowlingAverage,
            economy: apiPlayer.stats?.economy,
            bestBowling: apiPlayer.stats?.bestBowling,
        },
        bio: apiPlayer.description || apiPlayer.bio || `${apiPlayer.name} is an international cricket player.`,
        imageUrl: apiPlayer.imageUrl || `/images/players/${apiPlayer.id}.jpg`,
        achievements: apiPlayer.achievements || [],
    };
}

/**
 * Get all players - tries API first, falls back to static
 */
export async function getAllPlayers() {
    try {
        if (USE_LIVE_API) {
            const data = await fetchFromAPI('players');
            if (data && data.data) {
                // Map API players to our schema
                return data.data.slice(0, 25).map(mapPlayerData);
            }
        }
    } catch (error) {
        console.warn('Live API unavailable, using static data:', error.message);
    }

    // Fallback to static data
    return staticPlayers;
}

/**
 * Get all teams - currently uses static data
 * TODO: Implement live API mapping when available
 */
export async function getAllTeams() {
    // CricAPI doesn't have a comprehensive teams endpoint
    // Use static data with current rankings
    return staticTeams;
}

/**
 * Get recent matches - tries API first, falls back to static
 */
export async function getMatches() {
    try {
        if (USE_LIVE_API) {
            const data = await fetchFromAPI('matches');
            if (data && data.data) {
                // Map API matches to our schema
                return data.data.slice(0, 11).map(match => ({
                    id: match.id,
                    title: `${match.teams[0]} vs ${match.teams[1]} - ${match.matchType}`,
                    date: match.dateTimeGMT,
                    venue: match.venue,
                    format: match.matchType,
                    team1: match.teams[0].toLowerCase().replace(/\s+/g, '-'),
                    team2: match.teams[1].toLowerCase().replace(/\s+/g, '-'),
                    winner: match.status.includes(match.teams[0]) ? match.teams[0] : match.teams[1],
                    scorecard: match.score || {},
                    description: match.status,
                    imageUrl: `/images/matches/${match.id}.jpg`,
                    highlights: []
                }));
            }
        }
    } catch (error) {
        console.warn('Live API unavailable for matches, using static data:', error.message);
    }

    // Fallback to static data
    return staticMatches;
}

/**
 * Get match by ID - tries API first, falls back to static
 */
export async function getMatchDetails(id) {
    try {
        if (USE_LIVE_API) {
            const data = await fetchFromAPI(`match_info`, { id });
            if (data && data.data) {
                const match = data.data;
                return {
                    id: match.id,
                    title: `${match.teams[0]} vs ${match.teams[1]} - ${match.matchType}`,
                    date: match.dateTimeGMT,
                    venue: match.venue,
                    format: match.matchType,
                    team1: match.teams[0],
                    team2: match.teams[1],
                    winner: match.status.includes(match.teams[0]) ? match.teams[0] : match.teams[1],
                    scorecard: match.score || {},
                    description: match.status,
                    imageUrl: `/images/matches/${match.id}.jpg`,
                    highlights: []
                };
            }
        }
    } catch (error) {
        console.warn(`Live API unavailable for match ${id}, using static data:`, error.message);
    }

    return staticMatches.find(m => m.id === id);
}

/**
 * Get current match scores - live data only
 */
export async function getCurrentMatches() {
    if (!USE_LIVE_API) {
        return [];
    }

    try {
        const data = await fetchFromAPI('currentMatches');
        return data.data || [];
    } catch (error) {
        console.warn('Could not fetch current matches:', error.message);
        return [];
    }
}

/**
 * Get team by ID
 */
export async function getTeamById(id) {
    const teams = await getAllTeams();
    return teams.find(team => team.id === id) || null;
}

/**
 * Get match by ID
 */
export async function getMatchById(id) {
    const matches = await getMatches();
    return matches.find(match => match.id === id) || null;
}

/**
 * Get player by ID
 */
export async function getPlayerById(id) {
    const players = await getAllPlayers();
    return players.find(player => player.id === id) || null;
}
