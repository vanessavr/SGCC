'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CursoComplementario } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import FormularioUsuarioInvitado from './_form'

const Card = ({ title, image, description, duration }: { title: string; image: string; description: string; duration: number }) => {
    return (
        <div className="space-y-6 border-2">
            <h1 className="bg-sena-600 text-white p-3 text-1xl h-22">{title}</h1>
            <div className="p-8">
                <img src={image} alt="" className="w-full h-[200px] object-cover mb-10" />
                <Dialog>
                    <DialogTrigger className="rounded-full py-2 px-4  w-full text-white bg-sena-800 text-1xl">Ver más</DialogTrigger>

                    <DialogContent className="pb-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-sm text-white">{title}</DialogTitle>
                        </DialogHeader>
                        <div className="p-8">
                            <p className="my-4">{description}</p>
                            <p>
                                <span className="font-semibold">Duración:</span> {duration} horas.
                            </p>
                        </div>
                        <DialogFooter className="flex items-center justify-center mt-4">
                            <DialogClose asChild>
                                <Button className="rounded-full text-center w-80">Cerrar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default function UsuarioInvitado() {
    const { data: cursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)

    return (
        <>
            <div className="h-[70vh] overflow-hidden">
                <img src="/cursos.webp" className="relative -top-20" alt="" />
            </div>
            <h1 className="text-center text-6xl text-sena-600 my-6 mb-20 font-semibold ">Cursos disponibles</h1>
            <div className="grid grid-cols-3 gap-6">
                {cursosComplementarios?.map((cursoComplementario, index) => (
                    <Card
                        key={cursoComplementario.id}
                        title={cursoComplementario.nombre}
                        image={cursoComplementario.imagen}
                        description={cursoComplementario.descripcion}
                        duration={cursoComplementario.duracion}
                    />
                ))}
            </div>
            <Dialog>
                <DialogTrigger className="flex text-center justify-center h px-6 py-2 text-white bg-sena-800 w-full text-4xl my-6">¡Inscríbete ahora con nosotros dando clic aquí!</DialogTrigger>

                <DialogContent className="pb-6">
                    <DialogHeader>
                        <DialogTitle className="text-center text-sm text-white">Inscríbete</DialogTitle>
                    </DialogHeader>
                    <FormularioUsuarioInvitado className="p-8 grid grid-cols-2 space-y-4" />
                </DialogContent>
            </Dialog>
        </>
    )
}
