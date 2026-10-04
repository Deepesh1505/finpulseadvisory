import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'FinPulse@2026';
const AUTH_COOKIE = 'finpulse_admin_token';
const AUTH_SECRET = 'finpulse_session_active_key_2026';

export async function POST(req: NextRequest) {
  try {
    const { username, password, action } = await req.json();

    if (action === 'logout') {
      const cookieStore = cookies();
      cookieStore.delete(AUTH_COOKIE);
      return NextResponse.json({ success: true, message: 'Logged out' });
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const cookieStore = cookies();
      cookieStore.set(AUTH_COOKIE, AUTH_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully',
        username: ADMIN_USER,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid Admin username or password.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE);

  if (token && token.value === AUTH_SECRET) {
    return NextResponse.json({ authenticated: true, username: ADMIN_USER });
  }

  return NextResponse.json({ authenticated: false });
}
