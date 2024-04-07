'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import { Button } from '@/components/ui/button'
import PlusIcon from '../components/svg/PlusIcon'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import EditEstadoIcon from '../components/svg/EditEstadoIcon'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import type { Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { toast } from '@/components/ui/use-toast'
import { deleteSolicitud, updateEstadoSolicitud, uploadArchivo } from '@/lib/actions'
import { useRol } from '@/app/context/AppContext'
import { useState } from 'react'
import UploadIcon from '../components/svg/UploadIcon'
import FormularioVerSolicitud from './_form-ver-solicitud'
import LoadIcon from '../components/svg/LoadIcon'

export default function Solicitud() {
    const { data: solicitudes, error } = useSWR<Solicitud[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud`, fetcher)
    const { rolId, adminId, instructorId, empresaId, personaId } = useRol()
    const [solicitudId, setSolicitudId] = useState<string>('')

    const [motivoSolicitud, setMotivoSolicitud] = useState<string>('')
    const [estadoSolicitud, setEstadoSolicitud] = useState<string>('')

    if (error) return <div>Error al cargar los datos</div>
    if (!solicitudes) return <div>Cargando...</div>
    const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Asegúrate de que el evento proviene de un formulario.
        if (!(event.target instanceof HTMLFormElement)) return

        try {
            const formFileData = new FormData()
            const fileInput = event.target.elements.namedItem('file') as HTMLInputElement

            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                console.error('No file selected')
                return
            }

            const file = fileInput.files[0]
            formFileData.append('file', file)

            await uploadArchivo(solicitudId, formFileData)

            toast({ title: '✔️', description: 'Archivo cargado satisfactoriamente' })
        } catch (error) {
            console.error('Error al cargar el archivo:', error)
            toast({ title: '✖️', description: 'Error al cargar el archivo' })
        }
    }

    const handleEstadoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const data = {
                estadoSolicitud: estadoSolicitud,
                motivoSolicitud: motivoSolicitud,
            }
            await updateEstadoSolicitud(solicitudId, data)
            toast({ title: '✔️', description: 'Estado guardado satisfactoriamente' })
        } catch (error) {
            console.error('Error al guardar el estado:', error)
            toast({ title: '✖️', description: 'Error al guardar el estado' })
        }
    }

    const setSolicitudData = async (solicitud: Solicitud) => {
        setSolicitudId(solicitud.id)
        setEstadoSolicitud(solicitud.estadoSolicitud)
        setMotivoSolicitud(solicitud.motivoSolicitud)
    }

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Solicitudes</h1>
            </header>

            {rolId == adminId && (
                <div className="my-6">
                    <Link
                        href="/solicitud/crear"
                        className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                        <PlusIcon className="mr-2 inline-block" />
                        Registrar
                    </Link>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Radicado</TableHead>
                        <TableHead>Fecha de la solicitud</TableHead>
                        <TableHead>Estado de solicitud</TableHead>
                        {rolId !== instructorId && <TableHead>Cargar archivo</TableHead>}
                        {rolId == instructorId && <TableHead>Descarga de archivo</TableHead>}
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {solicitudes.map((solicitud, index) => (
                        <TableRow key={solicitud.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{solicitud.radicadoSolicitud ?? '⚠️ Sin radicar'}</TableCell>
                            <TableCell>{solicitud.fechaSolicitud}</TableCell>

                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {solicitud.estadoSolicitud == '0' ? 'CERRADA' : 'ABIERTA'}
                                    {rolId == adminId || rolId == instructorId ? (
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button
                                                    onClick={() => setSolicitudData(solicitud)}
                                                    className="ml-6">
                                                    <EditEstadoIcon />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent className="pb-4">
                                                <DialogHeader>
                                                    <DialogTitle className="text-center text-md text-white">Estado de solicitud</DialogTitle>
                                                </DialogHeader>

                                                <form
                                                    onSubmit={handleEstadoSubmit}
                                                    className="px-8 grid grid-cols-2 space-y-6 pb-8">
                                                    <Label
                                                        htmlFor=""
                                                        className="font-bold self-center">
                                                        Estado de solicitud:
                                                    </Label>
                                                    <Select
                                                        name="estadoSolicitud"
                                                        value={estadoSolicitud || undefined}
                                                        onValueChange={(value) => setEstadoSolicitud(value)}
                                                        required>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccione el estado" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Abierta</SelectItem>
                                                            <SelectItem value="0">Cerrada</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <Label
                                                        htmlFor=""
                                                        className="font-bold self-center">
                                                        Motivo de estado:
                                                    </Label>
                                                    <Select
                                                        name="motivoSolicitud"
                                                        value={motivoSolicitud || undefined}
                                                        onValueChange={(value) => setMotivoSolicitud(value)}
                                                        required>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccione un motivo" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">En cola</SelectItem>
                                                            <SelectItem value="2">En cola - Faltan datos</SelectItem>
                                                            <SelectItem value="3">Sin respuesta</SelectItem>
                                                            <SelectItem value="4">No interesado</SelectItem>
                                                            <SelectItem value="5">Cancelada</SelectItem>
                                                            <SelectItem value="6">Por convocar</SelectItem>
                                                            <SelectItem value="7">Programada</SelectItem>
                                                            <SelectItem value="8">Sin oferta disponible</SelectItem>
                                                            <SelectItem value="9">Sin instructor disponible</SelectItem>
                                                            <SelectItem value="10">Instructor asignado</SelectItem>
                                                            <SelectItem value="11">Satisfecha</SelectItem>
                                                            <SelectItem value="12">Trasladada</SelectItem>
                                                            <SelectItem value="13">Pendiente</SelectItem>
                                                            <SelectItem value="14">Duplicada</SelectItem>
                                                            <SelectItem value="15">En cola - Aplazada</SelectItem>
                                                            <SelectItem value="16">Por completar cupo mínimo</SelectItem>
                                                            <SelectItem value="17">Propuesta de oferta enviada</SelectItem>
                                                            <SelectItem value="18">Cerrada</SelectItem>
                                                            <SelectItem value="19">Por enviar listad de interesados</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="col-span-2 ">
                                                        <Button className="rounded-full font-bold py-2 px-4 w-full mt-4">Guardar cambios</Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    ) : null}
                                </div>
                            </TableCell>
                            {rolId !== instructorId && (
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                onClick={() => setSolicitudId(solicitud.id)}
                                                className="ml-6">
                                                <UploadIcon />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="pb-10">
                                            <DialogHeader>
                                                <DialogTitle className="text-center text-md text-white">Cargar archivo</DialogTitle>
                                            </DialogHeader>

                                            <form
                                                onSubmit={handleFileSubmit}
                                                className="flex flex-col mt-4 gap-6 items-center justify-center">
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    placeholder="Cargar desde el computador"
                                                    accept=".zip,.pdf"
                                                    name="file"
                                                />
                                                <Button className="rounded-full font-bold py-2 px-4 w-40">Subir</Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            )}

                            {rolId == adminId || rolId == instructorId ? (
                                <TableCell>
                                    {solicitud.archivo ? (
                                        <a
                                            className="ml-16"
                                            href={`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/uploads/${solicitud.archivo}`}
                                            target="_blank"
                                            download>
                                            <LoadIcon className="size-6" />
                                        </a>
                                    ) : (
                                        <small>No se ha cargado un archivo aún</small>
                                    )}
                                </TableCell>
                            ) : null}

                            <TableCell>
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger>
                                            <ViewIcon />
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center text-sm text-white">{solicitud?.radicadoSolicitud ?? '⚠️ Sin radicado aún'}</DialogTitle>
                                            </DialogHeader>
                                            <FormularioVerSolicitud solicitud={solicitud} />
                                        </DialogContent>
                                    </Dialog>

                                    {rolId == adminId && (
                                        <>
                                            <Link href={`/solicitud/${solicitud.id}/editar`}>
                                                <EditIcon />
                                            </Link>
                                            <DeleteButton solicitud={solicitud} />
                                        </>
                                    )}
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

        if (res[1]) {
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
                    <Button
                        className="rounded-full items-center text-center bg-red-500"
                        onClick={handleClick}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
