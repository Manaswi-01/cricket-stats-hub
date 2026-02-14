import { getMatches } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const matches = await getMatches();

        return NextResponse.json({
            success: true,
            count: matches.length,
            data: matches,
            source: process.env.CRICKET_API_KEY ? 'live-api' : 'static-data'
        });
    } catch (error) {
        console.error('Error fetching matches:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch matches' },
            { status: 500 }
        );
    }
}
