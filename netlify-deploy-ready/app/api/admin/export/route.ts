import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getLocalLeads, Lead } from '@/lib/store';

export async function GET() {
  try {
    let leads: Lead[] = [];

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        leads = data;
      }
    }

    if (leads.length === 0) {
      leads = getLocalLeads();
    }

    // Format data for clean, professional Excel columns
    const formattedData = leads.map((item, index) => ({
      'S.No': index + 1,
      'Lead ID': item.id,
      'Full Name': item.full_name,
      'Phone Number': item.phone_number,
      'Email Address': item.email || 'N/A',
      'Trading Segment': item.trading_segment,
      'Investment Capital': item.investment_capital,
      'Occupation': item.occupation || 'N/A',
      'Enrolled Plan': item.plan_name || 'General Inquiry',
      'Lead Status': item.status,
      'Inquiry Date (IST)': new Date(item.created_at).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    
    // Auto-fit column widths
    const columnWidths = [
      { wch: 6 },
      { wch: 14 },
      { wch: 22 },
      { wch: 18 },
      { wch: 26 },
      { wch: 22 },
      { wch: 20 },
      { wch: 20 },
      { wch: 24 },
      { wch: 12 },
      { wch: 22 },
    ];
    worksheet['!cols'] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FinPulse Inquiries');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const filename = `FinPulse_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error('Excel export error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to export Excel' },
      { status: 500 }
    );
  }
}
