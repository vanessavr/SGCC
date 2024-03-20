'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FormularioAmbiente() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const fields = Object.fromEntries(new FormData(form))
        console.log(fields) // TODO Eliminar

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente`, {
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
            <Label htmlFor="">Nombre</Label>
            <Input type="text" name="nombre" placeholder="Nombre del ambiente" className="rounded-full" required />
            <Label htmlFor="">Capacidad</Label>
            <Input type="number" name="capacidad" placeholder="Capacidad" className="rounded-full" />
            <Label htmlFor="">Centro de formación</Label>
            <Input type="text" name="centroFormacion" placeholder="Centro de formación" className="rounded-full" />

            <Button className="rounded-full w-full">Guardar</Button>
        </form>
    )
}
