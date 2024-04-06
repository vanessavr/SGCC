'use client'

import useSWR from 'swr'
import FormularioAmbiente from '../../_form'
import type { Ambiente } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export default function EditarAmbiente({ params }: { params: { id: string } }) {
    const { data: ambiente, error } = useSWR<Ambiente>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente/${params.id}`, fetcher)

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar ambiente</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{ambiente?.nombre}</h1>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioAmbiente className="flex flex-col space-y-3" data={ambiente} />
                </div>
            </div>
        </div>
    )
}
