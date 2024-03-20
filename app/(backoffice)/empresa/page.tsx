'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import Link from 'next/link'
import useSWR from 'swr'
import { Empresa } from '@/types/MyTypes'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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
    const handleClick = () => {
        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${empresa.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>
            <DialogContent>
                <p className="flex text-center justify-center pt-10">
                    ¿Desea eliminar la empresa <span className="uppercase font-bold">&nbsp;{empresa.razonSocial}</span>?
                </p>
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

const fetcher = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Error al obtener los datos')
    }
    return response.json()
}
