import { getPlayer } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        // Fetch from live API or static data (automatic fallback)
        const player = await getPlayer(id);

        if (!player) {
            return NextResponse.json(
                { success: false, error: 'Player not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: player,
            source: process.env.CRICKET_API_KEY ? 'live-api' : 'static-data'
        });
    } catch (error) {
        console.error('Error fetching player:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch player' },
            { status: 500 }
        );
    }
}
