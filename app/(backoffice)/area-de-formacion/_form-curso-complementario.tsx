import { useRol } from '@/app/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { applySolicitud, saveSolicitud } from '@/lib/actions'
import { CursoComplementario, Solicitud } from '@/types/MyTypes'
import { useEffect, useState } from 'react'

interface Props {
    className?: string
    cursoComplementario?: CursoComplementario
}
export default function FormularioCursoComplementario({ cursoComplementario }: Props) {
    const [formData, setFormData] = useState<Partial<Solicitud>>({})
    const { userId } = useRol()

    useEffect(() => {
        setFormData({ usuarioId: userId })
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            if (cursoComplementario) {
                await applySolicitud(cursoComplementario.id, formData)
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
        <form className="p-8 grid grid-cols-2 space-y-4" onSubmit={handleSubmit}>
            <Label htmlFor="" className="font-bold">
                Programa de formación:
            </Label>
            <span className="!mt-0">{cursoComplementario?.nombre}</span>
            <Label htmlFor="" className="font-bold">
                Centro de formación:
            </Label>
            <span>[Nombre del centro]</span>
            <Label htmlFor="" className="font-bold">
                Departamento:
            </Label>
            <span>[Nombre del departamento]</span>
            <Label htmlFor="" className="font-bold">
                Ciudad:
            </Label>
            <span>[Nombre de la ciudad]</span>
            <Label htmlFor="" className="font-bold">
                Duración:
            </Label>
            <span>{cursoComplementario?.duracion}</span>

            <Label htmlFor="" className="font-bold">
                Jornada
            </Label>
            <span>{cursoComplementario?.jornada}</span>

            <Label htmlFor="cuposSolicitados" className="font-bold self-center">
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
