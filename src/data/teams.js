export const teams = [
  {
    id: 'india',
    name: 'India',
    fullName: 'Indian Cricket Team',
    founded: 1928,
    captain: 'Rohit Sharma',
    coach: 'Gautam Gambhir',
    ranking: {
      test: 1,
      odi: 1,
      t20: 1
    },
    stats: {
      testWins: 186,
      odiWins: 578,
      t20Wins: 165,
      worldCupWins: 3
    },
    description: 'The Indian cricket team represents India in international cricket. India is one of the most successful cricket teams and has won the Cricket World Cup twice.',
    imageUrl: '/images/teams/india.jpg',
    topPlayers: ['virat-kohli', 'rohit-sharma', 'jasprit-bumrah'],
    achievements: [
      'Cricket World Cup Winners: 1983, 2011',
      'T20 World Cup Winners: 2007, 2024',
      'ICC World Test Championship Runners-up: 2021, 2023'
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    fullName: 'Australian Cricket Team',
    founded: 1877,
    captain: 'Pat Cummins',
    coach: 'Andrew McDonald',
    ranking: {
      test: 2,
      odi: 2,
      t20: 4
    },
    stats: {
      testWins: 412,
      odiWins: 615,
      t20Wins: 103,
      worldCupWins: 6
    },
    description: 'The Australian cricket team represents Australia in international cricket. Australia is the most successful cricket team in history.',
    imageUrl: '/images/teams/australia.jpg',
    topPlayers: ['steve-smith', 'pat-cummins', 'travis-head'],
    achievements: [
      'Cricket World Cup Winners: 1987, 1999, 2003, 2007, 2015, 2023',
      'ICC World Test Championship Winners: 2023',
      'T20 World Cup Winners: 2021'
    ]
  },
  {
    id: 'england',
    name: 'England',
    fullName: 'England Cricket Team',
    founded: 1877,
    captain: 'Ben Stokes',
    coach: 'Brendon McCullum',
    ranking: {
      test: 3,
      odi: 4,
      t20: 2
    },
    stats: {
      testWins: 402,
      odiWins: 438,
      t20Wins: 115,
      worldCupWins: 2
    },
    description: 'The England cricket team represents England and Wales in international cricket. Known for their aggressive "Bazball" approach in Test cricket.',
    imageUrl: '/images/teams/england.jpg',
    topPlayers: ['joe-root', 'ben-stokes', 'harry-brook'],
    achievements: [
      'Cricket World Cup Winners: 2019',
      'T20 World Cup Winners: 2010, 2022',
      'Ashes holders multiple times'
    ]
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    fullName: 'Pakistan Cricket Team',
    founded: 1952,
    captain: 'Babar Azam',
    coach: 'Gary Kirsten',
    ranking: {
      test: 5,
      odi: 5,
      t20: 3
    },
    stats: {
      testWins: 145,
      odiWins: 503,
      t20Wins: 124,
      worldCupWins: 2
    },
    description: 'The Pakistan cricket team represents Pakistan in international cricket. Known for producing exceptional fast bowlers and unpredictable match-winning performances.',
    imageUrl: '/images/teams/pakistan.jpg',
    topPlayers: ['babar-azam', 'shaheen-afridi', 'mohammad-rizwan'],
    achievements: [
      'Cricket World Cup Winners: 1992',
      'T20 World Cup Winners: 2009, 2022',
      'ICC Champions Trophy Winners: 2017'
    ]
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    fullName: 'New Zealand Cricket Team',
    founded: 1930,
    captain: 'Kane Williamson',
    coach: 'Gary Stead',
    ranking: {
      test: 4,
      odi: 3,
      t20: 5
    },
    stats: {
      testWins: 116,
      odiWins: 378,
      t20Wins: 89,
      worldCupWins: 1
    },
    description: 'The New Zealand cricket team represents New Zealand in international cricket. Known for their consistent performances and gentlemanly approach to the game.',
    imageUrl: '/images/teams/new-zealand.jpg',
    topPlayers: ['kane-williamson', 'tim-southee', 'devon-conway'],
    achievements: [
      'ICC World Test Championship Winners: 2021',
      'Cricket World Cup Runners-up: 2015, 2019',
      'T20 World Cup Runners-up: 2021'
    ]
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    fullName: 'South African Cricket Team',
    founded: 1889,
    captain: 'Temba Bavuma',
    coach: 'Rob Walter',
    ranking: {
      test: 6,
      odi: 6,
      t20: 6
    },
    stats: {
      testWins: 172,
      odiWins: 426,
      t20Wins: 78,
      worldCupWins: 1
    },
    description: 'The South African cricket team represents South Africa in international cricket. Known for producing world-class fast bowlers and powerful batsmen.',
    imageUrl: '/images/teams/south-africa.jpg',
    topPlayers: ['kagiso-rabada', 'quinton-de-kock', 'temba-bavuma'],
    achievements: [
      'T20 World Cup Winners: 2024',
      'ICC Champions Trophy Winners: 1998',
      'Ranked #1 in Tests multiple times'
    ]
  }
];

export const getTeamById = (id) => {
  return teams.find(team => team.id === id);
};

export const getAllTeamIds = () => {
  return teams.map(team => team.id);
};