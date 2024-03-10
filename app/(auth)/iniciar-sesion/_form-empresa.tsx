import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export default function FormularioEmpresa() {
    return (
        <form action="" className="p-8 grid grid-cols-2 space-y-4">
            <Label htmlFor="">Nombre</Label>
            <Input type="text" placeholder="Nombre de la empresa" className="!mt-0 rounded-full" />
            <Label htmlFor="">NIT</Label>
            <Input type="number" placeholder="NIT (Sin dígito de verificación)" className="rounded-full" />
            <Label htmlFor="">Representante legal</Label>
            <Input type="number" placeholder="Número de identificación" className="rounded-full" />
            <Label htmlFor="">Correo electrónico</Label>
            <Input type="email" placeholder="Correo electrónico" className="rounded-full" />
            <Label htmlFor="">Celular</Label>
            <Input type="number" placeholder="Celular" className="rounded-full" />
            <Label htmlFor="">Dirección</Label>
            <Input type="text" placeholder="Dirección" className="rounded-full" />
            <Label htmlFor="">Actividad económica</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <Label htmlFor="">Departamento</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
            <Label htmlFor="">Ciudad</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <Button className="rounded-full w-full col-span-2">Registrar</Button>
        </form>
    )
}
