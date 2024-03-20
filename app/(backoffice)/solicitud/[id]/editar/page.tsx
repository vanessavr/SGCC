'use client'

import useSWR from 'swr'
import FormularioSolicitud from '../../_form'
import { Solicitud } from '@/types/MyTypes'

export default function EditarSolicitud({ params }: { params: { id: string } }) {
    const { data: solicitud, error } = useSWR<Solicitud>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${params.id}`, fetcher)

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar solicitud</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{solicitud?.usuario.nombres}</h1>
                <h5 className="text-2xl">
                    {solicitud?.usuario.tipoDocumento} - {solicitud?.usuario.numeroIdentificacion}
                </h5>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioSolicitud className="flex flex-col space-y-3" data={solicitud} />
                </div>
            </div>
        </div>
    )
}

const fetcher = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Error al obtener los datos')
    }
    return response.json()
}
