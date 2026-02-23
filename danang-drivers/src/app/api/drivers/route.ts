import { NextRequest, NextResponse } from 'next/server';
import { getDrivers } from '@/data/driverStore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  let filtered = [...getDrivers()];

  // Filter by vehicle type
  const vehicleType = searchParams.get('vehicleType');
  if (vehicleType && vehicleType !== 'all') {
    filtered = filtered.filter((d) => d.vehicleType === vehicleType);
  }

  // Filter by language
  const language = searchParams.get('language');
  if (language && language !== 'all') {
    filtered = filtered.filter((d) => d.languages.includes(language));
  }

  // Filter by area
  const area = searchParams.get('area');
  if (area) {
    filtered = filtered.filter((d) =>
      d.areas.some((a) => a.toLowerCase().includes(area.toLowerCase()))
    );
  }

  // Filter by availability
  const available = searchParams.get('available');
  if (available === 'true') {
    filtered = filtered.filter((d) => d.available);
  }

  // Sort
  const sortBy = searchParams.get('sortBy') || 'rating';
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'experience')
    filtered.sort((a, b) => b.experience - a.experience);
  else if (sortBy === 'price')
    filtered.sort((a, b) => a.pricePerKm - b.pricePerKm);

  return NextResponse.json({
    drivers: filtered.map((d) => ({
      id: d.id,
      name: d.name,
      rating: d.rating,
      reviewCount: d.reviewCount,
      experience: d.experience,
      languages: d.languages,
      vehicleType: d.vehicleType,
      vehicleName: d.vehicleName,
      vehicleCapacity: d.vehicleCapacity,
      services: d.services,
      areas: d.areas,
      available: d.available,
      featured: d.featured,
    })),
    total: filtered.length,
  });
}
