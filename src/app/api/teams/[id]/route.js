import { getTeam } from '@/lib/cricketApi';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const team = await getTeam(id);

        if (!team) {
            return NextResponse.json(
                { success: false, error: 'Team not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: team,
            source: 'static-data'
        });
    } catch (error) {
        console.error('Error fetching team:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch team' },
            { status: 500 }
        );
    }
}
