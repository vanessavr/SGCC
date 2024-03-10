import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CalendarIcon from '../components/svg/CalendarIcon'
import FaceIcon from '../components/svg/FaceIcon'

export default function CursoAsignado() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Cursos asignados</h1>
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ficha de la formación</TableHead>
                        <TableHead>Curso complementario</TableHead>
                        <TableHead>Correo electrónico</TableHead>
                        <TableHead>Ambiente</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <Dialog>
                                <DialogTrigger>
                                    <CalendarIcon className="w-10 items-center" />
                                </DialogTrigger>
                                <DialogContent className="pb-20 pt-20 flex items-center justify-center flex-col py-8 ">
                                    <FaceIcon className="w-20 items-center" />
                                    <p className="flex text-center justify-center">Lo sentimos, no tiene un horario disponible en este momento</p>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="rounded-full text-center w-40">Cerrar</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>

                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <CalendarIcon className="w-10 items-center" />
                        </TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <CalendarIcon className="w-10 items-center" />
                        </TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <CalendarIcon className="w-10 items-center" />
                        </TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
