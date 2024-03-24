'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ClickIcon from '../components/svg/ClipIcon'
import ClipIcon from '../components/svg/ClipIcon'
import { useEffect, useState } from 'react'
import { Departamento, Persona } from '@/types/MyTypes'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function Perfil() {
    const [formData, setFormData] = useState<Partial<Persona>>()

    const [ciudades, setCiudades] = useState<[]>([])
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)

    useEffect(() => {
        // Si no hay instructor seleccionado, no es necesario hacer la solicitud
        const departamentoId = formData?.departamento

        if (departamentoId) {
            // Hacemos la solicitud de los cursos complementarios del instructor seleccionado
            const fetchCiudades = async () => {
                const url = `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento/${departamentoId}`
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Error al obtener los cursos complementarios')
                }
                const data = await response.json()

                setCiudades(data.ciudades)
                // Actualizamos los datos de los cursos complementarios
                mutate(url, data, false)
            }

            fetchCiudades()
        }
    }, [formData?.departamento])

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Perfil</h1>
            </header>
            <div className="space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">Jorge Arias Osorio</h1>
                <h5 className="text-2xl">CC - 1.000.323</h5>

                <Dialog>
                    <DialogTrigger className="rounded-full py-2 px-4 mt-6 text-white bg-sena-800">Cambiar contraseña</DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center text-sm text-white">Cambiar contraseña</DialogTitle>
                        </DialogHeader>
                        <form className="px-8 grid grid-cols-2 space-y-6 pb-8">
                            <Label htmlFor="contasenaAnterior" className="font-bold self-center">
                                Contraseña anterior:
                            </Label>
                            <Input id="contrasenaAnterior" name="contrasenaAnterior" type="password" />
                            <Label htmlFor="contraseñaNueva" className="font-bold self-center">
                                Contraseña nueva:
                            </Label>
                            <Input id="contraseñaNueva" name="contraseñaNueva" type="password" />
                            <div className="col-span-2 ">
                                <Button className="rounded-full font-bold py-2 px-4 w-full">Guardar</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="size-60 mb-5">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <Dialog>
                            <DialogTrigger className="rounded-full py-2 px-4 mt-6 text-white bg-sena-800">Cargar foto</DialogTrigger>

                            <DialogContent className="pb-10">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-md text-white">Cargar foto</DialogTitle>
                                </DialogHeader>

                                <div className="flex flex-col mt-4 gap-6 items-center justify-center">
                                    <Button className="rounded-full font-bold py-2 px-4">
                                        <ClipIcon className="mr-2" />
                                        Cargar desde el computador
                                    </Button>
                                    <Button className="rounded-full font-bold py-2 px-4 w-40">Guardar</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div>
                    <form action="" className="flex flex-col space-y-3">
                        <Label htmlFor="">Fecha de nacimiento</Label>
                        <input type="date" name="fechaNacimiento" value="1989-04-04" placeholder="Seleccione una fecha" />

                        <Label htmlFor="">Correo electrónico</Label>
                        <Input type="email" value="jorgearias@gmail.com" placeholder="Correo electrónico" className="rounded-full" />

                        <Label htmlFor="">Celular</Label>
                        <Input type="number" value="3206985743" placeholder="Celular" className="rounded-full" />

                        <Label htmlFor="">Departamento</Label>
                        <Select name="departamento" value={formData?.departamento || '6'} onValueChange={(value) => handleChange('departamento', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Departamento" />
                            </SelectTrigger>
                            <SelectContent>
                                {departamentos?.map((departamento, index) => (
                                    <SelectItem key={departamento.id} value={departamento.id.toString()}>
                                        {departamento.departamento}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {ciudades?.length > 0 && (
                            <>
                                <Label htmlFor="">Ciudad</Label>
                                <Select name="ciudad" value={formData?.ciudad || ''} onValueChange={(value) => handleChange('ciudad', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ciudad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ciudades?.map((ciudad, index) => (
                                            <SelectItem key={index} value={index.toString()}>
                                                {ciudad}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        )}

                        <Button className="rounded-full w-full">Guardar cambios</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
