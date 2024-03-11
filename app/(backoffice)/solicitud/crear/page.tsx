import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormularioSolicitud from '../_form'

export default function CrearSolicitud() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar solicitud</h1>
            </header>
            <div className="mt-10  bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioSolicitud />
                    
                </div>
            </div>
        </div>
    )
}
