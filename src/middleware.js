import { NextResponse } from 'next/server';

export function middleware(request) {
    // Simple middleware - just let everything through
    // Authentication will be handled client-side with sessionStorage
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
