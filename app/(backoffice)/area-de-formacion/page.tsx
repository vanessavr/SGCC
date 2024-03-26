'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CursoComplementario } from '@/types/MyTypes'
import { fetcher } from '@/utils/fetcher'
import Link from 'next/link'
import useSWR from 'swr'

export default function AreaFormacion() {
    const { data: areasFormacion } = useSWR<[]>(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/area-formacion`, fetcher)

    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Áreas de formación</h1>
            </header>
            <div className="grid grid-cols-3">
                {areasFormacion?.map((areaFormacion, index) => (
                    <Link key={index} href={`/area-de-formacion/${areaFormacion}/curso-complementario`} className="mt-10 bg-sena-800 p-10 rounded-xl flex flex-col items-center justify-center mx-4">
                        <h3 className="text-center text-white text-lg">{areaFormacion}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}
