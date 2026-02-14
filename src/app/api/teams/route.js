import { getAllTeams } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const teams = await getAllTeams();

        return NextResponse.json({
            success: true,
            count: teams.length,
            data: teams,
            source: 'static-data' // Teams currently use static data with current rankings
        });
    } catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch teams' },
            { status: 500 }
        );
    }
}
