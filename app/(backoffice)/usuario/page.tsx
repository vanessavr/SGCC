'use client'

import { Table, TableBody, TableHeader, TableHead, TableCell, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Persona } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'
import { deletePersona } from '@/lib/actions'
import { toast } from '@/components/ui/use-toast'
import EditIcon from '../components/svg/EditIcon'
import DeleteIcon from '../components/svg/DeleteIcon'
import PlusIcon from '../components/svg/PlusIcon'

export default function Persona() {
    // Estado para almacenar el parámetro de URL actual
    const [rolId, setRolId] = useState(process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID)

    // Función para cambiar entre los valores de los parámetros de URL
    const toggleRolId = () => {
        setRolId(rolId === process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID ? process.env.NEXT_PUBLIC_NESTJS_ROL_PERSONA_ID : process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID)
    }

    // SWR hook para hacer la solicitud con el parámetro de URL actual
    const { data: usuarios, error } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/rol/${rolId}`, fetcher)

    // Manejar errores si es necesario
    if (error) {
        console.error('Error al obtener los datos:', error)
    }

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Usuarios</h1>
            </header>

            <div className="my-6">
                <Link href="/usuario/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>

                <Button onClick={toggleRolId} className="rounded-full ml-4 bg-gray-900">
                    {rolId === process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID ? 'Visualizar Personas' : 'Visualizar instructores'}
                </Button>
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
                    {usuarios && (
                        <>
                            {usuarios.map((usuario, index) => (
                                <TableRow key={usuario.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar className="size-10 mr-2">
                                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            {usuario.nombres + ' ' + usuario.apellidos}
                                        </div>
                                    </TableCell>
                                    <TableCell>{usuario.celular}</TableCell>
                                    <TableCell>{usuario.correoElectronico}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {/* <ViewIcon /> */}
                                            <Link href={`/usuario/${usuario.id}/editar`}>
                                                <EditIcon />
                                            </Link>
                                            <DeleteButton usuario={usuario} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

function DeleteButton({ usuario }: { usuario: Persona }) {
    const [confirmarEliminacion, setConfirmarEliminacion] = useState(true)

    const handleClick = async () => {
        const res = await deletePersona(usuario.id)

        if (res) {
            toast({ title: '✔️', description: 'Usuario eliminado satisfactoriamente' })
        }

        mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario`)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>

            <DialogContent>
                <div className="flex flex-col text-center justify-center pt-10">
                    <div>
                        ¿Desea eliminar el usuario <span className="uppercase font-bold">&nbsp;{usuario.nombres + ' ' + usuario.apellidos}</span>?
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
