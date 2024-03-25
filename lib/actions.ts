import { Login, Persona, Ambiente, Empresa, Solicitud, CursoComplementario } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function savePersona(data: Persona): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el usuario: ' + error.message)
    }
}

export async function deletePersona(personaId: string): Promise<void> {
    try {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${personaId || ''}`, 'DELETE')

        return res
    } catch (error: any) {
        throw new Error('Error al eliminar la persona: ' + error.message)
    }
}

export async function saveAmbiente(data: Ambiente): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el ambiente: ' + error.message)
    }
}

export async function deleteAmbiente(ambienteId: string): Promise<void> {
    try {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${ambienteId || ''}`, 'DELETE')

        return res
    } catch (error: any) {
        throw new Error('Error al eliminar el ambiente: ' + error.message)
    }
}

export async function saveCursoComplementario(data: CursoComplementario): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el curso complementario: ' + error.message)
    }
}

export async function deleteCursoComplementario(cursoComplementarioId: string): Promise<void> {
    try {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${cursoComplementarioId || ''}`, 'DELETE')

        return res
    } catch (error: any) {
        throw new Error('Error al eliminar el curso complementario: ' + error.message)
    }
}

export async function saveEmpresa(data: Empresa): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el empresa: ' + error.message)
    }
}

export async function deleteEmpresa(empresaId: string): Promise<void> {
    try {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${empresaId || ''}`, 'DELETE')

        return res
    } catch (error: any) {
        throw new Error('Error al eliminar el empresa: ' + error.message)
    }
}

export async function saveSolicitud(data: Solicitud): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el solicitud: ' + error.message)
    }
}

export async function deleteSolicitud(solicitud: string): Promise<void> {
    try {
        const res = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${solicitud || ''}`, 'DELETE')

        return res
    } catch (error: any) {
        throw new Error('Error al eliminar el solicitud: ' + error.message)
    }
}
