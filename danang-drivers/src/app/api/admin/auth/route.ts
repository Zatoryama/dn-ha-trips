import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from '@/data/driverStore';

export const dynamic = 'force-dynamic';

const ADMIN_PASSWORD = 'di-mo-rua';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: 'Wrong password' }, { status: 401 });
  }

  const token = createAdminToken();
  return NextResponse.json({ success: true, token });
}
