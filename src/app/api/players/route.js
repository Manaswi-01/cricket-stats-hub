import { getAllPlayers } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch from live API or static data (automatic fallback)
        const players = await getAllPlayers();

        return NextResponse.json({
            success: true,
            count: players.length,
            data: players,
            source: process.env.CRICKET_API_KEY ? 'live-api' : 'static-data'
        });
    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch players' },
            { status: 500 }
        );
    }
}
