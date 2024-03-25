'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import FormularioPersona from '@/app/(backoffice)/usuario/persona/_form'
import FormularioEmpresa from '@/app/(backoffice)/empresa/_form'
import Link from 'next/link'
import { useState } from 'react'
import { Login } from '@/types/MyTypes'

export default function InicioSesion() {
    const [formData, setFormData] = useState<Partial<Login>>()
    const [selectedOption, setSelectedOption] = useState('empresa')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(formData),
        })
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <div className="h-[69.9vh] flex items-center justify-center">
            <div className="bg-gray-300 p-8 w-[50vw] rounded-xl">
                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="" className="mb-2 ml-2">
                            Usuario / N° de Documento / NIT
                        </Label>
                        <Input
                            type="number"
                            placeholder="Ingrese el número de documento / NIT"
                            value={formData?.numeroIdentificacion || ''}
                            onChange={(event) => handleChange('numeroIdentificacion', event.target.value)}
                            className="rounded-full"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="" className="mb-2 ml-2">
                            Contraseña
                        </Label>
                        <Input
                            type="password"
                            placeholder="Ingrese la contraseña"
                            value={formData?.password || ''}
                            onChange={(event) => handleChange('password', event.target.value)}
                            className="rounded-full"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="rounded-full px-6">Iniciar sesión</Button>

                        <Dialog>
                            <DialogTrigger className="rounded-full px-6 py-2 text-white bg-sena-800">Crear cuenta</DialogTrigger>

                            <DialogContent className="pb-10 pt-10">
                                <p className="flex text-center justify-center mb-6">Elige una de las siguientes opciones:</p>
                                <RadioGroup defaultValue="empresa" className="flex items-center justify-center gap-10" onValueChange={(value: string) => setSelectedOption(value)}>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="empresa">Empresa</Label>
                                        <RadioGroupItem value="empresa" id="empresa" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="persona">Persona</Label>
                                        <RadioGroupItem value="persona" id="persona" />
                                    </div>
                                </RadioGroup>

                                <div className="flex items-center justify-center">
                                    <Dialog>
                                        <DialogTrigger className="rounded-full font-bold py-2 px-4 mt-6 text-white bg-sena-800 w-40">Siguiente</DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center text-sm text-white"> {selectedOption === 'persona' ? 'Registrar persona' : 'Registrar empresa'}</DialogTitle>
                                            </DialogHeader>
                                            {selectedOption === 'persona' ? (
                                                <FormularioPersona className="p-8 grid grid-cols-2 space-y-4" />
                                            ) : (
                                                <FormularioEmpresa className="p-8 grid grid-cols-2 space-y-4" />
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Link href="/usuario-invitado" className="rounded-full px-6 py-2 text-white bg-sena-800">
                            Usuario invitado
                        </Link>
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
        </div>
    )
}
