export default function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CricketStats Hub",
        "alternateName": "Cricket Statistics Hub",
        "url": "https://cricketstats-hub.vercel.app",
        "logo": "https://cricketstats-hub.vercel.app/logo.png",
        "description": "Comprehensive cricket statistics, player profiles, team rankings, and match analysis. Track your favorite players with detailed stats and insights.",
        "sameAs": [
            "https://twitter.com/cricketstatshub",
            "https://facebook.com/cricketstatshub"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "info@cricketstats-hub.com"
        },
        "keywords": "cricket statistics, player stats, team rankings, live scores, cricket analysis",
        "areaServed": "Worldwide",
        "serviceType": "Sports Statistics and Analysis"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
