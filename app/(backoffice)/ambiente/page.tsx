import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DeleteIcon from '../components/svg/DeleteIcon'
import ViewIcon from '../components/svg/ViewIcon'
import EditIcon from '../components/svg/EditIcon'
import { Button } from '@/components/ui/button'
import PlusIcon from '../components/svg/PlusIcon'
export default function Ambiente() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Ambientes</h1>
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
                        <TableHead>Capacidad</TableHead>
                        <TableHead>Centro de Formación</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
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
