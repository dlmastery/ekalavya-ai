import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  const publicPaths = ['/', '/onboarding', '/api']
  if (publicPaths.some((p) => pathname.startsWith(p)) || pathname === '/') {
    return NextResponse.next()
  }

  // Check for onboarding completion via cookie
  const isOnboarded = request.cookies.get('ekalavya-onboarded')?.value === 'true'

  if (!isOnboarded) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
