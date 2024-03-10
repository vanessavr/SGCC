import Formulario from '../../_form'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditarEmpresa({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar empresa</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">VITALPLATES</h1>
                <h5 className="text-2xl">NIT 1.000.323</h5>

                <div>
                    <Button className="rounded-full">Cambiar contraseña</Button>
                </div>
            </div>
            <div className="mt-10 bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Nombre</Label>
                        <Input type="text" placeholder="Nombre" className="rounded-full" />
                        <Label htmlFor="">NIT</Label>
                        <Input type="text" placeholder="NIT" className="rounded-full" />
                        <Label htmlFor="">Representante legal</Label>
                        <Input type="text" placeholder="Representante legal" className="rounded-full" />
                        <Label htmlFor="">Razon Social</Label>
                        <Input type="text" placeholder="Razon social" className="rounded-full" />
                        <Label htmlFor="">Correo electrónico</Label>
                        <Input type="email" placeholder="Correo electrónico" className="rounded-full" />
                        <Label htmlFor="">Celular</Label>
                        <Input type="number" placeholder="Celular" className="rounded-full" />
                        <Label htmlFor="">Dirección</Label>
                        <Input type="text" placeholder="Dirección" className="rounded-full" />
                        <Label htmlFor="">Actividad económica</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Actividad economica" />
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
                        <Label htmlFor="">Ciudad</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Ciudad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Label htmlFor="">Rol</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="rounded-full w-full">Guardar cambios</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
