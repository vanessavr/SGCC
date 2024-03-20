'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import CalendarIcon from '../components/svg/CalendarIcon'
import Link from 'next/link'
import useSWR from 'swr'

interface CursoComplementario {
    id: string
    nombre: string
    fichaFormacion: string
    instructorId: string
    ambienteId: string
}

export default function CursoComplementario() {
    const { data: cursosComplementarios, error } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!cursosComplementarios) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Cursos complementarios</h1>
            </header>

            <div className="my-6">
                <Link href="/curso-complementario/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>
            </div>

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
                            <TableCell>{cursoComplementario.instructorId}</TableCell>
                            <TableCell>{cursoComplementario.ambienteId}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <ViewIcon />
                                    <EditIcon />
                                    <DeleteIcon />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
