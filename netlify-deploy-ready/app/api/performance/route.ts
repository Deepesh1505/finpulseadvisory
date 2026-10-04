import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getLocalPerformance } from '@/lib/store';

export async function GET() {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('performance_records')
        .select('*')
        .order('trade_date', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, records: data });
      }
    }

    const records = getLocalPerformance();
    return NextResponse.json({ success: true, records });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error loading records' },
      { status: 500 }
    );
  }
}
