import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RecuperarContrasena({ params }: { params: { token: string } }) {
    return (
        <div className="bg-gray-300 p-8 w-[50vw] rounded-xl">
            <h1 className="font-bold text-2xl mb-4">Restablecer contraseña</h1>
            <p className="mb-4">Ingrese su nueva contraseña</p>
            <form action="" className="flex flex-col space-y-8">
                <div>
                    <Label htmlFor="" className="mb-2 ml-2">
                        Contraseña:
                    </Label>
                    <Input type="password" placeholder="" className="rounded-full" />
                </div>

                <div>
                    <Label htmlFor="" className="mb-2 ml-2">
                        Confirmar contraseña:
                    </Label>
                    <Input type="password" placeholder="Ingrese la contraseña" className="rounded-full" />
                </div>
                <Button className="rounded-full text-center !w-full">Guardar cambios</Button>
            </form>
        </div>
    )
}
