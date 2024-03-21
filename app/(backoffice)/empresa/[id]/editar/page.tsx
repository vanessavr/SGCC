'use client'

import { Button } from '@/components/ui/button'
import FormularioPerfilEmpresa from '../../_form'
import { Empresa } from '@/types/MyTypes'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function EditarEmpresa({ params }: { params: { id: string } }) {
    const { data: empresa, error } = useSWR<Empresa>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${params.id}`, fetcher)

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar empresa</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{empresa?.razonSocial}</h1>
                <h5 className="text-2xl">NIT {empresa?.nit}</h5>

                <div>
                    <Button className="rounded-full">Cambiar contraseña</Button>
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
