// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const role = req.cookies.get('role')?.value || 'client';
    const { pathname } = req.nextUrl

    // Protect routes based on role
    if (!role || role === '') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    switch (role) {
        case 'admin':
            if (pathname.startsWith('/client')) {
                return NextResponse.redirect(new URL('/admin', req.url))
            }
            break;
        case 'client':
            if (pathname.startsWith('/admin')) {
                return NextResponse.redirect(new URL('/client', req.url))
            }
            break;

        default:
            return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}
