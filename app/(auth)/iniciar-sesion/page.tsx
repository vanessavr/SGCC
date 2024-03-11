import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import FormularioPersona from './_form-persona'
import FormularioEmpresa from './_form-empresa'
import Link from 'next/link'

export default function InicioSesion() {
    return (
        <div className="bg-gray-300 p-8 w-[50vw] rounded-xl">
            <form action="" className="flex flex-col space-y-6">
                <div>
                    <Label htmlFor="" className="mb-2 ml-2">
                        Usuario / N° de Documento / NIT
                    </Label>
                    <Input type="text" placeholder="" className="rounded-full" />
                </div>

                <div>
                    <Label htmlFor="" className="mb-2 ml-2">
                        Contraseña
                    </Label>
                    <Input type="password" placeholder="Ingrese la contraseña" className="rounded-full" />
                </div>

                <div className="flex items-center gap-2">
                    {/* <Button className="rounded-full px-6">Iniciar sesión</Button> */}
                    <Link href="/panel-principal" className="rounded-full px-6 py-2 text-white bg-sena-800">
                        Iniciar sesión
                    </Link>
                    <Dialog>
                        <DialogTrigger className="rounded-full px-6 py-2 text-white bg-sena-800">Crear cuenta</DialogTrigger>

                        <DialogContent className="pb-10 pt-10  ">
                            <p className="flex text-center justify-center mb-6">Elige una de las siguientes opciones:</p>
                            <RadioGroup defaultValue="option-one" className="flex items-center justify-center gap-10">
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="option-one">Empresa</Label>
                                    <RadioGroupItem value="option-one" id="option-one" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="option-two">Persona</Label>
                                    <RadioGroupItem value="option-two" id="option-two" />
                                </div>
                            </RadioGroup>

                            <div className="flex items-center justify-center">
                                <Dialog>
                                    <DialogTrigger className="rounded-full font-bold py-2 px-4 mt-6 text-white bg-sena-800 w-40">Siguiente</DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-sm text-white">Registrar persona</DialogTitle>
                                        </DialogHeader>
                                        <FormularioPersona />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <Dialog>
                    <DialogTrigger className="font-medium flex items-start">Recuperar contraseña</DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center text-sm text-white">¿Has olvidado tu contraseña?</DialogTitle>
                        </DialogHeader>
                        <form className="px-8 grid grid-cols-2 space-y-6 pb-8">
                            <Label htmlFor="numeroIdentificacion" className="font-bold self-center">
                                Digite su C.C o NIT:
                            </Label>
                            <Input id="numeroIdentificacion" name="numeroIdentificacion" type="text" />

                            <Dialog>
                                <DialogTrigger className="rounded-full py-2 px-4 mt-8 text-white bg-sena-800 col-span-2 ">Recuperar contraseña</DialogTrigger>

                                <DialogContent className="pb-6">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-sm text-white">¿Has olvidado tu contraseña?</DialogTitle>
                                    </DialogHeader>
                                    <p className="text-center mt-4">
                                        Hemos recibido tu solicitud para restablecer la contraseña. Por favor, revisa tu correo electrónico para encontrar el enlace de recuperación. ¡Gracias!
                                    </p>
                                    <DialogFooter className="flex items-center justify-center mt-4">
                                        <DialogClose asChild>
                                            <Button className="rounded-full text-center w-80">Cerrar</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </form>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    )
}
