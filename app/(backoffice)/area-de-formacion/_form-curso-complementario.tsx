import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormularioCursoComplementario() {
    return (
        <form className="p-8 grid grid-cols-2 space-y-4">
            <Label htmlFor="" className="font-bold">
                Programa de formación:
            </Label>
            <span className="!mt-0">Reentrenamiento en trabajo en alturas para trabajador autorizado</span>
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
            <span>[Duración del programa]</span>
            <Label htmlFor="" className="font-bold">
                Fecha inicio:
            </Label>
            <span>[Fecha de inicio]</span>
            <Label htmlFor="" className="font-bold">
                Fecha fin:
            </Label>
            <span>[Fecha de finalización]</span>
            <Label htmlFor="" className="font-bold">
                Fecha cierre:
            </Label>
            <span>[Fecha de cierre]</span>
            <Label htmlFor="cuposSolicitados" className="font-bold self-center">
                Cupos solicitados:
            </Label>
            <Input id="cuposSolicitados" name="cuposSolicitados" type="number" />
            <Dialog>
                <DialogTrigger className="rounded-full font-bold py-2 px-8 !w-full col-span-2 mt-6 text-white bg-sena-800 ">Aplicar</DialogTrigger>
                <DialogContent className="pb-20 pt-20 flex items-center justify-center flex-col py-8 ">
                    <h1 className="font-bold text-md">¡Inscripción exitosa!</h1>
                    <p className="flex text-center justify-center">
                        Su inscripción se ha completado con éxito. Pronto recibirá un correo electrónico con detalles importantes para comenzar el programa de formación.
                    </p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="rounded-full text-center w-40">Cerrar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    )
}
