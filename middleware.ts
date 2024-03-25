import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    if (accessToken && request.nextUrl.pathname.startsWith('/iniciar-sesion')) {
        return NextResponse.redirect(new URL('/panel-principal', request.url))
    } else if (accessToken) {
        return
    }

    if (!accessToken && !request.nextUrl.pathname.startsWith('/iniciar-sesion') && !request.nextUrl.pathname.startsWith('/usuario-invitado')) {
        return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
