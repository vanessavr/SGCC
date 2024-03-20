'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function FormularioCurso() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const fields = Object.fromEntries(new FormData(form))
        console.log(fields) // TODO Eliminar

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(fields),
        })
    }
    return (
        <form onSubmit={handleSubmit} action="" className="flex flex-col space-y-3">
            <Label htmlFor="">Área de formación</Label>
            <Input type="text" placeholder="Área de formación" name="areaFormacion" className="rounded-full" required />
            <Label htmlFor="">Nombre</Label>
            <Input type="text" placeholder="Nombre" name="nombre" className="rounded-full" required />
            <Label htmlFor=""> Ficha de formación</Label>
            <Input type="text" placeholder="Ficha de formación" name="fichaFormacion" className="rounded-full" />
            <Label htmlFor="">Centro de formación</Label>
            <Select name="centroFormacion">
                <SelectTrigger>
                    <SelectValue placeholder="Centro de formación" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">CPIC</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Instructor</Label>
            <Select name="instructorId">
                <SelectTrigger>
                    <SelectValue placeholder="Instructor" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3049ae25-01a7-43eb-a9a8-5b6e1e4b8e82">Cris</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Ambiente</Label>
            <Select name="ambienteId">
                <SelectTrigger>
                    <SelectValue placeholder="Ambiente" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="a39e42d1-e425-4dc3-a952-3a456c745c73">Sistemas 1</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Jornada</Label>
            <Select name="jornada">
                <SelectTrigger>
                    <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Mañana</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Ciudad</Label>
            <Select name="ciudad">
                <SelectTrigger>
                    <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Manizales</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Duración</Label>
            <Input name="duracion" type="text" placeholder="Duración" className="rounded-full" />

            <Label htmlFor="">Fecha inicio</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaInicio" />
            <Label htmlFor="">Fecha fin</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaFin" />

            <Label htmlFor="">Cupos disponibles</Label>
            <Input name="cuposDisponibles" type="number" placeholder="Cupos" className="rounded-full" />

            <Button className="rounded-full w-full !mt-8">Guardar</Button>
        </form>
    )
}
