'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import FormularioPersona from '../../_form'
import { Persona } from '@/types/MyTypes'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function EditarPersona({ params }: { params: { id: string } }) {
    const { data: persona, error } = useSWR<Persona>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${params.id}`, fetcher)

    const tipoDocumentoNumber = parseInt(persona?.tipoDocumento, 10)
    const tipoDocumentoString = tipoDocumentoNumber === 1 ? 'C.C' : tipoDocumentoNumber === 2 ? 'C.E' : 'T.I'
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar usuario</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{persona?.nombres}</h1>
                <h5 className="text-2xl">
                    {tipoDocumentoString} - {persona?.numeroIdentificacion}
                </h5>

                <div>
                    <Button className="rounded-full">Cambiar contraseña</Button>
                </div>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
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
                    <FormularioPersona data={persona} className="space-y-4" />
                </div>
            </div>
        </div>
    )
}
