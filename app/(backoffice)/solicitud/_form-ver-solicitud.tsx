'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { saveSolicitud } from '@/lib/actions'
import { CursoComplementario, Empresa, Persona, Solicitud, UsuarioInvitado } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'

interface Props {
    className?: string
    solicitud?: Solicitud
}
export default function FormularioVerSolicitud({ className, solicitud }: Props) {
    const { data: cursosComplementarios, error: erroCursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)
    const { data: usuarios, error: erroUsuarios } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/rol/${process.env.NEXT_PUBLIC_NESTJS_ROL_PERSONA_ID}`, fetcher)
    const { data: empresas, error: erroEmpresas } = useSWR<Empresa[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa`, fetcher)
    const { data: usuariosInvitados, error: erroUsuariosInvitados } = useSWR<UsuarioInvitado[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario-invitado`, fetcher)

    return (
        <form className="p-8 grid grid-cols-2 space-y-4">
            <Label htmlFor="" className="font-bold self-center">
                Origen de solicitud:
            </Label>
            <Select name="origenSolicitud" value={solicitud?.origenSolicitud || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Ticket</SelectItem>
                    <SelectItem value="2">Correo electrónico</SelectItem>
                    <SelectItem value="3">Conferencia</SelectItem>
                    <SelectItem value="4">Aplicativo Web</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Radicado de solicitud:
            </Label>
            <Input type="text" name="radicadoSolicitud" placeholder="Radicado de la solicitud" value={solicitud?.radicadoSolicitud || ''} className="rounded-full" disabled />

            <Label htmlFor="" className="font-bold self-center">
                Segmento:
            </Label>
            <Select name="segmento" value={solicitud?.segmento || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Segmento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Individual</SelectItem>
                    <SelectItem value="2">Aprendices</SelectItem>
                    <SelectItem value="3">Empresa</SelectItem>
                    <SelectItem value="4">Institución</SelectItem>
                    <SelectItem value="5">Entidad Territorial</SelectItem>
                    <SelectItem value="6">Funcionarios y Contratistas</SelectItem>
                    <SelectItem value="7">CPIC</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Tipo de solicitud:
            </Label>
            <Select name="tipoSolicitud" value={solicitud?.tipoSolicitud || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de solicitud " />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Formación</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Cupos solicitados:
            </Label>
            <Input type="number" name="cuposSolicitados" placeholder="Cupos solicitados" value={solicitud?.cuposSolicitados || ''} className="rounded-full" disabled />

            <Label htmlFor="" className="font-bold self-center">
                Estado de solicitud:
            </Label>
            <Select name="estadoSolicitud" value={solicitud?.estadoSolicitud || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Abierta</SelectItem>
                    <SelectItem value="0">Cerrada</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Motivo de solicitud:
            </Label>
            <Select name="motivoSolicitud" value={solicitud?.motivoSolicitud || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Motivo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">En cola</SelectItem>
                    <SelectItem value="2">En cola - Faltan datos</SelectItem>
                    <SelectItem value="3">Sin respuesta</SelectItem>
                    <SelectItem value="4">No interesado</SelectItem>
                    <SelectItem value="5">Cancelada</SelectItem>
                    <SelectItem value="6">Por convocar</SelectItem>
                    <SelectItem value="7">Programada</SelectItem>
                    <SelectItem value="8">Sin oferta disponible</SelectItem>
                    <SelectItem value="9">Sin instructor disponible</SelectItem>
                    <SelectItem value="10">Instructor asignado</SelectItem>
                    <SelectItem value="11">Satisfecha</SelectItem>
                    <SelectItem value="12">Trasladada</SelectItem>
                    <SelectItem value="13">Pendiente</SelectItem>
                    <SelectItem value="14">Duplicada</SelectItem>
                    <SelectItem value="15">En cola - Aplazada</SelectItem>
                    <SelectItem value="16">Por completar cupo mínimo</SelectItem>
                    <SelectItem value="17">Propuesta de oferta enviada</SelectItem>
                    <SelectItem value="18">Cerrada</SelectItem>
                    <SelectItem value="19">Por enviar listad de interesados</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Persona solicitante:
            </Label>
            <Select name="usuarioId" value={solicitud?.usuarioId || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                    {usuarios?.map((usuario, index) => (
                        <SelectItem key={usuario.id} value={usuario.id}>
                            {usuario.nombres + ' ' + usuario.apellidos}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Empresa solicitante:
            </Label>
            <Select name="empresaId" value={solicitud?.empresaId || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una empresa" />
                </SelectTrigger>
                <SelectContent>
                    {empresas?.map((empresa, index) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                            {empresa.razonSocial}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Usuario invitado solicitante:
            </Label>
            <Select name="usuarioInvitadoId" value={solicitud?.usuarioInvitadoId || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una usuario" />
                </SelectTrigger>
                <SelectContent>
                    {usuariosInvitados?.map((usuarioInvitado, index) => (
                        <SelectItem key={usuarioInvitado.id} value={usuarioInvitado.id}>
                            {usuarioInvitado.nombres + ' ' + usuarioInvitado.apellidos}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="" className="font-bold self-center">
                Curso complementario:
            </Label>
            <Select name="cursoComplementarioId" value={solicitud?.cursoComplementarioId || ''} disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                    {cursosComplementarios?.map((cursoComplementario, index) => (
                        <SelectItem key={cursoComplementario.id} value={cursoComplementario.id}>
                            {cursoComplementario.nombre}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </form>
    )
}
