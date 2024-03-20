'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function FormularioSolicitud() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const fields = Object.fromEntries(new FormData(form))
        console.log(fields) // TODO Eliminar

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud`, {
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
            <Label htmlFor="">Origen de solicitud</Label>
            <Select name="origenSolicitud">
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Pepito</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor=""> Radicado de solicitud</Label>
            <Input type="text" name="radicadoSolicitud" placeholder="Radicado de la solicitud" className="rounded-full" />
            <Label htmlFor="">Segmento</Label>
            <Select name="segmento">
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
            <Select name="tipoSolicitud">
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
            <Input name="cuposSolicitados" type="number" placeholder="Cupos" className="rounded-full" />
            <Label htmlFor="">Estado de solicitud </Label>
            <Select name="estadoSolicitud">
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
            <Select name="motivoSolicitud">
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
            <Select name="usuarioId">
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una persona" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3049ae25-01a7-43eb-a9a8-5b6e1e4b8e82">Pepito</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Curso complementario</Label>
            <Select name="cursoComplementarioId">
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
