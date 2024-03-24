'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Departamento, Empresa } from '@/types/MyTypes'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useToast } from '@/components/ui/use-toast'

interface Props {
    className?: string
    data?: Empresa
}
export default function FormularioEmpresa({ className, data }: Props) {
    const [formData, setFormData] = useState<Partial<Empresa>>()
    const { toast } = useToast()
    const [ciudades, setCiudades] = useState<[]>([])
    const { data: departamentos } = useSWR<Departamento[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/departamento`, fetcher)
    const { data: actividadesEconomicas } = useSWR(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/listas/actividades-economicas`, fetcher)

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
            // const { ambiente, ...formDataWithoutAmbiente } = data
            setFormData(data)
        }
    }, [data])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/empresa/${data ? data?.id : ''}`, {
            method: data ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Mostrar el toast cuando la empresa sea exitosa
                    toast({ title: '✔️', description: 'Empresa guardada satisfactoriamente' })
                } else {
                    toast({ title: '✖️', description: 'Error al guardar la empresa' })
                }
            })
            .catch((error) => {
                console.error('Error al guardar la empresa:', error)
                toast({ title: '✖️', description: 'Error al guardar la empresa' })
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
            <Label htmlFor="">Razón social *</Label>
            <Input
                type="text"
                name="razonSocial"
                value={formData?.razonSocial || ''}
                onChange={(event) => handleChange('razonSocial', event.target.value)}
                placeholder="Nombre de la empresa"
                className="!mt-0 rounded-full"
                required
            />

            <Label htmlFor="">NIT *</Label>
            <Input
                type="number"
                name="nit"
                value={formData?.nit || ''}
                onChange={(event) => handleChange('nit', event.target.value)}
                placeholder="NIT (Sin dígito de verificación)"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Persona a cargo *</Label>
            <Input
                type="text"
                name="representanteLegal"
                value={formData?.representanteLegal || ''}
                onChange={(event) => handleChange('representanteLegal', event.target.value)}
                placeholder="Nombre del representante legal"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Correo electrónico *</Label>
            <Input
                type="email"
                name="correoElectronico"
                value={formData?.correoElectronico || ''}
                onChange={(event) => handleChange('correoElectronico', event.target.value)}
                placeholder="Correo electrónico"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Celular *</Label>
            <Input type="number" name="celular" value={formData?.celular || ''} onChange={(event) => handleChange('celular', event.target.value)} placeholder="Celular" className="rounded-full"  required/>

            <Label htmlFor="">Dirección *</Label>
            <Input
                type="text"
                name="direccion"
                value={formData?.direccion || ''}
                onChange={(event) => handleChange('direccion', event.target.value)}
                placeholder="Dirección"
                className="rounded-full"
                required
            />

            <Label htmlFor="">Actividad económica *</Label>
            <Select name="actividadEconomica" value={formData?.actividadEconomica || ''} onValueChange={(value) => handleChange('actividadEconomica', value)} required>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione una actividad" />
                </SelectTrigger>
                <SelectContent>
                    {actividadesEconomicas?.map((actividadEconomica: string, index: number) => (
                        <SelectItem key={index} value={index.toString()}>
                            {actividadEconomica}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

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

            {!data && (
                <>
                    <Label htmlFor="">Contraseña *</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData?.password || ''}
                        onChange={(event) => handleChange('password', event.target.value)}
                        placeholder="Contraseña"
                        className="rounded-full"
                        required
                    />
                </>
            )}
            <Button className="rounded-full w-full col-span-2">Registrar</Button>
        </form>
    )
}
