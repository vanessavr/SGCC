'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import type { Departamento, Persona, Rol } from '@/types/MyTypes'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useToast } from '@/components/ui/use-toast'
import { savePersona } from '@/lib/actions'
import { handleErrorsToast } from '@/utils/handleErrorsToast'

interface Props {
    className?: string
    data?: Persona
    esRegistro?: boolean
}
export default function FormularioUsuario({ className, data, esRegistro = false }: Props) {
    const [formData, setFormData] = useState<Partial<Persona>>(data || {})
    const { toast } = useToast()
    const [ciudades, setCiudades] = useState<[]>([])
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)
    const [roles, setRoles] = useState<Rol[]>()

    useEffect(() => {
        if (!esRegistro) {
            const fetchRoles = async () => {
                try {
                    const rolesResponse = await fetcher(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/rol`)

                    setRoles(rolesResponse)
                } catch (error) {
                    console.error('Error al obtener los roles:', error)
                    // Manejar errores si es necesario
                }
            }

            fetchRoles()
        }

        setFormData((prevData) => ({
            ...prevData,
            esRegistro: true,
        }))
    }, [esRegistro])

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

            response = await savePersona(formData as Persona)

            if (response?.statusCode) {
                handleErrorsToast(response)
            } else {
                toast({ title: '✔️', description: 'Usuario guardado satisfactoriamente' })
            }
        } catch (error) {
            console.error('Error al guardar el usuario:', error)
            toast({ title: '✖️', description: 'Error al guardar el usuario' })
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
            <Select name="tipoDocumento" value={formData?.tipoDocumento || undefined} onValueChange={(value) => handleChange('tipoDocumento', value)} required>
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
                Fecha de nacimiento *
            </Label>
            <input
                type="date"
                placeholder="Seleccione una fecha"
                name="fechaNacimiento"
                value={formData?.fechaNacimiento || ''}
                onChange={(event) => handleChange('fechaNacimiento', event.target.value)}
                className="p-2 rounded-full block w-full text-sm pl-3"
                required
            />

            <Label htmlFor="" className="self-center">
                Género *
            </Label>
            <RadioGroup name="genero" value={formData?.genero} onValueChange={(value) => handleChange('genero', value)} className="flex items-center gap-10" required>
                <div className="space-x-2">
                    <Label htmlFor="option-m">M:</Label>
                    <RadioGroupItem value="1" id="option-m" />
                </div>
                <div className="space-x-2">
                    <Label htmlFor="option-f">F:</Label>
                    <RadioGroupItem value="2" id="option-f" />
                </div>
                <div className="space-x-2">
                    <Label htmlFor="option-o">O:</Label>
                    <RadioGroupItem value="3" id="option-o" />
                </div>
            </RadioGroup>

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
            <Select name="departamento" value={formData?.departamento || undefined} onValueChange={(value) => handleChange('departamento', value)} required>
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
                    <Select name="ciudad" value={formData?.ciudad || undefined} onValueChange={(value) => handleChange('ciudad', value)} required>
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

            <Label htmlFor="" className="self-center">
                Población especial *
            </Label>
            <Select name="poblacionEspecial" value={formData?.poblacionEspecial || undefined} onValueChange={(value) => handleChange('poblacionEspecial', value)} required>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una población..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">No aplica</SelectItem>
                    <SelectItem value="2">Con discapacidad</SelectItem>
                    <SelectItem value="3">Víctimas</SelectItem>
                    <SelectItem value="4">Indígena</SelectItem>
                    <SelectItem value="5">Afrocolombiana</SelectItem>
                    <SelectItem value="6">Comunidades negras</SelectItem>
                    <SelectItem value="7">Palenquera</SelectItem>
                    <SelectItem value="8">Raizal</SelectItem>
                    <SelectItem value="9">Privada de la libertad</SelectItem>
                    <SelectItem value="10">Jóvenes vulnerables</SelectItem>
                    <SelectItem value="11">Tercera edad</SelectItem>
                    <SelectItem value="12">En reincorporación</SelectItem>
                    <SelectItem value="13">En reintegración</SelectItem>
                    <SelectItem value="14">RROM</SelectItem>
                    <SelectItem value="15">Adolescente en conflicto con ley penal</SelectItem>
                </SelectContent>
            </Select>

            {!esRegistro && roles && (
                <>
                    <Label htmlFor="">Rol *</Label>
                    <Select name="rolId" value={formData?.rolId || undefined} onValueChange={(value) => handleChange('rolId', value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Rol" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles?.map((rol, index) => (
                                <SelectItem key={rol.id} value={rol.id.toString()}>
                                    {rol.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            )}

            {!data && (
                <>
                    <Label htmlFor="" className="self-center">
                        Contraseña *
                    </Label>
                    <Input type="password" name="password" placeholder="Contraseña" onChange={(event) => handleChange('password', event.target.value)} className="rounded-full" required />
                </>
            )}
            <Button className="rounded-full w-full col-span-2">{data ? 'Guardar' : 'Registrar'}</Button>
        </form>
    )
}
