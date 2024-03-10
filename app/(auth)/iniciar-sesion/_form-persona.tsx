import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datepicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export default function FormularioPersona() {
    return (
        <form action="" className="p-8 grid grid-cols-2 space-y-4">
            <Label htmlFor="">Nombres</Label>
            <Input type="text" placeholder="Nombre" className="!mt-0 rounded-full" />
            <Label htmlFor="">Apellidos</Label>
            <Input type="text" placeholder="Apellidos" className="rounded-full" />
            <Label htmlFor="">Tipo de documento</Label>
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
            <Label htmlFor="">Número de identificación</Label>
            <Input type="number" placeholder="Número de identificación" className="rounded-full" />
            <Label htmlFor="">Fecha de nacimiento</Label>
            <DatePicker />
            <Label htmlFor="">Género</Label>

            <RadioGroup defaultValue="option-one" className="flex items-center justify-center gap-10">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-m">M:</Label>
                    <RadioGroupItem value="option-m" id="option-one" />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-f">F:</Label>
                    <RadioGroupItem value="option-f" id="option-f" />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="option-o">O:</Label>
                    <RadioGroupItem value="option-0" id="option-o" />
                </div>
            </RadioGroup>
            <Label htmlFor="">Correo electrónico</Label>
            <Input type="email" placeholder="Correo electrónico" className="rounded-full" />
            <Label htmlFor="">Celular</Label>
            <Input type="number" placeholder="Celular" className="rounded-full" />
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
            <Label htmlFor="">Población especial</Label>
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
