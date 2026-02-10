// Middleware for route protection
// TODO: Add authentication and authorization logic

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // TODO: Implement auth protection
    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*', '/orders/:path*', '/transactions/:path*'],
};
