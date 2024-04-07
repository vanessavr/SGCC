import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenData } from './utils/getTokenData'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
        // Redirigir al inicio de sesión si no hay token de acceso
        if (!request.nextUrl.pathname.startsWith('/iniciar-sesion') && !request.nextUrl.pathname.startsWith('/usuario-invitado')) {
            return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
        }
        return
    }

    const tokenData = getTokenData(accessToken)

    if (!tokenData?.rolId) {
        // Manejar caso donde no se puede obtener el rolId del token
        console.error('No se pudo obtener el rolId del token')
        return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
    }

    const ADMIN_ID = process.env.NEXT_PUBLIC_NESTJS_ROL_ADMIN_ID || ''
    const INSTRUCTOR_ID = process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID || ''
    const EMPRESA_ID = process.env.NEXT_PUBLIC_NESTJS_ROL_EMPRESA_ID || ''
    const PERSONA_ID = process.env.NEXT_PUBLIC_NESTJS_ROL_PERSONA_ID || ''

    // Definir las URLs permitidas para cada rol
    const allowedURLs: { [rolId: string]: string[] } = {
        [ADMIN_ID]: [
            '/iniciar-sesion',
            '/panel-principal',
            '/acceso-no-autorizado',
            '/perfil',
            '/area-de-formacion',
            '/ambiente',
            '/usuario',
            '/empresa',
            '/curso-complementario',
            '/curso-asignado',
            '/solicitud',
            '/descarga-archivos',
        ],
        [PERSONA_ID]: ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        [EMPRESA_ID]: ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        [INSTRUCTOR_ID]: ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/curso-asignado', '/solicitud', '/descarga-archivos'],
    }

    const allowedURLsForRole = allowedURLs[tokenData?.rolId]

    if (!allowedURLsForRole) {
        // Manejar caso donde el tokenData?.rolId no está mapeado a ninguna URL permitida
        console.error('RolId no permitido:', tokenData?.rolId)
        // return NextResponse.forbidden()
    }

    // Verificar si la URL solicitada está permitida para el rol actual
    if (!allowedURLsForRole.some((url) => request.nextUrl.pathname.startsWith(url))) {
        // Redirigir a una página de acceso no autorizado si la URL no está permitida
        return NextResponse.redirect(new URL('/acceso-no-autorizado', request.url))
    }

    // Permitir el acceso si la URL está permitida para el rol actual
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$|.*\\.mp3|.*\\.(?:png|jpg|jpeg|gif|ico)$).*)'],
}
