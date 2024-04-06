import { Persona, Ambiente, Empresa, Solicitud, CursoComplementario, UsuarioInvitado } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export async function getProfile(): Promise<any> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile`, 'GET')
    } catch (error: any) {
        return error
    }
}

export async function getCursosAsignados(instructorId: string): Promise<any> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${instructorId}/curso-complementario`, 'GET')
    } catch (error: any) {
        return error
    }
}

export async function updateProfilePersona(data: Persona): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile/update-persona`, 'PATCH', data)
    } catch (error: any) {
        return error
    }
}

export async function updateFotoPerfil(data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/upload-foto`, 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function updateFotoPerfilEmpresa(data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/upload-foto`, 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function updateFotoUser(id: string, data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${id}/upload-foto-user`, 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function updateProfileEmpresa(data: Empresa): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/profile/update-empresa`, 'PATCH', data)
    } catch (error: any) {
        return error
    }
}

export async function savePersona(data: Persona): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function deletePersona(personaId: string): Promise<object[]> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${personaId || ''}`, 'DELETE')
    } catch (error: any) {
        return error
    }
}

export async function saveUsuarioInvitado(data: UsuarioInvitado): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario-invitado/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function saveAmbiente(data: Ambiente): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function deleteAmbiente(ambienteId: string): Promise<object[]> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${ambienteId || ''}`, 'DELETE')
    } catch (error: any) {
        return error
    }
}

export async function saveCursoComplementario(data: CursoComplementario): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function deleteCursoComplementario(cursoComplementarioId: string): Promise<object[]> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${cursoComplementarioId || ''}`, 'DELETE')
    } catch (error: any) {
        return error
    }
}

export async function saveEmpresa(data: Empresa): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function deleteEmpresa(empresaId: string): Promise<object[]> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${empresaId || ''}`, 'DELETE')
    } catch (error: any) {
        return error
    }
}

export async function saveSolicitud(data: Solicitud): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${data.id || ''}`, data.id ? 'PATCH' : 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function deleteSolicitud(solicitud: string): Promise<object[]> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${solicitud || ''}`, 'DELETE')
    } catch (error: any) {
        return error
    }
}

export async function applySolicitud(id: string, data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/aplicar-curso-complementario/${id}`, 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function applySolicitudEmpresa(id: string, data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/aplicar-curso-complementario-empresa/${id}`, 'POST', data)
    } catch (error: any) {
        return error
    }
}

export async function updateEstadoSolicitud(id: string, data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${id}/cambiar-estado`, 'PATCH', data)
    } catch (error: any) {
        return error
    }
}

export async function uploadArchivo(id: string, data: any): Promise<Response> {
    try {
        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${id}/upload-archivo`, 'POST', data)
    } catch (error: any) {
        return error
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
        return error
    }
}

export async function cambiarPasswordEmpresa(oldPassword: string, newPassword: string, id: string): Promise<Persona> {
    try {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            empresaId: id,
        }

        return await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/cambiar-password-empresa`, 'POST', data)
    } catch (error: any) {
        return error
    }
}
