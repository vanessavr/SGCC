import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import ViewIcon from '../../components/svg/ViewIcon'
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'
import PlusIcon from '../../components/svg/PlusIcon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function Instructor() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Usuarios - Instructores</h1>
            </header>

            <div className="my-6">
                <Link href="/" className="rounded-full pl-4 pr-6 py-2 text-white bg-sena-800">
                    <PlusIcon className="mr-2 inline-block" />
                    Registrar
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Celular</TableHead>
                        <TableHead>Correo electrónico</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="size-10 mb-5">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Paid
                        </TableCell>
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
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="size-10 mb-5">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Paid
                        </TableCell>
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
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="size-10 mb-5">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Paid
                        </TableCell>
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
                        <TableCell className="flex items-center gap-3">
                            <Avatar className="size-10 mb-5">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Paid
                        </TableCell>
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
