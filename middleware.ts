// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const role = req.cookies.get('account_type')?.value;
    const { pathname } = req.nextUrl

    // Only protect /admin and /client routes
    const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/client');

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Redirect to home if no role cookie exists
    if (!role || role === '') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // Redirect based on role mismatch
    // account_type: 0 = admin, 1 = client
    if (role === '0' && pathname.startsWith('/client')) {
        return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (role === '1' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/client', req.url))
    }

    return NextResponse.next()
}

// Only run middleware on specific routes
export const config = {
    matcher: ['/admin/:path*', '/client/:path*']
}
