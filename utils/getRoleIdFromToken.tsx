import jwt from 'jsonwebtoken'

export function getRoleIdFromToken(accessToken: string): string | null {
    try {
        const decodedToken: any = jwt.decode(accessToken)
        // Suponiendo que el rolId está almacenado en el campo "rolId" del token
        const rolId: string = decodedToken?.rolId
        return rolId
    } catch (error) {
        console.error('Error al decodificar el token:', error)
        return null
    }
}
