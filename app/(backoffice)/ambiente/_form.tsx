'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ambiente } from '@/types/MyTypes'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { saveAmbiente } from '@/lib/actions'

interface Props {
    className?: string
    data?: Ambiente
}
export default function FormularioAmbiente({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Ambiente>>()
    const { toast } = useToast()

    useEffect(() => {
        if (data) {
            // const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(data)
        }
    }, [data])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await saveAmbiente(formData as Ambiente)
            toast({ title: '✔️', description: 'Ambiente guardado satisfactoriamente' })
        } catch (error) {
            console.error('Error al guardar el ambiente:', error)
            toast({ title: '✖️', description: 'Error al guardar el ambiente' })
        }
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <form onSubmit={handleSubmit} className={`${className}`}>
            <Label htmlFor="">Nombre *</Label>
            <Input
                type="text"
                name="nombre"
                value={formData?.nombre || ''}
                onChange={(event) => handleChange('nombre', event.target.value)}
                placeholder="Nombre del ambiente"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Capacidad *</Label>
            <Input
                type="number"
                name="capacidad"
                value={formData?.capacidad || ''}
                onChange={(event) => handleChange('capacidad', event.target.value)}
                placeholder="Capacidad"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Centro de formación *</Label>
            <Select name="centroFormacion" value={formData?.centroFormacion || ''} onValueChange={(value) => handleChange('centroFormacion', value)} required>
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
