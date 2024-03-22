'use client'

import SenaLogo from '@/app/(backoffice)/components/svg/SenaLogo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const isUsuarioInvitadoPage = pathname === '/usuario-invitado'

    return (
        <section className="aut-layout">
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
                {isUsuarioInvitadoPage && (
                    <div className="flex items-center justify-center">
                        <Link href="/iniciar-sesion" className="rounded-full px-6 py-2 text-white bg-sena-800">
                            Iniciar sesión
                        </Link>
                    </div>
                )}
            </div>

            <div className="body w-m-auto flex items-center justify-center flex-col">{children}</div>
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
