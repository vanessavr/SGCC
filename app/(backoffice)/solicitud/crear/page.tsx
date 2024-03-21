import FormularioSolicitud from '../_form'

export default function CrearSolicitud() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar solicitud</h1>
            </header>
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioSolicitud className="flex flex-col space-y-3" />
                </div>
            </div>
        </div>
    )
}
