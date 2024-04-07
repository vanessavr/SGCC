'use client'

import './backoffice.css'

import SenaLogo from '@/app/(backoffice)/components/svg/SenaLogo'
import HomeIcon from './components/svg/HomeIcon'
import UserIcon from './components/svg/UserIcon'
import CalendarIcon from './components/svg/CalendarIcon'
import UsersIcon from './components/svg/UsersIcon'
import DocumentIcon from './components/svg/DocumentIcon'
import EmpresaIcon from './components/svg/EmpresaIcon'
import AmbienteIcon from './components/svg/AmbienteIcon'
import LoadIcon from './components/svg/LoadIcon'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { getProfile } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useRol } from '../context/AppContext'

export default function BackofficeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const [authUser, setAuthUser] = useState<any>()
    const router = useRouter()
    const { rolId, setRolId, setUserId, adminId, instructorId, empresaId, personaId, rolNombre } = useRol()

    const handleSubmit = async () => {
        try {
            // await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/logout`, {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Accept: 'application/json',
            //     },
            // })

            document.cookie = `accessToken=; domain=${process.env.NEXT_PUBLIC_DOMAIN}; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure;`

            // Redireccionar a la página de inicio de sesión
            router.push('/iniciar-sesion')
        } catch (error: any) {
            console.error('Error al cerrar sesión:', error.message)
            // Manejar errores si es necesario
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile()

                if (!data) {
                    throw new Error('Error al obtener el perfil del usuario')
                }

                setAuthUser(data)

                setRolId(data.rolId)
                setUserId(data.id)
            } catch (error: any) {
                console.error('Error al obtener el perfil del usuario:', error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <section className="layout">
            <div className="header mx-2 p-4 border-b-8 border-b-sena-600 grid grid-cols-3">
                <div className="flex items-center col-span-2">
                    <SenaLogo className="w-24" />
                    <h1 className="text-sena-600 text-1xl ml-6 title-header">
                        <strong className="text-4xl">SGCC</strong> <br /> Sistema de Gestión <br />
                        Cursos Complementarios
                        <br />
                        CPIC
                    </h1>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <div>
                        Bienvenido(a) <span className="uppercase">{authUser?.nombres || authUser?.razonSocial}</span>
                        <br />
                        <small>
                            <strong>Rol:</strong> {rolNombre}
                        </small>
                    </div>
                    <Button
                        className="mt-4"
                        onClick={handleSubmit}>
                        Cerrar sesión
                    </Button>
                </div>
            </div>
            <div className="sidebar bg-sena-600 rounded-md ml-2">
                <nav className="p-6">
                    <ul className="flex flex-col space-y-7 text-sm">
                        <li>
                            <Link
                                href="/panel-principal"
                                className="flex items-center text-white">
                                <HomeIcon className=" mr-2 size-6" /> Inicio
                            </Link>
                        </li>

                        {rolId == adminId && (
                            <li>
                                <Link
                                    href="/ambiente"
                                    className="flex items-center text-white">
                                    <AmbienteIcon className="mr-2 size-6" />
                                    Ambientes
                                </Link>
                            </li>
                        )}

                        {rolId == adminId || rolId == empresaId || rolId == personaId ? (
                            <li>
                                <Link
                                    href="/area-de-formacion"
                                    className="flex items-center text-white">
                                    <AmbienteIcon className="mr-2 size-6" />
                                    Áreas de formación
                                </Link>
                            </li>
                        ) : null}

                        {rolId == adminId || rolId == instructorId ? (
                            <li>
                                <Link
                                    href="/curso-asignado"
                                    className="flex items-center text-white">
                                    <CalendarIcon className="mr-2 size-6" />
                                    Cursos asignados
                                </Link>
                            </li>
                        ) : null}

                        {rolId == adminId && (
                            <li>
                                <Link
                                    href="/curso-complementario"
                                    className="flex items-center text-white">
                                    <DocumentIcon className="mr-2 size-6" />
                                    Cursos complementarios
                                </Link>
                            </li>
                        )}

                        {rolId == adminId && (
                            <li>
                                <Link
                                    href="/empresa"
                                    className="flex items-center text-white">
                                    <EmpresaIcon className="mr-2 size-6" />
                                    Empresas
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link
                                href="/perfil"
                                className="flex items-center text-white">
                                <UserIcon className="mr-2 size-6" /> Perfil
                            </Link>
                        </li>

                        {rolId == adminId || rolId == instructorId || rolId == empresaId || rolId == personaId ? (
                            <li>
                                <Link
                                    href="/solicitud"
                                    className="flex items-center text-white">
                                    <CalendarIcon className="mr-2 size-6" />
                                    Solicitudes
                                </Link>
                            </li>
                        ) : null}

                        {rolId == adminId && (
                            <li>
                                <Link
                                    href="/usuario"
                                    className="flex items-center text-white">
                                    <UsersIcon className="mr-2 size-6" />
                                    Usuarios
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="body mr-2 relative">{children}</div>
            <div className="footer bg-sena-600 p-2 flex items-center justify-center">
                <p className="text-white text-center w-8/12 mx-auto text-xs">
                    .:: Servicio Nacional de Aprendizaje SENA – Dirección General Calle 57 No. 8-69, Bogotá D.C - PBX (57 1) 5461500 <br />
                    Línea gratuita de atención al ciudadano Bogotá 343 01 11 – Resto del país 018000 910270 <br /> Horario de atención: lunes a viernes de 8:00 am a 5:30 pm <br />
                    Correo electrónico para notificaciones judiciales: servicioalciudadano@sena.edu.co <br />
                    Todos los derechos reservados © 2023 ::.
                </p>
            </div>
        </section>
    )
}
