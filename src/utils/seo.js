export const generatePlayerSchema = (player) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.name,
    description: player.bio,
    nationality: player.country,
    jobTitle: 'Professional Cricketer',
    sport: 'Cricket',
    award: player.achievements,
    performerIn: {
      '@type': 'SportsTeam',
      name: `${player.country} Cricket Team`
    }
  };
};

export const generateTeamSchema = (team) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: team.fullName,
    sport: 'Cricket',
    description: team.description,
    foundingDate: team.founded.toString(),
    coach: {
      '@type': 'Person',
      name: team.coach
    },
    athlete: team.topPlayers.map(playerId => ({
      '@type': 'Person',
      name: playerId
    }))
  };
};

export const generateMatchSchema = (match) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: match.title,
    startDate: match.date,
    location: {
      '@type': 'Place',
      name: match.venue
    },
    competitor: [
      {
        '@type': 'SportsTeam',
        name: match.team1
      },
      {
        '@type': 'SportsTeam',
        name: match.team2
      }
    ],
    winner: {
      '@type': 'SportsTeam',
      name: match.winner
    }
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};