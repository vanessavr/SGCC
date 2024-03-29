'use client'

import { Button } from '@/components/ui/button'
import FormularioPerfilEmpresa from '../../_form'
import { Empresa } from '@/types/MyTypes'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cambiarPasswordEmpresa } from '@/lib/actions'
import { toast } from '@/components/ui/use-toast'

export default function EditarEmpresa({ params }: { params: { id: string } }) {
    const { data: empresa, error } = useSWR<Empresa>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${params.id}`, fetcher)
    const [newPassword, setNewPassword] = useState<any>()
    const [oldPassword, setOldPassword] = useState<any>()

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const res = await cambiarPasswordEmpresa(oldPassword, newPassword, params.id)

            if (res.id) {
                toast({ title: '✔️', description: 'Contraseña actualizada satisfactoriamente' })
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            toast({ title: '✖️', description: 'Error al actualizar el perfil' })
        }
    }

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar empresa</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{empresa?.razonSocial}</h1>
                <h5 className="text-2xl">NIT {empresa?.nit}</h5>

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
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioPerfilEmpresa className="flex flex-col space-y-3" data={empresa} />
                </div>
            </div>
        </div>
    )
}
