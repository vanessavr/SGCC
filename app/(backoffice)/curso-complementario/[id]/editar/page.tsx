'use client'

import useSWR from 'swr'
import FormularioCurso from '../../_form'
import { CursoComplementario } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'

export default function EditarCursoComplementario({ params }: { params: { id: string } }) {
    const { data: cursoComplementario, error } = useSWR<CursoComplementario>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${params.id}`, fetcher)

    const fechaInicio = cursoComplementario?.fechaInicio.toString().split('T')[0]
    const fechaFin = cursoComplementario?.fechaFin.toString().split('T')[0]

    const cursoComplementarioTransformed = { ...cursoComplementario, fechaInicio: fechaInicio, fechaFin: fechaFin } as CursoComplementario

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Editar curso complementario</h1>
            </header>

            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">{cursoComplementario?.nombre}</h1>
                <h5 className="text-2xl">ID - {cursoComplementario?.fichaFormacion}</h5>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioCurso className="flex flex-col space-y-3" data={cursoComplementarioTransformed} />
                </div>
            </div>
        </div>
    )
}
