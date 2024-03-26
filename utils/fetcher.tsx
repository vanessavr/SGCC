'use server'

import { cookies } from 'next/headers'

export const fetcher = async (url: string, method?: string, data?: object) => {
    const accessToken = getAccessTokenFromCookie()

    const response = await fetch(url, {
        method: method ? method : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Error al realizar la acción')
    }

    return response.json()
}

// Función para obtener el token de acceso de la cookie
export const getAccessTokenFromCookie = () => {
    const cookieStore = cookies()

    const token = cookieStore.get('accessToken')

    if (!token) {
        return null
        // throw new Error('No se encontró el token de acceso en la cookie')
    }

    return token.value
}
