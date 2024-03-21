'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ambiente, CursoComplementario, Departamento, Persona } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { useToast } from '@/components/ui/use-toast'

interface Props {
    className?: string
    data?: CursoComplementario
}

const FormularioCurso = ({ className, data }: Props) => {
    const [formData, setFormData] = useState<Partial<CursoComplementario>>(data || {})
    const { toast } = useToast()
    const [ciudades, setCiudades] = useState<[]>([])

    const { data: instructores } = useSWR<Persona[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/usuario`, fetcher)
    const { data: ambientes } = useSWR<Ambiente[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/ambiente`, fetcher)
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)

    useEffect(() => {
        // Si no hay instructor seleccionado, no es necesario hacer la solicitud
        const departamentoId = formData?.departamento

        if (departamentoId) {
            // Hacemos la solicitud de los cursos complementarios del instructor seleccionado
            const fetchCiudades = async () => {
                const url = `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento/${departamentoId}`
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Error al obtener los cursos complementarios')
                }
                const data = await response.json()

                setCiudades(data.ciudades)
                // Actualizamos los datos de los cursos complementarios
                mutate(url, data, false)
            }

            fetchCiudades()
        }
    }, [formData?.departamento])

    useEffect(() => {
        if (data) {
            const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(formDataWithoutAmbiente)
        }
    }, [data])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario/${data ? data.id : ''}`, {
            method: data ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Mostrar el toast cuando el curso sea exitoso
                    toast({ title: '✔️', description: 'Curso complementario guardado satisfactoriamente' })
                } else {
                    toast({ title: '✖️', description: 'Error al guardar el curso complementario' })
                }
            })
            .catch((error) => {
                console.error('Error al guardar el curso complementario:', error)
                toast({ title: '✖️', description: 'Error al guardar el curso complementario' })
            })
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit} className={`${className}`}>
            <Label htmlFor="">Área de formación</Label>
            <Input
                type="text"
                placeholder="Área de formación"
                name="areaFormacion"
                value={formData?.areaFormacion || ''}
                onChange={(event) => handleChange('areaFormacion', event.target.value)}
                className="rounded-full"
                required
            />

            <Label htmlFor="">Nombre</Label>
            <Input type="text" placeholder="Nombre" name="nombre" value={formData?.nombre || ''} onChange={(event) => handleChange('nombre', event.target.value)} className="rounded-full" required />

            <Label htmlFor="">Ficha de formación</Label>
            <Input
                type="text"
                placeholder="Ficha de formación"
                name="fichaFormacion"
                value={formData?.fichaFormacion || ''}
                onChange={(event) => handleChange('fichaFormacion', event.target.value)}
                className="rounded-full"
            />

            <Label htmlFor="">Centro de formación</Label>
            <Select name="centroFormacion" value={formData?.centroFormacion || ''} onValueChange={(value) => handleChange('centroFormacion', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Centro de formación" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Centro de Procesos Industriales y Construcción</SelectItem>
                    <SelectItem value="2">Centro de Automatización Industrial</SelectItem>
                    <SelectItem value="3">Centro de Comercio y Servicios</SelectItem>
                    <SelectItem value="4">Centro Agropecuario</SelectItem>
                    <SelectItem value="5">Centro para la Formación Cafetera</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Instructor</Label>
            <Select name="instructorId" value={formData?.instructorId || ''} onValueChange={(value) => handleChange('instructorId', value)}>
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

            <Label htmlFor="">Ambiente</Label>
            <Select name="ambienteId" value={formData?.ambienteId || ''} onValueChange={(value) => handleChange('ambienteId', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Ambiente" />
                </SelectTrigger>
                <SelectContent>
                    {ambientes?.map((ambiente, index) => (
                        <SelectItem key={ambiente.id} value={ambiente.id}>
                            {ambiente.nombre}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="">Jornada</Label>
            <Select name="jornada" value={formData?.jornada || ''} onValueChange={(value) => handleChange('jornada', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Jornada" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Mañana</SelectItem>
                    <SelectItem value="2">Tarde</SelectItem>
                    <SelectItem value="3">Noche</SelectItem>
                    <SelectItem value="4">Mixta</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Departamento</Label>
            <Select name="departamento" value={formData?.departamento || ''} onValueChange={(value) => handleChange('departamento', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                    {departamentos?.map((departamento, index) => (
                        <SelectItem key={departamento.id} value={departamento.id.toString()}>
                            {departamento.departamento}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {ciudades?.length > 0 && (
                <>
                    <Label htmlFor="">Ciudad</Label>
                    <Select name="ciudad" value={formData?.ciudad || ''} onValueChange={(value) => handleChange('ciudad', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                            {ciudades?.map((ciudad, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    {ciudad}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            )}

            <Label htmlFor="">Duración</Label>
            <Input type="text" placeholder="Duración" name="duracion" value={formData?.duracion || ''} onChange={(event) => handleChange('duracion', event.target.value)} className="rounded-full" />

            <Label htmlFor="">Fecha inicio</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaInicio" value={formData?.fechaInicio || ''} onChange={(value) => handleChange('fechaInicio', value)} />

            <Label htmlFor="">Fecha fin</Label>
            <DatePicker placeholder="Seleccionar fecha.." name="fechaFin" value={formData?.fechaFin || ''} onChange={(value) => handleChange('fechaFin', value)} />

            <Label htmlFor="">Cupos disponibles</Label>
            <Input
                type="number"
                placeholder="Cupos"
                name="cuposDisponibles"
                value={formData?.cuposDisponibles || ''}
                onChange={(event) => handleChange('cuposDisponibles', event.target.value)}
                className="rounded-full"
            />

            <Button className="rounded-full w-full !mt-8">Guardar</Button>
        </form>
    )
}

export default FormularioCurso
