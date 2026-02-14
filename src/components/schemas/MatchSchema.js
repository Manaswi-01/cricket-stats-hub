export default function MatchSchema({ match }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": match.title,
        "description": match.description,
        "image": match.imageUrl,
        "url": `https://cricketstats-hub.vercel.app/matches/${match.id}`,
        "startDate": match.date,
        "sport": "Cricket",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": match.venue,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": match.venue.split(',')[1]?.trim() || match.venue
            }
        },
        "competitor": [
            {
                "@type": "SportsTeam",
                "name": match.team1.charAt(0).toUpperCase() + match.team1.slice(1),
                "sport": "Cricket"
            },
            {
                "@type": "SportsTeam",
                "name": match.team2.charAt(0).toUpperCase() + match.team2.slice(1),
                "sport": "Cricket"
            }
        ],
        "organizer": {
            "@type": "SportsOrganization",
            "name": "International Cricket Council",
            "url": "https://www.icc-cricket.com"
        },
        "superEvent": {
            "@type": "SportsEvent",
            "name": match.format === 'ODI' ? 'One Day International' : match.format === 'T20' ? 'Twenty20 International' : 'Test Match'
        },
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "winner": {
            "@type": "SportsTeam",
            "name": match.winner.charAt(0).toUpperCase() + match.winner.slice(1)
        },
        "about": {
            "@type": "Thing",
            "description": match.highlights.join('. ')
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
