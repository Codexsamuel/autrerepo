import { NextRequest, NextResponse } from 'next/server';
import { bookmakerScraper } from '@/lib/scraper/bookmaker-scraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const filters = Object.fromEntries(searchParams.entries());

    switch (action) {
      case 'matches':
        const matches = await bookmakerScraper.getMatches({
          sport: filters.sport,
          league: filters.league,
          date: filters.date,
          status: filters.status
        });
        return NextResponse.json({ success: true, data: matches });
      case 'bets':
        const bets = await bookmakerScraper.getBets({
          matchId: filters.matchId,
          user: filters.user,
          status: filters.status
        });
        return NextResponse.json({ success: true, data: bets });
      case 'comboBets':
        const comboBets = await bookmakerScraper.getComboBets(filters.user);
        return NextResponse.json({ success: true, data: comboBets });
      case 'liveMatches':
        const liveMatches = await bookmakerScraper.getLiveMatches();
        return NextResponse.json({ success: true, data: liveMatches });
      case 'boosts':
        const boosts = await bookmakerScraper.getBoosts();
        return NextResponse.json({ success: true, data: boosts });
      case 'bonuses':
        const bonuses = await bookmakerScraper.getBonuses(filters.user);
        return NextResponse.json({ success: true, data: bonuses });
      case 'missions':
        const missions = await bookmakerScraper.getMissions(filters.user);
        return NextResponse.json({ success: true, data: missions });
      case 'ranking':
        const ranking = await bookmakerScraper.getRanking();
        return NextResponse.json({ success: true, data: ranking });
      case 'stats':
        const stats = await bookmakerScraper.getStats();
        return NextResponse.json({ success: true, data: stats });
      case 'search':
        const searchResults = await bookmakerScraper.search(query);
        return NextResponse.json({ success: true, data: searchResults });
      default:
        // Retourner toutes les données si aucune action spécifique
        const allData = {
          matches: await bookmakerScraper.getMatches(),
          bets: await bookmakerScraper.getBets(),
          comboBets: await bookmakerScraper.getComboBets(),
          liveMatches: await bookmakerScraper.getLiveMatches(),
          boosts: await bookmakerScraper.getBoosts(),
          bonuses: await bookmakerScraper.getBonuses(),
          missions: await bookmakerScraper.getMissions(),
          ranking: await bookmakerScraper.getRanking(),
          stats: await bookmakerScraper.getStats()
        };
        return NextResponse.json({ success: true, data: allData });
    }
  } catch (error) {
    console.error('Erreur API Bookmaker:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données bookmaker' },
      { status: 500 }
    );
  }
} 