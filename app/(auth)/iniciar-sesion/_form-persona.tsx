'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export default function FormularioPersona() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const fields = Object.fromEntries(new FormData(form))
        console.log(fields) // TODO Eliminar

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(fields),
        })
    }

    return (
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 space-y-4">
            <Label htmlFor="" className="self-center">
                Nombres *
            </Label>
            <Input type="text" placeholder="Nombres" name="nombres" className="!mt-0 rounded-full" required />
            <Label htmlFor="" className="self-center">
                Apellidos
            </Label>
            <Input type="text" placeholder="Apellidos" name="apellidos" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Tipo de documento
            </Label>
            <Select name="tipoDocumento">
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
            <Input type="number" name="numeroIdentificacion" placeholder="Número de identificación" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Fecha de nacimiento
            </Label>
            <DatePicker placeholder="Seleccione una fecha" name="fechaNacimiento" />
            <Label htmlFor="" className="self-center">
                Género
            </Label>

            <RadioGroup name="genero" defaultValue="option-one" className="flex items-center justify-center gap-10">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-m">M:</Label>
                    <RadioGroupItem value="0" id="option-one" />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-f">F:</Label>
                    <RadioGroupItem value="1" id="option-f" />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-o">O:</Label>
                    <RadioGroupItem value="2" id="option-o" />
                </div>
            </RadioGroup>
            <Label htmlFor="" className="self-center">
                Correo electrónico
            </Label>
            <Input type="email" name="correoElectronico" placeholder="Correo electrónico" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Celular
            </Label>
            <Input type="number" name="celular" placeholder="Celular" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Departamento
            </Label>
            <Select name="departamento">
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
            <Select name="ciudad">
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
            <Select name="poblacionEspecial">
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
            <Label htmlFor="" className="self-center">
                Contraseña
            </Label>
            <Input type="password" name="password" placeholder="Contraseña" className="rounded-full" />
            <Button className="rounded-full w-full col-span-2">Registrar</Button>
        </form>
    )
}
