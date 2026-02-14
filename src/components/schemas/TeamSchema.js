export default function TeamSchema({ team }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        "name": team.fullName,
        "alternateName": team.name,
        "sport": "Cricket",
        "description": team.description,
        "image": team.imageUrl,
        "url": `https://cricketstats-hub.vercel.app/teams/${team.id}`,
        "foundingDate": team.founded.toString(),
        "coach": {
            "@type": "Person",
            "name": team.coach,
            "jobTitle": "Head Coach"
        },
        "athlete": {
            "@type": "Person",
            "name": team.captain,
            "jobTitle": "Captain"
        },
        "award": team.achievements,
        "memberOf": {
            "@type": "SportsOrganization",
            "name": "International Cricket Council",
            "alternateName": "ICC"
        },
        "competitionStats": {
            "@type": "QuantitativeValue",
            "name": "Team Statistics",
            "value": {
                "testWins": team.stats.testWins,
                "odiWins": team.stats.odiWins,
                "t20Wins": team.stats.t20Wins,
                "worldCupWins": team.stats.worldCupWins
            }
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Test Ranking",
                "value": team.ranking.test
            },
            {
                "@type": "PropertyValue",
                "name": "ODI Ranking",
                "value": team.ranking.odi
            },
            {
                "@type": "PropertyValue",
                "name": "T20 Ranking",
                "value": team.ranking.t20
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
