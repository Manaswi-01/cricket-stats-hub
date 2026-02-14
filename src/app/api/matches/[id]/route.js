import { getMatch } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const match = await getMatch(id);

        if (!match) {
            return NextResponse.json(
                { success: false, error: 'Match not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: match,
            source: process.env.CRICKET_API_KEY ? 'live-api' : 'static-data'
        });
    } catch (error) {
        console.error('Error fetching match:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch match' },
            { status: 500 }
        );
    }
}
