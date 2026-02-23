import { NextRequest, NextResponse } from 'next/server';
import { getDrivers, updateDriver, validateAdminToken } from '@/data/driverStore';

function checkAuth(request: NextRequest): boolean {
  const token = request.headers.get('X-Admin-Token');
  return !!token && validateAdminToken(token);
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const drivers = getDrivers();
  return NextResponse.json({ drivers });
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Driver id is required' }, { status: 400 });
  }

  const updated = updateDriver(id, updates);
  if (!updated) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
  }

  return NextResponse.json({ driver: updated });
}
