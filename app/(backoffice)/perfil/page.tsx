'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { Departamento, Empresa, Persona } from '@/types/MyTypes'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils/fetcher'
import { toast } from '@/components/ui/use-toast'
import { getProfile, updateProfilePersona, updateProfileEmpresa, cambiarPassword, updateFotoPerfil } from '@/lib/actions'
import { useRol } from '@/app/context/AppContext'

export default function Perfil() {
    const { userId } = useRol()

    const [formData, setFormData] = useState<any>()
    const [newPassword, setNewPassword] = useState<any>()
    const [oldPassword, setOldPassword] = useState<any>()
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile()

                if (!data) {
                    throw new Error('Error al obtener el perfil del usuario')
                }

                let dataTransformed = null

                if (data?.fechaNacimiento) {
                    const fechaNacimiento = data?.fechaNacimiento.toString().split('T')[0]
                    dataTransformed = { ...data, fechaNacimiento: fechaNacimiento } as Persona
                }

                setFormData(dataTransformed || data)
            } catch (error: any) {
                console.error('Error al obtener el perfil del usuario:', error.message)
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            if (formData?.fechaNacimiento) {
                await updateProfilePersona(formData as Persona)
            }

            if (formData?.razonSocial) {
                await updateProfileEmpresa(formData as Empresa)
            }
            toast({ title: '✔️', description: 'Perfil actualizado satisfactoriamente' })
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
    }

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await cambiarPassword(oldPassword, newPassword, userId)

            if (res.id) {
                toast({ title: '✔️', description: 'Contraseña actualizada satisfactoriamente' })
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleFotoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Asegúrate de que el evento proviene de un formulario.
        if (!(event.target instanceof HTMLFormElement)) return

        try {
            const formFileData = new FormData()
            const fileInput = event.target.elements.namedItem('file') as HTMLInputElement

            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                console.error('No file selected')
                return
            }

            const file = fileInput.files[0]
            formFileData.append('file', file)

            await updateFotoPerfil(formFileData)

            toast({ title: '✔️', description: 'Foto de perfil actualizada satisfactoriamente' })
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
    }

    const tipoDocumento = formData?.tipoDocumento == '1' ? 'CC' : formData?.tipoDocumento == '2' ? 'CE' : 'TI'

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Perfil</h1>
            </header>
            <div className="space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{formData?.razonSocial || formData?.nombres + ' ' + formData?.apellidos}</h1>
                <h5 className="text-2xl">
                    {formData?.fechaNacimiento ? tipoDocumento + ' - ' : 'NIT - '} {formData?.numeroIdentificacion || formData?.nit}
                </h5>

                <Dialog>
                    <DialogTrigger className="rounded-full py-2 px-4 mt-6 text-white bg-sena-800">Cambiar contraseña</DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center text-sm text-white">Cambiar contraseña</DialogTitle>
                        </DialogHeader>
                        <form className="px-8 grid grid-cols-2 space-y-6 pb-8" onSubmit={handleChangePassword}>
                            <Label htmlFor="oldPassword" className="font-bold self-center">
                                Contraseña anterior *
                            </Label>
                            <Input id="oldPassword" name="oldPassword" type="password" value={oldPassword || ''} onChange={(event) => setOldPassword(event.target.value)} required />

                            <Label htmlFor="newPassword" className="font-bold self-center">
                                Contraseña nueva *
                            </Label>
                            <Input id="newPassword" name="newPassword" type="password" value={newPassword || ''} onChange={(event) => setNewPassword(event.target.value)} required />

                            <div className="col-span-2">
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
                            <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/uploads/${formData?.foto}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <Dialog>
                            <DialogTrigger className="rounded-full py-2 px-4 mt-6 text-white bg-sena-800">Cargar foto</DialogTrigger>

                            <DialogContent className="pb-10">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-md text-white">Cargar foto</DialogTitle>
                                </DialogHeader>

                                <form onSubmit={handleFotoSubmit} className="flex flex-col mt-4 gap-6 items-center justify-center">
                                    <input type="file" id="fileInput" placeholder="Cargar desde el computador" accept="images/*" name="file" />
                                    <Button className="rounded-full font-bold py-2 px-4 w-40">Guardar</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                        {formData?.fechaNacimiento && (
                            <>
                                <Label htmlFor="">Fecha de nacimiento</Label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    placeholder="Seleccione una fecha"
                                    value={formData?.fechaNacimiento || ''}
                                    onChange={(event) => handleChange('fechaNacimiento', event.target.value)}
                                    className="py-1 px-3 rounded-full block w-full text-sm"
                                />
                            </>
                        )}

                        <Label htmlFor="">Correo electrónico</Label>
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData?.correoElectronico || ''}
                            onChange={(event) => handleChange('correoElectronico', event.target.value)}
                            className="rounded-full"
                        />

                        <Label htmlFor="">Celular</Label>
                        <Input type="number" placeholder="Celular" value={formData?.celular || ''} onChange={(event) => handleChange('celular', event.target.value)} className="rounded-full" />

                        <Label htmlFor="">Departamento</Label>
                        <Select name="departamento" value={formData?.departamento || ''} onValueChange={(value) => handleChange('departamento', value)}>
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
