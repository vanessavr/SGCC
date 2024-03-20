'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Empresa } from '@/types/MyTypes'
import { useEffect, useState } from 'react'

interface Props {
    className?: string
    data?: Empresa
}
export default function FormularioEmpresa({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Empresa>>()

    useEffect(() => {
        if (data) {
            // const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(data)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${data ? data?.id : ''}`, {
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
            <Label htmlFor="" className="self-center">
                Razón social
            </Label>
            <Input
                type="text"
                name="razonSocial"
                value={formData?.razonSocial || ''}
                onChange={(event) => handleChange('razonSocial', event.target.value)}
                placeholder="Nombre de la empresa"
                className="!mt-0 rounded-full"
            />

            <Label htmlFor="" className="self-center">
                NIT
            </Label>
            <Input
                type="number"
                name="nit"
                value={formData?.nit || ''}
                onChange={(event) => handleChange('nit', event.target.value)}
                placeholder="NIT (Sin dígito de verificación)"
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Representante legal
            </Label>
            <Input
                type="text"
                name="representanteLegal"
                value={formData?.representanteLegal || ''}
                onChange={(event) => handleChange('representanteLegal', event.target.value)}
                placeholder="Nombre del representante legal"
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Correo electrónico
            </Label>
            <Input
                type="email"
                name="correoElectronico"
                value={formData?.correoElectronico || ''}
                onChange={(event) => handleChange('correoElectronico', event.target.value)}
                placeholder="Correo electrónico"
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Celular
            </Label>
            <Input type="number" name="celular" value={formData?.celular || ''} onChange={(event) => handleChange('celular', event.target.value)} placeholder="Celular" className="rounded-full" />

            <Label htmlFor="" className="self-center">
                Dirección
            </Label>
            <Input
                type="text"
                name="direccion"
                value={formData?.direccion || ''}
                onChange={(event) => handleChange('direccion', event.target.value)}
                placeholder="Dirección"
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Actividad económica
            </Label>
            <Select name="actividadEconomica" value={formData?.actividadEconomica || ''} onValueChange={(value) => handleChange('actividadEconomica', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una actividad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="self-center">
                Departamento
            </Label>
            <Select name="departamento" value={formData?.departamento || ''} onValueChange={(value) => handleChange('departamento', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un departamento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="self-center">
                Ciudad
            </Label>
            <Select name="ciudad" value={formData?.ciudad || ''} onValueChange={(value) => handleChange('ciudad', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una ciudad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
                </SelectContent>
            </Select>

            {!data && (
                <>
                    <Label htmlFor="" className="self-center">
                        Contraseña
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData?.password || ''}
                        onChange={(event) => handleChange('password', event.target.value)}
                        placeholder="Contraseña"
                        className="rounded-full"
                    />
                </>
            )}
            <Button className="rounded-full w-full col-span-2">Registrar</Button>
        </form>
    )
}
