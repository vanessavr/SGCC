import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function Usuario() {
    return (
        <div className="h-full flex flex-col">
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Usuarios</h1>
            </header>
            <div className="flex items-center justify-center h-full gap-10">
                <div className="flex items-center justify-center">
                    <Avatar className="size-20 relative -right-6">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link href="/usuario/persona" className="rounded-full px-10 py-2 text-white bg-sena-800">
                        Persona
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <Avatar className="size-20 relative -right-6">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link href="/usuario/instructor" className="rounded-full px-10 py-2 text-white bg-sena-800">
                        Instructor
                    </Link>
                </div>
            </div>
        </div>
    )
}
