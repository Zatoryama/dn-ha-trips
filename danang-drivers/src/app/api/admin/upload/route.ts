import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { validateAdminToken } from '@/data/driverStore';

export async function POST(request: NextRequest) {
  const token = request.headers.get('X-Admin-Token');
  if (!token || !validateAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const driverId = formData.get('driverId') as string | null;

  if (!file || !driverId) {
    return NextResponse.json({ error: 'File and driverId are required' }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, and WebP images are allowed' }, { status: 400 });
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${driverId}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  const publicPath = `/uploads/${filename}`;

  return NextResponse.json({ success: true, path: publicPath });
}
