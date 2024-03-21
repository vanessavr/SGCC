'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ambiente } from '@/types/MyTypes'
import { useEffect, useState } from 'react'

interface Props {
    className?: string
    data?: Ambiente
}
export default function FormularioAmbiente({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Ambiente>>()

    useEffect(() => {
        if (data) {
            // const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(data)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${data ? data?.id : ''}`, {
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
            <Label htmlFor="">Nombre</Label>
            <Input
                type="text"
                name="nombre"
                value={formData?.nombre || ''}
                onChange={(event) => handleChange('nombre', event.target.value)}
                placeholder="Nombre del ambiente"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Capacidad</Label>
            <Input
                type="number"
                name="capacidad"
                value={formData?.capacidad || ''}
                onChange={(event) => handleChange('capacidad', event.target.value)}
                placeholder="Capacidad"
                className="rounded-full"
            />

            <Label htmlFor="">Centro de formación</Label>
            <Select name="centroFormacion" value={formData?.centroFormacion || ''} onValueChange={(value) => handleChange('centroFormacion', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un centro" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Centro de Procesos Industriales y Construcción</SelectItem>
                    <SelectItem value="2">Centro de Automatización Industrial</SelectItem>
                    <SelectItem value="3">Centro de Comercio y Servicios</SelectItem>
                    <SelectItem value="4">Centro Agropecuario</SelectItem>
                    <SelectItem value="5">Centro para la Formación Cafetera</SelectItem>
                </SelectContent>
            </Select>

            <Button className="rounded-full w-full">Guardar</Button>
        </form>
    )
}
