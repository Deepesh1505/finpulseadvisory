import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { saveLocalPerformanceRecords, getLocalPerformance, PerformanceRecord } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet);

    if (!rawRows || rawRows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Excel file contains no data rows.' },
        { status: 400 }
      );
    }

    const parsedRecords: PerformanceRecord[] = [];

    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];

      // Handle common variations in column headers
      const symbol = row['Symbol'] || row['symbol'] || row['Stock'] || row['Instrument'];
      const segment = (row['Segment'] || row['segment'] || 'Equity') as 'Equity' | 'F&O' | 'Commodity';
      const tradeDate = row['Trade Date'] || row['Date'] || row['trade_date'] || new Date().toISOString().slice(0, 10);
      const buyPrice = Number(row['Buy Price'] || row['Entry'] || row['buy_price'] || 0);
      const targetPrice = Number(row['Target Price'] || row['Target'] || row['target_price'] || 0);
      const stopLoss = Number(row['Stop Loss'] || row['SL'] || row['stop_loss'] || 0);
      const exitPrice = Number(row['Exit Price'] || row['Exit'] || row['exit_price'] || targetPrice);
      const status = (row['Status'] || row['status'] || 'Target Hit') as 'Target Hit' | 'SL Hit' | 'Booked' | 'Active';

      let pnl = Number(row['P&L %'] || row['PnL%'] || row['pnl_percentage']);
      if (isNaN(pnl) || pnl === 0) {
        if (buyPrice > 0 && exitPrice > 0) {
          pnl = Number((((exitPrice - buyPrice) / buyPrice) * 100).toFixed(2));
        } else {
          pnl = 0;
        }
      }

      if (symbol && buyPrice > 0) {
        parsedRecords.push({
          id: `PR-UP-${Date.now()}-${i}`,
          trade_date: String(tradeDate),
          symbol: String(symbol),
          segment,
          buy_price: buyPrice,
          target_price: targetPrice,
          stop_loss: stopLoss,
          exit_price: exitPrice,
          status,
          pnl_percentage: pnl,
        });
      }
    }

    if (parsedRecords.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Could not parse any valid trade rows. Check column headers.' },
        { status: 400 }
      );
    }

    // Insert into Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('performance_records').insert(
          parsedRecords.map((r) => ({
            trade_date: r.trade_date,
            symbol: r.symbol,
            segment: r.segment,
            buy_price: r.buy_price,
            target_price: r.target_price,
            stop_loss: r.stop_loss,
            exit_price: r.exit_price,
            status: r.status,
            pnl_percentage: r.pnl_percentage,
          }))
        );
      } catch (dbErr) {
        console.warn('Supabase bulk insert warning:', dbErr);
      }
    }

    // Merge into local store
    const existing = getLocalPerformance();
    saveLocalPerformanceRecords([...parsedRecords, ...existing]);

    return NextResponse.json({
      success: true,
      message: `Successfully parsed and imported ${parsedRecords.length} trade recommendations.`,
      count: parsedRecords.length,
    });
  } catch (err: any) {
    console.error('Track sheet upload error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Error parsing Excel file' },
      { status: 500 }
    );
  }
}

// Download Sample Template
export async function GET() {
  const sampleData = [
    {
      'Trade Date': '2026-10-02',
      'Symbol': 'BANKNIFTY 54500 CE',
      'Segment': 'F&O',
      'Buy Price': 310,
      'Target Price': 520,
      'Stop Loss': 230,
      'Exit Price': 525,
      'Status': 'Target Hit',
      'P&L %': 69.35,
    },
    {
      'Trade Date': '2026-10-01',
      'Symbol': 'INFOSYS',
      'Segment': 'Equity',
      'Buy Price': 1880,
      'Target Price': 2040,
      'Stop Loss': 1810,
      'Exit Price': 2035,
      'Status': 'Target Hit',
      'P&L %': 8.24,
    },
    {
      'Trade Date': '2026-09-30',
      'Symbol': 'CRUDE OIL (MCX)',
      'Segment': 'Commodity',
      'Buy Price': 5920,
      'Target Price': 6200,
      'Stop Loss': 5790,
      'Exit Price': 6180,
      'Status': 'Booked',
      'P&L %': 4.39,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample Trades Template');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="FinPulse_Trades_Template.xlsx"',
    },
  });
}
