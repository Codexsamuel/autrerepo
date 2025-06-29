export interface BookmakerMatch {
  id: string;
  sport: string;
  league: string;
  teams: [string, string];
  date: string;
  time: string;
  status: 'à venir' | 'en cours' | 'terminé';
  score?: [number, number];
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  country: string;
  logo1: string;
  logo2: string;
}

export interface BookmakerBet {
  id: string;
  matchId: string;
  type: '1N2' | 'Over/Under' | 'Score exact' | 'Double chance';
  option: string;
  odds: number;
  status: 'ouvert' | 'fermé' | 'gagné' | 'perdu';
  stake: number;
  potentialWin: number;
  user?: string;
}

export interface BookmakerStats {
  totalMatches: number;
  totalSports: number;
  totalLeagues: number;
  totalBets: number;
  averageOdds: number;
  sports: string[];
  leagues: string[];
}

export interface BookmakerComboBet {
  id: string;
  bets: BookmakerBet[];
  combinedOdds: number;
  stake: number;
  potentialWin: number;
  status: 'ouvert' | 'gagné' | 'perdu';
  user?: string;
}

export interface BookmakerLiveMatch extends BookmakerMatch {
  live: boolean;
  minute?: number;
  liveOdds?: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface BookmakerBoost {
  id: string;
  matchId: string;
  description: string;
  boostedOdds: number;
  type: string;
}

export interface BookmakerBonus {
  id: string;
  type: 'freebet' | 'cashback' | 'welcome' | 'mission';
  description: string;
  value: number;
  status: 'actif' | 'expiré' | 'utilisé';
}

export interface BookmakerMission {
  id: string;
  title: string;
  description: string;
  progress: number;
  goal: number;
  reward: string;
  completed: boolean;
}

export interface BookmakerRankingEntry {
  user: string;
  points: number;
  rank: number;
}

class BookmakerScraper {
  private matches: BookmakerMatch[] = [];
  private bets: BookmakerBet[] = [];
  private comboBets: BookmakerComboBet[] = [];
  private liveMatches: BookmakerLiveMatch[] = [];
  private boosts: BookmakerBoost[] = [];
  private bonuses: BookmakerBonus[] = [];
  private missions: BookmakerMission[] = [];
  private ranking: BookmakerRankingEntry[] = [];

  constructor() {
    this.initData();
  }

  private initData() {
    this.matches = [
      {
        id: 'match1',
        sport: 'Football',
        league: 'Ligue 1',
        teams: ['PSG', 'OM'],
        date: '2024-07-15',
        time: '21:00',
        status: 'à venir',
        odds: { home: 1.65, draw: 3.8, away: 4.2 },
        country: 'France',
        logo1: 'https://upload.wikimedia.org/wikipedia/fr/a/a7/Paris_Saint-Germain_Logo.svg',
        logo2: 'https://upload.wikimedia.org/wikipedia/fr/6/6e/Olympique_de_Marseille_logo.svg',
      },
      {
        id: 'match2',
        sport: 'Football',
        league: 'Premier League',
        teams: ['Manchester City', 'Liverpool'],
        date: '2024-07-16',
        time: '18:30',
        status: 'à venir',
        odds: { home: 2.1, draw: 3.5, away: 3.1 },
        country: 'Angleterre',
        logo1: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
        logo2: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      },
      {
        id: 'match3',
        sport: 'Tennis',
        league: 'Wimbledon',
        teams: ['Djokovic', 'Alcaraz'],
        date: '2024-07-17',
        time: '15:00',
        status: 'à venir',
        odds: { home: 1.9, draw: 0, away: 1.95 },
        country: 'UK',
        logo1: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Novak_Djokovic_2019.png',
        logo2: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Carlos_Alcaraz_2022.png',
      },
      {
        id: 'match4',
        sport: 'Basketball',
        league: 'NBA',
        teams: ['Lakers', 'Warriors'],
        date: '2024-07-18',
        time: '02:00',
        status: 'à venir',
        odds: { home: 1.8, draw: 0, away: 2.0 },
        country: 'USA',
        logo1: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
        logo2: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg',
      }
    ];
    this.bets = [
      {
        id: 'bet1',
        matchId: 'match1',
        type: '1N2',
        option: 'PSG',
        odds: 1.65,
        status: 'ouvert',
        stake: 100,
        potentialWin: 165,
        user: 'demoUser'
      },
      {
        id: 'bet2',
        matchId: 'match2',
        type: '1N2',
        option: 'Liverpool',
        odds: 3.1,
        status: 'ouvert',
        stake: 50,
        potentialWin: 155,
        user: 'demoUser'
      }
    ];
    this.comboBets = [
      {
        id: 'combo1',
        bets: [this.bets[0], this.bets[1]],
        combinedOdds: Number((this.bets[0].odds * this.bets[1].odds).toFixed(2)),
        stake: 30,
        potentialWin: Number((30 * this.bets[0].odds * this.bets[1].odds).toFixed(2)),
        status: 'ouvert',
        user: 'demoUser',
      }
    ];
    this.liveMatches = [
      {
        ...this.matches[0],
        live: true,
        minute: 57,
        liveOdds: { home: 1.8, draw: 3.2, away: 4.5 },
      }
    ];
    this.boosts = [
      {
        id: 'boost1',
        matchId: 'match1',
        description: 'PSG gagne & +2.5 buts',
        boostedOdds: 2.5,
        type: 'Super cote',
      }
    ];
    this.bonuses = [
      {
        id: 'bonus1',
        type: 'freebet',
        description: 'Freebet 10€ offert',
        value: 10,
        status: 'actif',
      },
      {
        id: 'bonus2',
        type: 'welcome',
        description: "100% de bonus sur 1er dépôt jusqu'à 100€",
        value: 100,
        status: 'actif',
      }
    ];
    this.missions = [
      {
        id: 'mission1',
        title: 'Parier sur 3 sports différents',
        description: 'Place un pari sur 3 sports différents cette semaine',
        progress: 2,
        goal: 3,
        reward: 'Freebet 5€',
        completed: false,
      }
    ];
    this.ranking = [
      { user: 'demoUser', points: 1200, rank: 1 },
      { user: 'parieurPro', points: 950, rank: 2 },
      { user: 'luckyGuy', points: 800, rank: 3 },
    ];
  }

  async getMatches(filters?: { sport?: string; league?: string; date?: string; status?: string }): Promise<BookmakerMatch[]> {
    let filtered = [...this.matches];
    if (filters?.sport) filtered = filtered.filter(m => m.sport === filters.sport);
    if (filters?.league) filtered = filtered.filter(m => m.league === filters.league);
    if (filters?.date) filtered = filtered.filter(m => m.date === filters.date);
    if (filters?.status) filtered = filtered.filter(m => m.status === filters.status);
    return filtered;
  }

  async getBets(filters?: { matchId?: string; user?: string; status?: string }): Promise<BookmakerBet[]> {
    let filtered = [...this.bets];
    if (filters?.matchId) filtered = filtered.filter(b => b.matchId === filters.matchId);
    if (filters?.user) filtered = filtered.filter(b => b.user === filters.user);
    if (filters?.status) filtered = filtered.filter(b => b.status === filters.status);
    return filtered;
  }

  async getStats(): Promise<BookmakerStats> {
    return {
      totalMatches: this.matches.length,
      totalSports: new Set(this.matches.map(m => m.sport)).size,
      totalLeagues: new Set(this.matches.map(m => m.league)).size,
      totalBets: this.bets.length,
      averageOdds: Number((this.matches.reduce((sum, m) => sum + m.odds.home + m.odds.away + (m.odds.draw || 0), 0) / (this.matches.length * 3)).toFixed(2)),
      sports: Array.from(new Set(this.matches.map(m => m.sport))),
      leagues: Array.from(new Set(this.matches.map(m => m.league)))
    };
  }

  async search(query: string) {
    return {
      matches: this.matches.filter(m =>
        m.teams.join(' ').toLowerCase().includes(query.toLowerCase()) ||
        m.league.toLowerCase().includes(query.toLowerCase()) ||
        m.sport.toLowerCase().includes(query.toLowerCase())
      ),
      bets: this.bets.filter(b =>
        b.option.toLowerCase().includes(query.toLowerCase())
      )
    };
  }

  async getComboBets(user?: string) {
    return user ? this.comboBets.filter(c => c.user === user) : this.comboBets;
  }

  async getLiveMatches() {
    return this.liveMatches;
  }

  async getBoosts() {
    return this.boosts;
  }

  async getBonuses(user?: string) {
    return this.bonuses;
  }

  async getMissions(user?: string) {
    return this.missions;
  }

  async getRanking() {
    return this.ranking;
  }
}

export const bookmakerScraper = new BookmakerScraper(); 