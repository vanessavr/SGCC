import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormularioCurso from '../_form'

export default function CrearCursoComplementario() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar curso complementario</h1>
            </header>
            <div className="mt-10  bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioCurso />
                </div>
            </div>
        </div>
    )
}
