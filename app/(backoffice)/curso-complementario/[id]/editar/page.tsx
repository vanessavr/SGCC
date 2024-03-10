import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditarCursoComplementario({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar curso complementario</h1>
            </header>

            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">TRABAJO EN ALTURAS</h1>
                <h5 className="text-2xl">ID - 277323</h5>
            </div>
            <div className="mt-10  bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Área de formación</Label>
                        <Input type="text" placeholder="Área de formación" className="rounded-full" />
                        <Label htmlFor="">Nombre</Label>
                        <Input type="text" placeholder="Nombre" className="rounded-full" />
                        <Label htmlFor=""> Ficha de formación</Label>
                        <Input type="text" placeholder="Ficha de formación" className="rounded-full" />
                        <Label htmlFor="">Centro de formación</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Centro de formación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Instructor</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Instructor " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Ambiente</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Ambiente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Departamento</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Departamento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Duración</Label>
                        <Input type="text" placeholder="Duración" className="rounded-full" />
                        <Label htmlFor="">Actividad económica</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Actividad econímica" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="">Fecha inicio</Label>
                        <DatePicker />
                        <Label htmlFor="">Fecha fin</Label>
                        <DatePicker />
                        <Label htmlFor="">Fecha de cierre de inscripción</Label>
                        <DatePicker />
                        <Label htmlFor="">Cupos disponibles</Label>
                        <Input type="text" placeholder="Cupos" className="rounded-full" />

                        <Button className="rounded-full w-full !mt-8">Guardar</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
