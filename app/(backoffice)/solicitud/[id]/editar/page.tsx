import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditarSolicitud({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar solicitud</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">VITALPLATES</h1>
                <h5 className="text-2xl">NIT - 100.3040</h5>
            </div>
            <div className="mt-10  bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Fecha de solicitud</Label>
                        <DatePicker />
                        <Label htmlFor="">Origen de solicitud</Label>
                        <Input type="text" placeholder="Origen de la solicitud" className="rounded-full" />
                        <Label htmlFor=""> Radicado de solicitud</Label>
                        <Input type="text" placeholder="Radicado de la solicitud" className="rounded-full" />
                        <Label htmlFor="">Segmento</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Segmento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Nombre del solicitante</Label>
                        <Input type="text" placeholder="Nombre del solicitante" className="rounded-full" />
                        <Label htmlFor="">Tipo de solicitud</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Tipo de solicitud " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Área de formación</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Área de formación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Programa de formación</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Programa de formación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Cupos solicitados</Label>
                        <Input type="number" placeholder="Cupos" className="rounded-full" />
                        <Label htmlFor="">Estado de solicitud </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="">Motivo de solcitud</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Motivo de solicitud" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Tipo de documento</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Tipo de documento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Número de identificación</Label>
                        <Input type="number" placeholder="Número de identificación" className="rounded-full" />
                        <Label htmlFor="">Celular</Label>
                        <Input type="number" placeholder="Celular" className="rounded-full" />
                        <Label htmlFor="">Correo electrónico</Label>
                        <Input type="email" placeholder="Correo electrónico" className="rounded-full" />
                        <Label htmlFor="">Instructor encargado</Label>
                        <Input type="text" placeholder="Instructor" className="rounded-full" />
                        <Label htmlFor="">Ficha de formación</Label>
                        <Input type="text" placeholder="Ficha de formación" className="rounded-full" />
                        <Label htmlFor="">Ubicación de la formación</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Ubicación" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button className="rounded-full w-full !mt-8">Guardar</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
