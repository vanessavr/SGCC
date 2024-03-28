'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import FormularioCursoComplementario from '../../_form-curso-complementario'
import { CursoComplementario } from '@/types/MyTypes'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function CursoComplementario({ params }: { params: { id: string } }) {
    const { data: cursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/area-formacion/${params.id}/curso-complementario`, fetcher)

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Cursos complementarios</h1>
            </header>
            <div className="flex flex-wrap justify-center">
                {cursosComplementarios?.map((cursoComplementario, index) => (
                    <div key={cursoComplementario.id} className="mt-10 bg-gray-300 py-7 px-8 w-60 rounded-xl flex flex-col items-center justify-center mx-4">
                        <h1 className="text-center text-sm mb-2 font-bold">{cursoComplementario.nombre}</h1>
                        <h2 className="text-center text-sm mb-1 mt-4">SENA Regional Caldas</h2>
                        <p className="text-center text-xs mb-1">Cupos: {cursoComplementario.cuposDisponibles}</p>
                        <Dialog>
                            <DialogTrigger className="rounded-full font-bold py-2 px-4 mt-6 text-white bg-sena-800">Ver / Aplicar</DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-center text-sm text-white">{cursoComplementario.nombre}</DialogTitle>
                                </DialogHeader>
                                <FormularioCursoComplementario cursoComplementario={cursoComplementario} />
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </div>
        </div>
    )
}
