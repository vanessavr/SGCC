'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import FormularioPersona from '../../_form'
import type { Persona } from '@/types/MyTypes'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cambiarPassword, updateFotoPerfil, updateFotoUser } from '@/lib/actions'
import { toast } from '@/components/ui/use-toast'

export default function EditarPersona({ params }: { params: { id: string } }) {
    const { data: persona, error } = useSWR<Persona>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${params.id}`, fetcher)
    const [newPassword, setNewPassword] = useState<any>()
    const [oldPassword, setOldPassword] = useState<any>()

    const fechaNacimiento = persona?.fechaNacimiento?.toString().split('T')[0]
    const personaTransformed = { ...persona, fechaNacimiento: fechaNacimiento } as Persona

    const tipoDocumento = persona?.tipoDocumento == '1' ? 'CC' : persona?.tipoDocumento == '2' ? 'CE' : 'TI'

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await cambiarPassword(oldPassword, newPassword, params.id)

            if (res.id) {
                toast({ title: '✔️', description: 'Contraseña actualizada satisfactoriamente' })
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
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

            await updateFotoUser(params.id, formFileData)

            toast({ title: '✔️', description: 'Foto de perfil actualizada satisfactoriamente' })
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
    }
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar usuario</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{persona?.nombres}</h1>
                <h5 className="text-2xl">
                    {tipoDocumento} - {persona?.numeroIdentificacion}
                </h5>

                <div>
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
            </div>
            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                {persona && (
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <Avatar className="size-60 mb-5">
                                <AvatarImage src={`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/uploads/${persona?.foto}`} className="object-contain" />
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
                )}

                <div>
                    <FormularioPersona data={personaTransformed} className="space-y-4" />
                </div>
            </div>
        </div>
    )
}
