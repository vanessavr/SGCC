'use client'

import useSWR, { mutate } from 'swr'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import PlusIcon from '../components/svg/PlusIcon'
import Link from 'next/link'
import { Ambiente } from '@/types/MyTypes'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetcher } from '@/utils/fetcher'
import CheckIcon from '../components/svg/CheckIcon'
import { deleteAmbiente } from '@/lib/actions'
import { toast } from '@/components/ui/use-toast'
import { useRol } from '@/app/context/AppContext'

export default function Ambiente() {
    const { data: ambientes, error } = useSWR<Ambiente[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente`, fetcher)
    const { rolId, adminId, instructorId, empresaId, personaId } = useRol()

    if (error) return <div>Error al cargar los datos</div>
    if (!ambientes) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Ambientes</h1>
            </header>

            {rolId == adminId && (
                <div className="my-6">
                    <Link href="/ambiente/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                        <PlusIcon className="mr-2 inline-block" />
                        Registrar
                    </Link>
                </div>
            )}

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
                            {rolId == adminId && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        {/* <ViewIcon /> */}
                                        <Link href={`/ambiente/${ambiente.id}/editar`}>
                                            <EditIcon />
                                        </Link>
                                        <DeleteButton ambiente={ambiente} />
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

function DeleteButton({ ambiente }: { ambiente: Ambiente }) {
    const handleClick = async () => {
        const res = await deleteAmbiente(ambiente.id)

        if (res.id) {
            toast({ title: '✔️', description: 'Ambiente eliminado satisfactoriamente' })
        }

        mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente`)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>

            <DialogContent>
                <div className="flex flex-col text-center justify-center pt-10">
                    <div>
                        ¿Desea eliminar el ambiente <span className="uppercase font-bold">&nbsp;{ambiente.nombre}</span>?
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
