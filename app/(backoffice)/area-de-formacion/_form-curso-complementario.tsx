import { useRol } from '@/app/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { applySolicitud, applySolicitudEmpresa } from '@/lib/actions'
import type { CursoComplementario, Departamento, Solicitud } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import { handleErrorsToast } from '@/utils/handleErrorsToast'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

interface Props {
    className?: string
    cursoComplementario?: CursoComplementario
}
export default function FormularioCursoComplementario({ cursoComplementario }: Props) {
    const [formData, setFormData] = useState<Partial<Solicitud>>({})
    const { userId, empresaId, rolId } = useRol()
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)
    const { data: ciudadesData } = useSWR(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento/${cursoComplementario?.departamento}`, fetcher)
    const [ciudades, setCiudades] = useState([])

    useEffect(() => {
        if (ciudadesData) {
            setCiudades(ciudadesData['ciudades'])
        }

        setFormData({ usuarioId: userId })
    }, [ciudadesData])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            if (cursoComplementario) {
                let response: any

                if (rolId == empresaId) {
                    response = await applySolicitudEmpresa(cursoComplementario.id, formData)
                } else {
                    response = await applySolicitud(cursoComplementario.id, formData)
                }

                let statusCode = response?.statusCode > 0

                if (response?.statusCode) {
                    handleErrorsToast(response)
                }

                if (!statusCode) {
                    toast({ title: '✔️', description: 'Solicitud guardada satisfactoriamente' })
                }
            }
        } catch (error) {
            console.error('Error al guardar la solicitud:', error)
            toast({ title: '✖️', description: 'Error al guardar la solicitud' })
        }
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <form
            className="p-8 grid grid-cols-2 space-y-4"
            onSubmit={handleSubmit}>
            <Label
                htmlFor=""
                className="font-bold self-center">
                Programa de formación:
            </Label>
            <span className="ml-3 !mt-0">{cursoComplementario?.nombre}</span>

            <Label
                htmlFor=""
                className="font-bold self-center">
                Centro de formación:
            </Label>
            <Select
                name="centroFormacion"
                value={cursoComplementario?.centroFormacion || undefined}
                disabled>
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

            <Label
                htmlFor=""
                className="font-bold self-center">
                Departamento:
            </Label>
            <Select
                name="departamento"
                value={cursoComplementario?.departamento || undefined}
                disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                    {departamentos?.map((departamento, index) => (
                        <SelectItem
                            key={departamento.id}
                            value={departamento.id.toString()}>
                            {departamento.departamento}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {ciudades?.length > 0 && (
                <>
                    <Label
                        htmlFor=""
                        className="font-bold self-center">
                        Ciudad:
                    </Label>
                    <Select
                        name="ciudad"
                        value={cursoComplementario?.ciudad || undefined}
                        disabled>
                        <SelectTrigger>
                            <SelectValue placeholder="Ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                            {ciudades?.map((ciudad, index) => (
                                <SelectItem
                                    key={index}
                                    value={index.toString()}>
                                    {ciudad}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            )}

            <Label
                htmlFor=""
                className="font-bold self-center">
                Duración:
            </Label>
            <span className="ml-3">{cursoComplementario?.duracion} horas</span>

            <Label
                htmlFor=""
                className="font-bold self-center">
                Jornada:
            </Label>
            <Select
                name="jornada"
                value={cursoComplementario?.jornada || undefined}
                disabled>
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

            <Label className="font-bold self-center">Descripción</Label>
            <p className="text-xs">{cursoComplementario?.descripcion}</p>

            <Label
                htmlFor="cuposSolicitados"
                className="font-bold self-center">
                Cupos solicitados: *
            </Label>
            <Input
                id="cuposSolicitados"
                name="cuposSolicitados"
                value={formData?.cuposSolicitados || ''}
                onChange={(event) => handleChange('cuposSolicitados', event.target.value)}
                type="number"
                required
            />

            <Button className="rounded-full w-full !mt-8 col-span-2">Aplicar</Button>
        </form>
    )
}
