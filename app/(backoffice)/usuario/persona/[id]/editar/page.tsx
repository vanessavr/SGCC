import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditarPersona({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Perfil</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">José Aguirre</h1>
                <h5 className="text-2xl">CC - 1.000.323</h5>

                <div>
                    <Button className="rounded-full">Cambiar contraseña</Button>
                </div>
            </div>
            <div className="mt-10  bg-gray-300 p-4 grid grid-cols-2 gap-6 items-center">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="size-60 mb-5">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button className="rounded-full w-60">Cargar foto</Button>
                    </div>
                </div>

                <div>
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Nombres</Label>
                        <Input type="text" placeholder="Nombres" className="rounded-full" />
                        <Label htmlFor="">Apellidos</Label>
                        <Input type="text" placeholder="Apellidos" className="rounded-full" />
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
                        <Label htmlFor="">Fecha de nacimiento</Label>
                        <DatePicker />
                        <Label htmlFor="">Género</Label>
                        <Input type="text" placeholder="Género" className="rounded-full" />
                        <Label htmlFor="">Correo electrónico</Label>
                        <Input type="email" placeholder="Correo electrónico" className="rounded-full" />
                        <Label htmlFor="">Celular</Label>
                        <Input type="number" placeholder="Celular" className="rounded-full" />
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
                        <Label htmlFor="">Población especial</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Población especial" />
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
