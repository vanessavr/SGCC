'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import CalendarIcon from '../components/svg/CalendarIcon'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { CursoComplementario } from '@/types/MyTypes'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetcher } from '@/utils/fetcher'
import CheckIcon from '../components/svg/CheckIcon'
import { toast } from '@/components/ui/use-toast'
import { deleteCursoComplementario } from '@/lib/actions'
import { useRol } from '@/app/context/AppContext'

export default function CursoComplementario() {
    const { data: cursosComplementarios, error } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)
    const { rolId, adminId, instructorId, empresaId, personaId } = useRol()

    if (error) return <div>Error al cargar los datos</div>
    if (!cursosComplementarios) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Cursos complementarios</h1>
            </header>

            {rolId == adminId && (
                <div className="my-6">
                    <Link href="/curso-complementario/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                        <PlusIcon className="mr-2 inline-block" />
                        Registrar
                    </Link>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre del curso</TableHead>
                        <TableHead>Ficha de formación</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Ambiente</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cursosComplementarios.map((cursoComplementario, index) => (
                        <TableRow key={cursoComplementario.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{cursoComplementario.nombre}</TableCell>
                            <TableCell>{cursoComplementario.fichaFormacion}</TableCell>
                            <TableCell>{cursoComplementario.instructor.nombres}</TableCell>
                            <TableCell>{cursoComplementario.ambiente.nombre}</TableCell>
                            {rolId == adminId && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        {/* <ViewIcon /> */}
                                        <Link href={`/curso-complementario/${cursoComplementario.id}/editar`}>
                                            <EditIcon />
                                        </Link>
                                        <DeleteButton cursoComplementario={cursoComplementario} />
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function DeleteButton({ cursoComplementario }: { cursoComplementario: CursoComplementario }) {
    const handleClick = async () => {
        const res = await deleteCursoComplementario(cursoComplementario.id)

        if (res.id) {
            toast({ title: '✔️', description: 'Curso complementario eliminado satisfactoriamente' })
        }

        mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>

            <DialogContent>
                <div className="flex flex-col text-center justify-center pt-10">
                    <div>
                        ¿Desea eliminar el curso complementario <span className="uppercase font-bold">&nbsp;{cursoComplementario.nombre}</span>?
                    </div>
                </div>
                <DialogFooter className="flex items-center justify-center gap-4 mb-10">
                    <DialogClose asChild>
                        <Button className="rounded-full text-center bg-gray-200 text-black border-">Cancelar</Button>
                    </DialogClose>
                    <Button className="rounded-full items-center text-center bg-red-500" onClick={handleClick}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
