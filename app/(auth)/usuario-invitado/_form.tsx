'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { CursoComplementario, Departamento, UsuarioInvitado } from '@/types/MyTypes'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useToast } from '@/components/ui/use-toast'
import { saveUsuarioInvitado } from '@/lib/actions'
import { handleErrorsToast } from '@/utils/handleErrorsToast'

interface Props {
    className?: string
    data?: UsuarioInvitado
}
export default function FormularioUsuarioInvitado({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<UsuarioInvitado>>(data || {})
    const { toast } = useToast()
    const [ciudades, setCiudades] = useState<[]>([])
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)
    const { data: cursosComplementarios } = useSWR<CursoComplementario[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/curso-complementario`, fetcher)

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
            setFormData(data)
        }
    }, [data])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            let response: any

            response = await saveUsuarioInvitado(formData as UsuarioInvitado)

            if (response?.statusCode) {
                handleErrorsToast(response)
            } else {
                toast({ title: '✔️', description: 'Solicitud guardada satisfactoriamente' })
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
        <form onSubmit={handleSubmit} className={`${className}`}>
            <Label htmlFor="" className="self-center">
                Nombres *
            </Label>
            <Input
                type="text"
                placeholder="Nombres"
                name="nombres"
                value={formData?.nombres || ''}
                onChange={(event) => handleChange('nombres', event.target.value)}
                className="rounded-full"
                required
            />

            <Label htmlFor="" className="self-center">
                Apellidos *
            </Label>
            <Input
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={formData?.apellidos || ''}
                onChange={(event) => handleChange('apellidos', event.target.value)}
                className="rounded-full"
                required
            />

            <Label htmlFor="" className="self-center">
                Tipo de documento *
            </Label>
            <Select name="tipoDocumento" value={formData?.tipoDocumento || ''} onValueChange={(value) => handleChange('tipoDocumento', value)} required>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="2">Cédula de Extranjería</SelectItem>
                    <SelectItem value="3">Tarjeta de Identidad</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="" className="self-center">
                Número de identificación *
            </Label>
            <Input
                type="number"
                name="numeroIdentificacion"
                value={formData?.numeroIdentificacion || ''}
                onChange={(event) => handleChange('numeroIdentificacion', event.target.value)}
                placeholder="Número de identificación"
                className="rounded-full"
                required
            />

            <Label htmlFor="" className="self-center">
                Correo electrónico *
            </Label>
            <Input
                type="email"
                name="correoElectronico"
                value={formData?.correoElectronico || ''}
                onChange={(event) => handleChange('correoElectronico', event.target.value)}
                placeholder="Correo electrónico"
                className="rounded-full"
                required
            />

            <Label htmlFor="" className="self-center">
                Celular *
            </Label>
            <Input
                type="number"
                name="celular"
                value={formData?.celular || ''}
                onChange={(event) => handleChange('celular', event.target.value)}
                placeholder="Celular"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Departamento *</Label>
            <Select name="departamento" value={formData?.departamento || ''} onValueChange={(value) => handleChange('departamento', value)} required>
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
                    <Label htmlFor="">Ciudad *</Label>
                    <Select name="ciudad" value={formData?.ciudad || ''} onValueChange={(value) => handleChange('ciudad', value)} required>
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

            <Label htmlFor="">Curso complementario *</Label>
            <Select name="cursoComplementarioId" value={formData?.cursoComplementarioId || ''} onValueChange={(value) => handleChange('cursoComplementarioId', value)} required>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                    {cursosComplementarios?.map((cursoComplementario, index) => (
                        <SelectItem key={cursoComplementario.id} value={cursoComplementario.id}>
                            {cursoComplementario.nombre}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button className="rounded-full w-full col-span-2">Registrar</Button>
        </form>
    )
}
