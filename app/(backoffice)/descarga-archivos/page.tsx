'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import useSWR from 'swr'
import type { Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import LoadIcon from '../components/svg/LoadIcon'

export default function Solicitud() {
    const { data: solicitudes, error } = useSWR<Solicitud[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/solicitud`, fetcher)

    if (error) return <div>Error al cargar los datos</div>
    if (!solicitudes) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Solicitudes</h1>
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Radicado</TableHead>
                        <TableHead>Fecha de la solicitud</TableHead>
                        <TableHead>Estado de solicitud</TableHead>
                        <TableHead>Descarga archivos</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {solicitudes.map((solicitud, index) => (
                        <TableRow key={solicitud.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{solicitud.radicadoSolicitud ?? 'Sin radicar'}</TableCell>
                            <TableCell>{solicitud.fechaSolicitud}</TableCell>

                            <TableCell>
                                <div className="flex items-center gap-2">{solicitud.estadoSolicitud == '0' ? 'CERRADA' : 'ABIERTA'}</div>
                            </TableCell>
                            <TableCell>
                                {solicitud.archivo ? (
                                    <a className="ml-16" href={`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/uploads/${solicitud.archivo}`} target="_blank" download>
                                        <LoadIcon className="size-6" />
                                    </a>
                                ) : (
                                    <small>No se ha cargado un archivo aún</small>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
