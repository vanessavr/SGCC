'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { Empresa } from '@/types/MyTypes'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetcher } from '@/utils/fetcher'
import { useState } from 'react'
import CheckIcon from '../components/svg/CheckIcon'

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
                        <TableHead>Razón social</TableHead>
                        <TableHead>Número de celular</TableHead>
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
                            <TableCell>
                                <div className="flex gap-2">
                                    {/* <ViewIcon /> */}
                                    <Link href={`/empresa/${empresa.id}/editar`}>
                                        <EditIcon />
                                    </Link>
                                    <DeleteButton empresa={empresa} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function DeleteButton({ empresa }: { empresa: Empresa }) {
    const [confirmarEliminacion, setConfirmarEliminacion] = useState(true)

    const handleClick = () => {
        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${empresa.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    setConfirmarEliminacion(false)
                    setTimeout(() => {
                        mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa`)
                    }, 2000)
                }
            })
            .catch((error) => {
                console.error('Error al eliminar la solicitud:', error)
            })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>
            <DialogContent>
                <p className="flex flex-col text-center justify-center pt-10">
                    {confirmarEliminacion ? (
                        <div>
                            ¿Desea eliminar la empresa <span className="uppercase font-bold">&nbsp;{empresa.razonSocial}</span>?
                        </div>
                    ) : (
                        <>
                            <CheckIcon className="w-20 mx-auto text-sena-500" />
                            <span className="text-2xl px-6">¡Se ha eliminado correctamente la empresa!</span>
                        </>
                    )}
                </p>
                <DialogFooter className="flex items-center justify-center gap-4 mb-10">
                    {confirmarEliminacion && (
                        <>
                            <DialogClose asChild>
                                <Button className="rounded-full text-center bg-gray-200 text-black border-">Cancelar</Button>
                            </DialogClose>
                            <Button className="rounded-full items-center text-center bg-red-500" onClick={handleClick}>
                                Confirmar
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
