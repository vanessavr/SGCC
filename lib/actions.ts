import { Persona, Ambiente, Empresa, Solicitud, CursoComplementario, UsuarioInvitado } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function getProfile(): Promise<any> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile`, 'GET')
    } catch (error: any) {
        throw new Error('Error al obtener el perfil: ' + error.message)
    }
}

export async function getCursosAsignados(instructorId: string): Promise<any> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${instructorId}/curso-complementario`, 'GET')
    } catch (error: any) {
        throw new Error('Error al obtener el perfil: ' + error.message)
    }
}

export async function updateProfilePersona(data: Persona): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile/update-persona`, 'PATCH', data)
    } catch (error: any) {
        throw new Error('Error al actualizar el perfil: ' + error.message)
    }
}

export async function updateFotoPerfil(data: any): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/upload-foto`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al actualizar el perfil: ' + error.message)
    }
}

export async function updateProfileEmpresa(data: Empresa): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile/update-empresa`, 'PATCH', data)
    } catch (error: any) {
        throw new Error('Error al actualizar el perfil: ' + error.message)
    }
}

export async function savePersona(data: Persona): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el usuario: ' + error.message)
    }
}

export async function deletePersona(personaId: string): Promise<Persona> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${personaId || ''}`, 'DELETE')
    } catch (error: any) {
        throw new Error('Error al eliminar la persona: ' + error.message)
    }
}

export async function saveUsuarioInvitado(data: UsuarioInvitado): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario-invitado/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el usuario: ' + error.message)
    }
}

export async function saveAmbiente(data: Ambiente): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el ambiente: ' + error.message)
    }
}

export async function deleteAmbiente(ambienteId: string): Promise<Ambiente> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${ambienteId || ''}`, 'DELETE')
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

export async function deleteCursoComplementario(cursoComplementarioId: string): Promise<CursoComplementario> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${cursoComplementarioId || ''}`, 'DELETE')
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

export async function deleteEmpresa(empresaId: string): Promise<Empresa> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${empresaId || ''}`, 'DELETE')
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

export async function deleteSolicitud(solicitud: string): Promise<Solicitud> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${solicitud || ''}`, 'DELETE')
    } catch (error: any) {
        throw new Error('Error al eliminar el solicitud: ' + error.message)
    }
}

export async function applySolicitud(id: string, data: any): Promise<void> {
    try {
        await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/aplicar-curso-complementario/${id}`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al guardar el solicitud: ' + error.message)
    }
}

export async function cambiarPassword(oldPassword: string, newPassword: string, id: string): Promise<Persona> {
    try {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            userId: id,
        }

        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/cambiar-password`, 'POST', data)
    } catch (error: any) {
        throw new Error('Error al cambiar la constraseña: ' + error.message)
    }
}
