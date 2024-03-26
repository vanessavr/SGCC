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
        '1a364153-2864-461c-996a-d4382ac63aa2': [
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
        ],
        'b202d04e-eb12-4cf5-9c2d-d382536e7ff4': ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        'd7f72697-7937-490a-953d-26bd122d6c3e': ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil', '/area-de-formacion', '/solicitud'],
        '4a29d9e1-76aa-49ff-9ccc-e0a3d2ec90c9': ['/iniciar-sesion', '/usuario-invitado', '/panel-principal', '/acceso-no-autorizado', '/perfil',  '/curso-asignado', '/solicitud'],
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
    matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$).*)'],
}
