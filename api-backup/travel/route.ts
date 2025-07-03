import { NextRequest, NextResponse } from 'next/server';
import { travelScraper } from '@/lib/scraper/travel-scraper';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const filters = Object.fromEntries(searchParams.entries());

    switch (action) {
      case 'destinations':
        const destinations = await travelScraper.getDestinations({
          continent: filters.continent,
          priceRange: filters.priceRange,
          rating: filters.rating ? parseInt(filters.rating) : undefined
        });
        return NextResponse.json({ success: true, data: destinations });

      case 'flights':
        const flights = await travelScraper.getFlights({
          from: filters.from,
          to: filters.to,
          date: filters.date,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
          stops: filters.stops ? parseInt(filters.stops) : undefined
        });
        return NextResponse.json({ success: true, data: flights });

      case 'hotels':
        const hotels = await travelScraper.getHotels({
          location: filters.location,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
          stars: filters.stars ? parseInt(filters.stars) : undefined,
          amenities: filters.amenities ? filters.amenities.split(',') : undefined
        });
        return NextResponse.json({ success: true, data: hotels });

      case 'activities':
        const activities = await travelScraper.getActivities({
          location: filters.location,
          category: filters.category,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined
        });
        return NextResponse.json({ success: true, data: activities });

      case 'packages':
        const packages = await travelScraper.getPackages({
          destination: filters.destination,
          maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
          duration: filters.duration
        });
        return NextResponse.json({ success: true, data: packages });

      case 'search':
        const searchResults = await travelScraper.search(query);
        return NextResponse.json({ success: true, data: searchResults });

      case 'stats':
        const stats = await travelScraper.getStats();
        return NextResponse.json({ success: true, data: stats });

      default:
        // Retourner toutes les données si aucune action spécifique
        const allData = {
          destinations: await travelScraper.getDestinations(),
          flights: await travelScraper.getFlights(),
          hotels: await travelScraper.getHotels(),
          activities: await travelScraper.getActivities(),
          packages: await travelScraper.getPackages(),
          stats: await travelScraper.getStats()
        };
        return NextResponse.json({ success: true, data: allData });
    }
  } catch (error) {
    console.error('Erreur API Travel:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
} 