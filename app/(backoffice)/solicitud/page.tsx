'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import { Button } from '@/components/ui/button'
import PlusIcon from '../components/svg/PlusIcon'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CheckIcon from '../components/svg/CheckIcon'
import EditEstadoIcon from '../components/svg/EditEstadoIcon'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { toast } from '@/components/ui/use-toast'
import { deleteSolicitud } from '@/lib/actions'

export default function Solicitud() {
    const { data: solicitudes, error } = useSWR<Solicitud[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!solicitudes) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Solicitudes</h1>
            </header>

            <div className="my-6">
                <Link href="/solicitud/crear" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Radicado</TableHead>
                        <TableHead>Usuario / Empresa</TableHead>
                        <TableHead>Estado de solicitud</TableHead>
                        <TableHead>Fecha de la solicitud</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {solicitudes.map((solicitud, index) => (
                        <TableRow key={solicitud.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{solicitud.radicadoSolicitud}</TableCell>
                            <TableCell>{solicitud.usuario.nombres}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger className="flex mt-4 gap-4">
                                        {solicitud.estadoSolicitud}
                                        <EditEstadoIcon />
                                    </DialogTrigger>

                                    <DialogContent className="pb-4">
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-md text-white">Estado de solicitud</DialogTitle>
                                        </DialogHeader>

                                        <form className="px-8 grid grid-cols-2 space-y-6 pb-8">
                                            <Label htmlFor="" className="font-bold self-center">
                                                Estado de solicitud:
                                            </Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el estado" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="abierto">Abierto</SelectItem>
                                                    <SelectItem value="cerrado">Cerrado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Label htmlFor="" className="font-bold self-center">
                                                Motivo de estado:
                                            </Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="light">Light</SelectItem>
                                                    <SelectItem value="dark">Dark</SelectItem>
                                                    <SelectItem value="system">System</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="col-span-2 ">
                                                <Button className="rounded-full font-bold py-2 px-4 w-full mt-4">Guardar cambios</Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell>{solicitud.fechaSolicitud}</TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                    {/* <ViewIcon /> */}
                                    <Link href={`/solicitud/${solicitud.id}/editar`}>
                                        <EditIcon />
                                    </Link>
                                    <DeleteButton solicitud={solicitud} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function DeleteButton({ solicitud }: { solicitud: Solicitud }) {
    const handleClick = async () => {
        const res = await deleteSolicitud(solicitud.id)

        if (res) {
            toast({ title: '✔️', description: 'Solicitud eliminada satisfactoriamente' })
        }

        mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud`)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <DeleteIcon />
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col text-center justify-center pt-10">
                    <div>
                        ¿Desea eliminar la solicitud con radicado <span className="uppercase font-bold">&nbsp;{solicitud.radicadoSolicitud}</span>?
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
