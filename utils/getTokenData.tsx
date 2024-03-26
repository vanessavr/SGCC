import jwt from 'jsonwebtoken'

export interface TokenData {
    id: string
    nombres: string
    apellidos: string
    tipoDocumento: string
    numeroIdentificacion: string
    correoElectronico: string
    departamento: string
    ciudad: string
    fechaNacimiento: string
    celular: string
    rolId: string
}

export function getTokenData(accessToken: string): TokenData | null {
    try {
        const decodedToken: any = jwt.decode(accessToken)
        if (!decodedToken) {
            throw new Error('Token inválido')
        }

        const tokenData: TokenData = {
            id: decodedToken.id || '',
            nombres: decodedToken.nombres || '',
            apellidos: decodedToken.apellidos || '',
            tipoDocumento: decodedToken.tipoDocumento || '',
            numeroIdentificacion: decodedToken.numeroIdentificacion || '',
            correoElectronico: decodedToken.correoElectronico || '',
            departamento: decodedToken.departamento || '',
            ciudad: decodedToken.ciudad || '',
            fechaNacimiento: decodedToken.fechaNacimiento || '',
            celular: decodedToken.celular || '',
            rolId: decodedToken.rolId || '',
        }

        return tokenData
    } catch (error) {
        console.error('Error al decodificar el token:', error)
        return null
    }
}
