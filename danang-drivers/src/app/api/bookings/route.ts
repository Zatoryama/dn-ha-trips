import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory store for demo (replace with MongoDB in production)
const bookings: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  route: string;
  vehicleType: string;
  date: string;
  time: string;
  passengers: number;
  pickupLocation: string;
  dropoffLocation: string;
  notes: string;
  driverId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'pickupLocation'];
    for (const field of requiredFields) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const booking = {
      id: `BK-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      route: body.route || '',
      vehicleType: body.vehicleType || 'sedan',
      date: body.date,
      time: body.time || '08:00',
      passengers: parseInt(body.passengers) || 1,
      pickupLocation: body.pickupLocation.trim(),
      dropoffLocation: body.dropoffLocation?.trim() || '',
      notes: body.notes?.trim() || '',
      driverId: body.driverId || '',
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json(
      {
        success: true,
        booking: {
          id: booking.id,
          status: booking.status,
          createdAt: booking.createdAt,
        },
        message: `Booking ${booking.id} created successfully. We will confirm within 1 hour.`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    bookings: bookings.map((b) => ({
      id: b.id,
      name: b.name,
      date: b.date,
      route: b.route,
      status: b.status,
      createdAt: b.createdAt,
    })),
    total: bookings.length,
  });
}
