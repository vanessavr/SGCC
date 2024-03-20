'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Persona } from '@/types/MyTypes'

interface Props {
    className?: string
    data?: Persona
}
export default function FormularioPersona({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Persona>>()

    useEffect(() => {
        if (data) {
            setFormData(data)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${data ? data?.id : ''}`, {
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
                Nombres
            </Label>
            <Input
                type="text"
                placeholder="Nombres"
                name="nombres"
                value={formData?.nombres || ''}
                onChange={(event) => handleChange('nombres', event.target.value)}
                className="rounded-full"
                required
            />

            <Label htmlFor="" className="self-center">
                Apellidos
            </Label>
            <Input
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={formData?.apellidos || ''}
                onChange={(event) => handleChange('apellidos', event.target.value)}
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Tipo de documento
            </Label>
            <Select name="tipoDocumento" value={formData?.tipoDocumento || ''} onValueChange={(value) => handleChange('tipoDocumento', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="1">Cédula de Extranjería</SelectItem>
                    <SelectItem value="2">Tarjeta de Identidad</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="self-center">
                Número de identificación
            </Label>
            <Input
                type="number"
                name="numeroIdentificacion"
                value={formData?.numeroIdentificacion || ''}
                onChange={(event) => handleChange('numeroIdentificacion', event.target.value)}
                placeholder="Número de identificación"
                className="rounded-full"
            />

            <Label htmlFor="" className="self-center">
                Fecha de nacimiento
            </Label>
            <DatePicker placeholder="Seleccione una fecha" name="fechaNacimiento" value={formData?.fechaNacimiento || ''} onChange={(value) => handleChange('fechaNacimiento', value)} />

            <Label htmlFor="" className="self-center">
                Género
            </Label>
            <RadioGroup name="genero" value={formData?.genero} onValueChange={(value) => handleChange('genero', value)} className="flex items-center gap-10">
                <div className="space-x-2">
                    <Label htmlFor="option-m">M:</Label>
                    <RadioGroupItem value="0" id="option-m" />
                </div>
                <div className="space-x-2">
                    <Label htmlFor="option-f">F:</Label>
                    <RadioGroupItem value="1" id="option-f" />
                </div>
                <div className="space-x-2">
                    <Label htmlFor="option-o">O:</Label>
                    <RadioGroupItem value="2" id="option-o" />
                </div>
            </RadioGroup>

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
                Departamento
            </Label>
            <Select name="departamento" value={formData?.departamento || ''} onValueChange={(value) => handleChange('departamento', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un departamento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Caldas</SelectItem>
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
                    <SelectItem value="0">Manizales</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="self-center">
                Población especial
            </Label>
            <Select name="poblacionEspecial" value={formData?.poblacionEspecial || ''} onValueChange={(value) => handleChange('poblacionEspecial', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una población..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">No aplica</SelectItem>
                    <SelectItem value="1">Con discapacidad</SelectItem>
                    <SelectItem value="2">Víctimas</SelectItem>
                    <SelectItem value="3">Indígena</SelectItem>
                    <SelectItem value="4">Afrocolombiana</SelectItem>
                    <SelectItem value="5">Comunidades negras</SelectItem>
                    <SelectItem value="6">Palenquera</SelectItem>
                    <SelectItem value="7">Raizal</SelectItem>
                    <SelectItem value="8">Privada de la libertad</SelectItem>
                    <SelectItem value="9">Jóvenes vulnerables</SelectItem>
                    <SelectItem value="10">Tercera edad</SelectItem>
                    <SelectItem value="11">En reincorporación</SelectItem>
                    <SelectItem value="12">En reintegración</SelectItem>
                    <SelectItem value="13">RROM</SelectItem>
                    <SelectItem value="14">Adolescente en conflicto con ley penal</SelectItem>
                </SelectContent>
            </Select>

            {!data && (
                <>
                    <Label htmlFor="" className="self-center">
                        Contraseña
                    </Label>
                    <Input type="password" name="password" placeholder="Contraseña" onChange={(event) => handleChange('password', event.target.value)} className="rounded-full" />
                </>
            )}
            <Button className="rounded-full w-full col-span-2">{data ? 'Guardar' : 'Registrar'}</Button>
        </form>
    )
}
