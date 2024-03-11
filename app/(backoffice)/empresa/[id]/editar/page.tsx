import Formulario from '../../_form'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormularioPerfilEmpresa from '../../_form'

export default function EditarEmpresa({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar empresa</h1>
            </header>
            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">VITALPLATES</h1>
                <h5 className="text-2xl">NIT 1.000.323</h5>

                <div>
                    <Button className="rounded-full">Cambiar contraseña</Button>
                </div>
            </div>
            <div className="mt-10 bg-gray-300 py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioPerfilEmpresa />
                </div>
            </div>
        </div>
    )
}
