import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CrearAmbiente() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm" >
                <h1 className="text-center text-4xl text-white">Registrar ambiente</h1>
            </header>
            <div className="mt-10  bg-gray-300 p-4 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Nombre</Label>
                        <Input type="text" placeholder="Nombre del ambiente" className="rounded-full" />
                        <Label htmlFor="">Capacidad</Label>
                        <Input type="number" placeholder="Capacidad" className="rounded-full" />
                        <Label htmlFor="">Centro de formación</Label>
                        <Input type="text" placeholder="Centro de formación" className="rounded-full" />

                        <Button className="rounded-full w-full">Guardar</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
