'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CursoComplementario, Departamento } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

const Card = ({ title, image, description, duration }: { title: string; image: string; description: string; duration: number }) => {
    return (
        <div className="space-y-6 border-2">
            <h1 className="bg-sena-600 text-white p-3 text-1xl h-22">{title}</h1>
            <div className="p-8">
                <img src={image} alt="" className="w-full h-[200px] object-cover mb-10" />
                <Dialog>
                    <DialogTrigger className="rounded-full py-2 px-4  w-full text-white bg-sena-800 text-1xl">Ver más</DialogTrigger>

                    <DialogContent className="pb-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-sm text-white">{title}</DialogTitle>
                        </DialogHeader>
                        <div className="p-8">
                            <p className="my-4">{description}</p>
                            <p>
                                <span className="font-semibold">Duración:</span> {duration} horas.
                            </p>
                        </div>
                        <DialogFooter className="flex items-center justify-center mt-4">
                            <DialogClose asChild>
                                <Button className="rounded-full text-center w-80">Cerrar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default function UsuarioInvitado() {
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)
    const { data: cursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)
    const { data: areasFormacion } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/area-formacion`, fetcher)
    const [formData, setFormData] = useState({})
    const [ciudades, setCiudades] = useState<[]>([])

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

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

    return (
        <>
            <div className="h-[70vh] overflow-hidden">
                <img src="/cursos.webp" className="relative -top-20" alt="" />
            </div>
            <h1 className="text-center text-6xl text-sena-600 my-6 mb-20 font-semibold ">Cursos disponibles</h1>
            <div className="grid grid-cols-3 gap-6">
                {cursosComplementarios?.map((cursoComplementario, index) => (
                    <Card
                        key={cursoComplementario.id}
                        title={cursoComplementario.nombre}
                        image={cursoComplementario.imagen}
                        description={cursoComplementario.descripcion}
                        duration={cursoComplementario.duracion}
                    />
                ))}
            </div>
            <Dialog>
                <DialogTrigger className="flex text-center justify-center h px-6 py-2 text-white bg-sena-800 w-full text-4xl my-6">¡Inscríbete ahora con nosotros dando clic aquí!</DialogTrigger>

                <DialogContent className="pb-6">
                    <DialogHeader>
                        <DialogTitle className="text-center text-sm text-white">Inscríbete</DialogTitle>
                    </DialogHeader>
                    <form action="" className="flex flex-col space-y-6 p-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Nombres
                                </Label>
                                <Input type="text" placeholder="" className="rounded-full" />
                            </div>
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Apellidos
                                </Label>
                                <Input type="text" placeholder="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Celular
                                </Label>
                                <Input type="text" placeholder="" className="rounded-full" />
                            </div>
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Correo electrónico
                                </Label>
                                <Input type="text" placeholder="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Departamento
                                </Label>

                                <Select name="departamento" onValueChange={(value) => handleChange('departamento', value)}>
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
                            </div>
                            <div>
                                {ciudades?.length > 0 && (
                                    <>
                                        <Label htmlFor="">Ciudad</Label>
                                        <Select name="ciudad" onValueChange={(value) => handleChange('ciudad', value)}>
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
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Área de formación
                                </Label>
                                <Select name="areaFormacion" onValueChange={(value) => handleChange('areaFormacion', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un área" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areasFormacion?.map((areaFormacion, index) => (
                                            <SelectItem key={index} value={index.toString()}>
                                                {areaFormacion}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="" className="mb-2 ml-2">
                                    Curso complementario
                                </Label>

                                <Select name="cursoComplementario" onValueChange={(value) => handleChange('cursoComplementario', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un curso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cursosComplementarios?.map((cursoComplementario, index) => (
                                            <SelectItem key={cursoComplementario.id} value={cursoComplementario.id}>
                                                {cursoComplementario.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="" className="mb-2 ml-2">
                                Jornada
                            </Label>
                            <Select name="jornada" onValueChange={(value) => handleChange('jornada', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Jornada" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Mañana</SelectItem>
                                    <SelectItem value="2">Tarde</SelectItem>
                                    <SelectItem value="3">Noche</SelectItem>
                                    <SelectItem value="4">Mixta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                    <DialogFooter className="flex items-center justify-center mt-4">
                        <DialogClose asChild>
                            <Button className="rounded-full text-center w-80">Enviar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
