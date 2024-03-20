'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import Link from 'next/link'
import useSWR from 'swr'

interface Empresa {
    id: string
    razonSocial: string
    celular: string
    correoElectronico: string
}

export default function Empresa() {
    const { data: empresas, error } = useSWR<Empresa[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!empresas) return <div>Cargando...</div>
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Empresas</h1>
            </header>

            <div className="my-6">
                <Link href="/empresa/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Celular</TableHead>
                        <TableHead>Correo electrónico</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {empresas.map((empresa, index) => (
                        <TableRow key={empresa.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{empresa.razonSocial}</TableCell>
                            <TableCell>{empresa.celular}</TableCell>
                            <TableCell>{empresa.correoElectronico}</TableCell>
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
