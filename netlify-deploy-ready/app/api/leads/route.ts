import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { saveLocalLead, Lead } from '@/lib/store';
import { sendLeadNotificationEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, phone_number, email, occupation, trading_segment, investment_capital, plan_name } = body;

    if (!full_name || !phone_number) {
      return NextResponse.json(
        { success: false, message: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    const newLead: Lead = {
      id: `LD-${Date.now().toString().slice(-6)}`,
      full_name: full_name.trim(),
      phone_number: phone_number.trim(),
      email: email ? email.trim() : undefined,
      occupation: occupation || 'Other',
      trading_segment: trading_segment || 'General Advisory',
      investment_capital: investment_capital || 'Not specified',
      status: 'New',
      created_at: new Date().toISOString(),
      plan_name: plan_name || 'General Inquiry',
    };

    // 1. If Supabase is configured with active credentials, insert into Supabase `leads` table
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('leads').insert([
          {
            full_name: newLead.full_name,
            phone_number: newLead.phone_number,
            email: newLead.email,
            occupation: newLead.occupation,
            trading_segment: newLead.trading_segment,
            investment_capital: newLead.investment_capital,
            status: 'New',
            created_at: newLead.created_at,
          },
        ]);
        if (error) {
          console.warn('[Supabase Insert Notice]:', error.message);
        }
      } catch (dbErr) {
        console.warn('[Supabase Connection Notice]:', dbErr);
      }
    }

    // 2. Persist to local store for instant accessibility & zero data loss
    saveLocalLead(newLead);

    // 3. Send instant email notification to deepeshmandloi1505@gmail.com
    try {
      await sendLeadNotificationEmail(newLead);
    } catch (emailErr) {
      console.error('[Email Notification Error]:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      lead: newLead,
    });
  } catch (err: any) {
    console.error('Lead submission API error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
