import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormularioPersona from '../_form'

export default function CrearPersona() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar persona</h1>
            </header>

            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="size-60 mb-5">
                            <AvatarImage src="https://static.thenounproject.com/png/363639-200.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Button className="rounded-full w-60">Cargar foto</Button>
                    </div>
                </div>

                <div>
                    <FormularioPersona className="space-y-4" />
                </div>
            </div>
        </div>
    )
}
