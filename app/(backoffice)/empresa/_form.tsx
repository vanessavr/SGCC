'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface Props {
    className?: string
}
export default function FormularioEmpresa({ className }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const fields = Object.fromEntries(new FormData(form))
        console.log(fields) // TODO Eliminar

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(fields),
        })
    }
    return (
        <form onSubmit={handleSubmit} action="" className={className}>
            <Label htmlFor="" className="self-center">
                Razón social
            </Label>
            <Input name="razonSocial" type="text" placeholder="Nombre de la empresa" className="!mt-0 rounded-full" />
            <Label htmlFor="" className="self-center">
                NIT
            </Label>
            <Input name="nit" type="number" placeholder="NIT (Sin dígito de verificación)" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Representante legal
            </Label>
            <Input name="representanteLegal" type="text" placeholder="Nombre del representante legal" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Correo electrónico
            </Label>
            <Input name="correoElectronico" type="email" placeholder="Correo electrónico" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Celular
            </Label>
            <Input name="celular" type="number" placeholder="Celular" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Dirección
            </Label>
            <Input name="direccion" type="text" placeholder="Dirección" className="rounded-full" />
            <Label htmlFor="" className="self-center">
                Actividad económica
            </Label>
            <Select name="actividadEconomica">
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
            <Select name="departamento">
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
            <Select name="ciudad">
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una ciudad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Light</SelectItem>
                    <SelectItem value="1">Dark</SelectItem>
                    <SelectItem value="2">System</SelectItem>
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
