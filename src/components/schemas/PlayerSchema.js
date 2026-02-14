export default function PlayerSchema({ player }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["Person", "Athlete"],
        "name": player.name,
        "description": player.bio,
        "nationality": {
            "@type": "Country",
            "name": player.country
        },
        "sport": "Cricket",
        "jobTitle": player.role,
        "image": player.imageUrl,
        "url": `https://cricketstats-hub.vercel.app/players/${player.id}`,
        "athleteStats": {
            "@type": "QuantitativeValue",
            "name": "Career Statistics",
            "value": {
                "matches": player.stats.matches,
                "runs": player.stats.runs,
                "average": player.stats.average,
                "strikeRate": player.stats.strikeRate,
                "centuries": player.stats.centuries,
                "fifties": player.stats.fifties,
                "highestScore": player.stats.highestScore
            }
        },
        "award": player.achievements,
        "memberOf": {
            "@type": "SportsTeam",
            "name": `${player.country} Cricket Team`,
            "sport": "Cricket"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Batting Style",
                "value": player.battingStyle
            },
            {
                "@type": "PropertyValue",
                "name": "Bowling Style",
                "value": player.bowlingStyle
            }
        ]
    };

    // Add bowling stats if player is a bowler
    if (player.stats.wickets) {
        schema.athleteStats.value.wickets = player.stats.wickets;
        schema.athleteStats.value.bowlingAverage = player.stats.bowlingAverage;
        schema.athleteStats.value.economy = player.stats.economy;
        schema.athleteStats.value.bestBowling = player.stats.bestBowling;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
