/**
 * Cricket API Service
 * Handles communication with CricketData.org API
 * Falls back to static data if API is unavailable or rate limited
 */

import { players as staticPlayers } from '@/data/players';
import { teams as staticTeams } from '@/data/teams';
import { matches as staticMatches } from '@/data/matches';

const API_KEY = process.env.CRICKET_API_KEY;
const API_BASE_URL = process.env.CRICKET_API_BASE_URL || 'https://api.cricapi.com/v1';
const USE_LIVE_API = !!API_KEY; // Only use live API if key is configured

/**
 * Fetch data from Cricket API with error handling
 */
async function fetchFromAPI(endpoint, params = {}) {
    if (!USE_LIVE_API) {
        throw new Error('API key not configured');
    }

    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    url.searchParams.append('apikey', API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        headers: {
            'Accept': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data for SSR
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Map API player data to our schema
 */
function mapPlayerData(apiPlayer) {
    return {
        id: apiPlayer.id || apiPlayer.name.toLowerCase().replace(/\s+/g, '-'),
        name: apiPlayer.name || apiPlayer.playerName,
        country: apiPlayer.country,
        role: apiPlayer.role || apiPlayer.playingRole || 'All-rounder',
        battingStyle: apiPlayer.battingStyle || 'Right-hand bat',
        bowlingStyle: apiPlayer.bowlingStyle || 'Right-arm medium',
        stats: {
            matches: apiPlayer.stats?.matches || 0,
            runs: apiPlayer.stats?.runs || 0,
            average: parseFloat(apiPlayer.stats?.average || 0),
            strikeRate: parseFloat(apiPlayer.stats?.strikeRate || 0),
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
                return data.data.map(mapPlayerData);
            }
        }
    } catch (error) {
        console.warn('Live API unavailable, using static data:', error.message);
    }

    // Fallback to static data
    return staticPlayers;
}

/**
 * Get player by ID - tries API first, falls back to static
 */
export async function getPlayer(id) {
    try {
        if (USE_LIVE_API) {
            const data = await fetchFromAPI(`players/${id}`);
            if (data && data.data) {
                return mapPlayerData(data.data);
            }
        }
    } catch (error) {
        console.warn(`Live API unavailable for player ${id}, using static data:`, error.message);
    }

    // Fallback to static data
    return staticPlayers.find(p => p.id === id);
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
 * Get team by ID - currently uses static data
 */
export async function getTeam(id) {
    return staticTeams.find(t => t.id === id);
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
 * Get match by ID
 */
export async function getMatch(id) {
    try {
        if (USE_LIVE_API) {
            const data = await fetchFromAPI(`matches/${id}`);
            if (data && data.data) {
                // TODO: Map API match data
                return data.data;
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
