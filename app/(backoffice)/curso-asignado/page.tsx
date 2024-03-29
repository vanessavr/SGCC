'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PlusIcon from '../components/svg/PlusIcon'
import CalendarIcon from '../components/svg/CalendarIcon'
import useSWR, { mutate } from 'swr'
import { CursoComplementario, Persona } from '@/types/MyTypes'
import { useEffect, useState } from 'react'
import { fetcher } from '@/utils/fetcher'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCursosAsignados } from '@/lib/actions'

export default function CursoAsignado() {
    const [instructorId, setInstructorId] = useState<string>()
    const { data: cursosComplementarios, error: errorCursos } = useSWR<CursoComplementario[]>(
        instructorId ? `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${instructorId}/curso-complementario` : null,
        fetcher,
    )
    const { data: instructores, error: errorInstructores } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/rol/${process.env.NEXT_PUBLIC_NESTJS_ROL_INSTRUCTOR_ID}`, fetcher)

    instructores

    // Efecto para actualizar los cursos complementarios cuando cambia el instructor seleccionado
    useEffect(() => {
        // Si no hay instructor seleccionado, no es necesario hacer la solicitud
        if (!instructorId) return

        // Hacemos la solicitud de los cursos complementarios del instructor seleccionado
        const fetchCursos = async () => {
            try {
                const response = await getCursosAsignados(instructorId)

                if (!response.ok) {
                    throw new Error('Error al obtener los cursos complementarios')
                }
                const data = await response.json()
                // Actualizamos los datos de los cursos complementarios
                mutate(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario/${instructorId}/curso-complementario`, data, false)
            } catch (error) {
                console.error('Error al obtener los cursos complementarios:', error)
            }
        }

        fetchCursos()
    }, [instructorId])

    if (errorCursos) return <div>Error al cargar los cursos</div>
    if (errorInstructores) return <div>Error al cargar los instructores</div>
    // if (!cursosComplementarios || !instructores) return <div>Cargando...</div>

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Cursos asignados</h1>
            </header>

            <div className="flex items-center gap-2 my-10">
                <Label htmlFor="" className="block">
                    Seleccione un instructor:
                </Label>
                <Select name="instructorId" onValueChange={(value) => setInstructorId(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Instructor" />
                    </SelectTrigger>
                    <SelectContent>
                        {instructores?.map((instructor, index) => (
                            <SelectItem key={instructor.id} value={instructor.id}>
                                {instructor.nombres}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre del curso</TableHead>
                        <TableHead>Ficha de formación</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Ambiente</TableHead>
                        <TableHead>Horario</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cursosComplementarios?.map((cursoComplementario, index) => (
                        <TableRow key={cursoComplementario.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{cursoComplementario.nombre}</TableCell>
                            <TableCell>{cursoComplementario.fichaFormacion}</TableCell>
                            <TableCell>{cursoComplementario.instructor.nombres + ' ' + cursoComplementario.instructor.apellidos}</TableCell>
                            <TableCell>{cursoComplementario.ambiente.nombre}</TableCell>
                            <TableCell>{cursoComplementario.horarioDescripcion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
