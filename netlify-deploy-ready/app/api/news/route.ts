import { NextResponse } from 'next/server';
import { getMarketNews } from '@/lib/news';

export const revalidate = 600; // Cache for 10 minutes

export async function GET() {
  try {
    const news = await getMarketNews();
    return NextResponse.json({ success: true, news });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Error fetching news' },
      { status: 500 }
    );
  }
}
