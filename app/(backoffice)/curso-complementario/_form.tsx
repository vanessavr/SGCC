'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CursoComplementario } from '@/types/MyTypes'
import { useEffect, useState } from 'react'

interface Props {
    className?: string
    data?: CursoComplementario
}
export default function FormularioCurso({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<CursoComplementario>>()

    useEffect(() => {
        if (data) {
            const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(formDataWithoutAmbiente)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${data ? data?.id : ''}`, {
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
            <Label htmlFor="">Área de formación</Label>
            <Input
                type="text"
                placeholder="Área de formación"
                name="areaFormacion"
                value={formData?.areaFormacion || ''}
                onChange={(event) => handleChange('areaFormacion', event.target.value)}
                className="rounded-full"
                required
            />

            <Label htmlFor="">Nombre</Label>
            <Input type="text" placeholder="Nombre" name="nombre" value={formData?.nombre || ''} onChange={(event) => handleChange('nombre', event.target.value)} className="rounded-full" required />

            <Label htmlFor="">Ficha de formación</Label>
            <Input
                type="text"
                placeholder="Ficha de formación"
                name="fichaFormacion"
                value={formData?.fichaFormacion || ''}
                onChange={(event) => handleChange('fichaFormacion', event.target.value)}
                className="rounded-full"
            />

            <Label htmlFor="">Centro de formación</Label>
            <Select name="centroFormacion" value={formData?.centroFormacion || ''} onValueChange={(value) => handleChange('centroFormacion', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Centro de formación" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">CPIC</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Instructor</Label>
            <Select name="instructorId" value={formData?.instructorId || ''} onValueChange={(value) => handleChange('instructorId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Instructor" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0d6f26ee-8c59-485a-a643-65a648ca78e4">Cris</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Ambiente</Label>
            <Select name="ambienteId" value={formData?.ambienteId || ''} onValueChange={(value) => handleChange('ambienteId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Ambiente" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="a39e42d1-e425-4dc3-a952-3a456c745c73">Sistemas 1</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Jornada</Label>
            <Select name="jornada" value={formData?.jornada || ''} onValueChange={(value) => handleChange('jornada', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Mañana</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Ciudad</Label>
            <Select name="ciudad" value={formData?.ciudad || ''} onValueChange={(value) => handleChange('ciudad', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Manizales</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Duración</Label>
            <Input type="text" placeholder="Duración" name="duracion" value={formData?.duracion || ''} onChange={(event) => handleChange('duracion', event.target.value)} className="rounded-full" />

            <Label htmlFor="">Fecha inicio</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaInicio" value={formData?.fechaInicio || ''} onChange={(value) => handleChange('fechaInicio', value)} />

            <Label htmlFor="">Fecha fin</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaFin" value={formData?.fechaFin || ''} onChange={(value) => handleChange('fechaFin', value)} />

            <Label htmlFor="">Cupos disponibles</Label>
            <Input
                type="number"
                placeholder="Cupos"
                name="cuposDisponibles"
                value={formData?.cuposDisponibles || ''}
                onChange={(event) => handleChange('cuposDisponibles', event.target.value)}
                className="rounded-full"
            />

            <Button className="rounded-full w-full !mt-8">Guardar</Button>
        </form>
    )
}
