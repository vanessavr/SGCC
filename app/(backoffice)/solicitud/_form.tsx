'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CursoComplementario, Persona, Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

interface Props {
    className?: string
    data?: Solicitud
}
export default function FormularioSolicitud({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Solicitud>>()
    const { data: cursosComplementarios, error: erroCursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)
    const { data: usuarios, error: erroUsuarios } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario`, fetcher)

    useEffect(() => {
        if (data) {
            const { usuario, ...formDataWithoutUsuario } = data
            setFormData(formDataWithoutUsuario)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${data ? data?.id : ''}`, {
            method: data ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formData),
        })
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <form onSubmit={handleSubmit} className={`${className}`}>
            <Label htmlFor="">Origen de solicitud</Label>
            <Select name="origenSolicitud" value={formData?.origenSolicitud || ''} onValueChange={(value) => handleChange('origenSolicitud', value)}>
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

            <Label htmlFor=""> Radicado de solicitud</Label>
            <Input
                type="text"
                name="radicadoSolicitud"
                placeholder="Radicado de la solicitud"
                value={formData?.radicadoSolicitud || ''}
                onChange={(event) => handleChange('radicadoSolicitud', event.target.value)}
                className="rounded-full"
            />

            <Label htmlFor="">Segmento</Label>
            <Select name="segmento" value={formData?.segmento || ''} onValueChange={(value) => handleChange('segmento', value)}>
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

            <Label htmlFor="">Tipo de solicitud</Label>
            <Select name="tipoSolicitud" value={formData?.tipoSolicitud || ''} onValueChange={(value) => handleChange('tipoSolicitud', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de solicitud " />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Formación</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Cupos solicitados</Label>
            <Input
                type="number"
                name="cuposSolicitados"
                placeholder="Cupos"
                value={formData?.cuposSolicitados || ''}
                onChange={(event) => handleChange('cuposSolicitados', event.target.value)}
                className="rounded-full"
            />

            <Label htmlFor="">Estado de solicitud </Label>
            <Select name="estadoSolicitud" value={formData?.estadoSolicitud || ''} onValueChange={(value) => handleChange('estadoSolicitud', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Abierta</SelectItem>
                    <SelectItem value="0">Cerrada</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Motivo de solicitud</Label>
            <Select name="motivoSolicitud" value={formData?.motivoSolicitud || ''} onValueChange={(value) => handleChange('motivoSolicitud', value)}>
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

            <Label htmlFor="">Solicitante</Label>
            <Select name="usuarioId" value={formData?.usuarioId || ''} onValueChange={(value) => handleChange('usuarioId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                    {usuarios?.map((usuario, index) => (
                        <SelectItem value={usuario.id}>{usuario.nombres + ' ' + usuario.apellidos}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="">Curso complementario</Label>
            <Select name="cursoComplementarioId" value={formData?.cursoComplementarioId || ''} onValueChange={(value) => handleChange('cursoComplementarioId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                    {cursosComplementarios?.map((cursoComplementario, index) => (
                        <SelectItem value={cursoComplementario.id}>{cursoComplementario.nombre}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button className="rounded-full w-full !mt-8">Guardar</Button>
        </form>
    )
}
