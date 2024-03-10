import SenaLogo from '@/app/(backoffice)/components/svg/SenaLogo'
import './backoffice.css'
import HomeIcon from './components/svg/HomeIcon'
import UserIcon from './components/svg/UserIcon'
import CalendarIcon from './components/svg/CalendarIcon'

export default function BackofficeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="layout">
            <div className="header mx-2 p-4 border-b-8 border-b-sena-600 grid grid-cols-3">
                <div className="flex items-center col-span-2">
                    <SenaLogo className="w-24" />
                    <h1 className="text-sena-600 text-1xl ml-6 title-header">
                        <strong className="text-4xl">SGCC</strong> <br /> Sistema de Gestión <br />
                        Cursos Complementarios
                    </h1>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <div>Bienvenido(a) JORGE ARIAS OSORIO</div>
                    <button className="mt-4 ">Cerrar sesión</button>
                </div>
            </div>
            <div className="sidebar bg-sena-600 rounded-md ml-2">
                <nav className="p-6">
                    <ul className="flex flex-col space-y-7 text-sm">
                        <li>
                            <a href="#" className="flex items-center text-white">
                                <HomeIcon className=" mr-2 size-6" /> Inicio
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center text-white">
                                <UserIcon className="mr-2 size-6" /> Perfil
                            </a>
                        </li>

                        <li>
                            <a href="#" className="flex items-center text-white">
                                <CalendarIcon className="mr-2 size-6" />
                                Cursos asignados
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="body">{children}</div>
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
