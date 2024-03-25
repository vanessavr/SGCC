'use client'

import useSWR from 'swr'
import FormularioSolicitud from '../../_form'
import { Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export default function EditarSolicitud({ params }: { params: { id: string } }) {
    const { data: solicitud, error } = useSWR<Solicitud>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud/${params.id}`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!solicitud) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar solicitud</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl">
                    <span className="uppercase font-bold">Responsable: {solicitud?.usuario?.nombres}</span>
                </h1>
                <h5 className="text-2xl">Radicado: #{solicitud?.radicadoSolicitud}</h5>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioSolicitud className="flex flex-col space-y-3" data={solicitud} />
                </div>
            </div>
        </div>
    )
}
