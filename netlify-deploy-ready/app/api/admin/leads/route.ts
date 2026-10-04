import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getLocalLeads, updateLocalLeadStatus } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, leads: data });
      }
    }

    const leads = getLocalLeads();
    return NextResponse.json({ success: true, leads });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error loading leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing lead ID or status' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('leads').update({ status }).eq('id', id);
    }

    updateLocalLeadStatus(id, status);

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error updating lead' },
      { status: 500 }
    );
  }
}
