'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Solicitud } from '@/types/MyTypes'
import { useEffect, useState } from 'react'

interface Props {
    className?: string
    data?: Solicitud
}
export default function FormularioSolicitud({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Solicitud>>()

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
                    <SelectItem value="0">Pepito</SelectItem>
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
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Tipo de solicitud</Label>
            <Select name="tipoSolicitud" value={formData?.tipoSolicitud || ''} onValueChange={(value) => handleChange('tipoSolicitud', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de solicitud " />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
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
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Motivo de solicitud</Label>
            <Select name="motivoSolicitud" value={formData?.motivoSolicitud || ''} onValueChange={(value) => handleChange('motivoSolicitud', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Motivo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Solicitante</Label>
            <Select name="usuarioId" value={formData?.usuarioId || ''} onValueChange={(value) => handleChange('usuarioId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3049ae25-01a7-43eb-a9a8-5b6e1e4b8e82">Pepito</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Curso complementario</Label>
            <Select name="cursoComplementarioId" value={formData?.cursoComplementarioId || ''} onValueChange={(value) => handleChange('cursoComplementarioId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="666ce19b-bf36-4239-8149-f005a2347181">Cableado estructurado</SelectItem>
                </SelectContent>
            </Select>

            <Button className="rounded-full w-full !mt-8">Guardar</Button>
        </form>
    )
}
