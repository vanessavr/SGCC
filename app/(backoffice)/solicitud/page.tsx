import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import { Button } from '@/components/ui/button'
import PlusIcon from '../components/svg/PlusIcon'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CheckIcon from '../components/svg/CheckIcon'
import EditEstadoIcon from '../components/EditEstadoIcon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Solicitud() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Solicitudes</h1>
            </header>

            <div className="my-6">
                <Button className="rounded-full pr-8">
                    <PlusIcon />
                    <span className="ml-2">Registrar</span>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Correo electrónico</TableHead>
                        <TableHead>Estado de solicitud</TableHead>
                        <TableHead>Fecha de la solicitud</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger className="flex mt-4 gap-4">
                                    CERRADA
                                    <EditEstadoIcon />
                                </DialogTrigger>

                                <DialogContent className="pb-4">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-md text-white">Estado de solicitud</DialogTitle>
                                    </DialogHeader>

                                    <form className="px-8 grid grid-cols-2 space-y-6 pb-8">
                                        <Label htmlFor="" className="font-bold self-center">
                                            Estado de solicitud:
                                        </Label>
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
                                        <Label htmlFor="" className="font-bold self-center">
                                            Motivo de estado:
                                        </Label>
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
                                        <div className="col-span-2 ">
                                            <Button className="rounded-full font-bold py-2 px-4 w-full mt-4">Guardar cambios</Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <ViewIcon />
                            <EditIcon />

                            <Dialog>
                                <DialogTrigger>
                                    <DeleteIcon />
                                </DialogTrigger>
                                <DialogContent>
                                    <p className="flex text-center justify-center pt-10">¿Desea eliminar la solicitud?</p>

                                    <DialogFooter className="flex items-center justify-center gap-4 mb-10">
                                        <DialogClose asChild>
                                            <Button className="rounded-full text-center">Cancelar</Button>
                                        </DialogClose>

                                        <Dialog>
                                            <DialogTrigger>
                                                <Button className="rounded-full items-center text-center">Confirmar</Button>
                                            </DialogTrigger>
                                            <DialogContent className="flex items-center justify-center flex-col py-8">
                                                <CheckIcon className="text-sena-700" />
                                                <p className="flex items-center justify-around">¡Se ha eliminado correctamente el usuario!</p>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button className="rounded-full text-center">Entendido</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>CERRADA</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <ViewIcon />
                            <EditIcon />
                            <DeleteIcon />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <ViewIcon />
                            <EditIcon />
                            <DeleteIcon />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="flex gap-2">
                            <ViewIcon />
                            <EditIcon />
                            <DeleteIcon />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
