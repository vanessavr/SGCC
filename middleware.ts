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

    // Definir las URLs permitidas para cada rol
    const allowedURLs: { [rolId: string]: string[] } = {
        'f8063ac9-1e73-4d60-a264-c736da396523': [
            '/',
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
        '78790651-423e-4adb-966a-6dc3351f0404': ['/', '/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        '1c62a88d-5d56-432c-a51c-a0273cab7d1d': ['/', '/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        '9f8bcbb9-fa25-47d5-8317-f1d0498e6c4c': [
            '/',
            '/iniciar-sesion',
            '/usuario-invitado',
            '/panel-principal',
            '/acceso-no-autorizado',
            '/perfil',
            '/curso-asignado',
            '/solicitud',
            '/descarga-archivos',
        ],
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

    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/iniciar-sesion' || request.nextUrl.pathname === '/usuario-invitado') {
        // Si la URL es la raíz, redirigir a /panel-principal
        return NextResponse.redirect(new URL('/panel-principal', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$|.*\\.mp3|.*\\.(?:png|jpg|jpeg|gif|ico)$).*)'],
}
