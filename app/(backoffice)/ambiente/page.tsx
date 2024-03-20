'use client'

import useSWR from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import Link from 'next/link'

interface Ambiente {
    id: string
    nombre: string
    capacidad: number
    centroFormacion: string
}

export default function Ambiente() {
    const { data: ambientes, error } = useSWR<Ambiente[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!ambientes) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Ambientes</h1>
            </header>

            <div className="my-6">
                <Link href="/ambiente/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Capacidad</TableHead>
                        <TableHead>Centro de Formación</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ambientes.map((ambiente, index) => (
                        <TableRow key={ambiente.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{ambiente.nombre}</TableCell>
                            <TableCell>{ambiente.capacidad}</TableCell>
                            <TableCell>{ambiente.centroFormacion}</TableCell>
                            <TableCell className="flex gap-2">
                                <ViewIcon />
                                <EditIcon />
                                <DeleteIcon />
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
