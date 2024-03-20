'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import ViewIcon from '../../components/svg/ViewIcon'
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'
import PlusIcon from '../../components/svg/PlusIcon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import useSWR from 'swr'

interface Persona {
    id: string
    nombres: string
    apellidos: string
    celular: string
    correoElectronico: string
}

export default function Persona() {
    const { data: personas, error } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!personas) return <div>Cargando...</div>
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Usuarios - Personas</h1>
            </header>

            <div className="my-6">
                <Link href="/usuario/persona/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
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
                    {personas.map((persona, index) => (
                        <TableRow key={persona.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <Avatar className="size-10 mr-2">
                                        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {persona.nombres + ' ' + persona.apellidos}
                                </div>
                            </TableCell>
                            <TableCell>{persona.celular}</TableCell>
                            <TableCell>{persona.correoElectronico}</TableCell>
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
