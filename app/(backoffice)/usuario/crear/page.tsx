import FormularioUsuario from '../_form'

export default function CrearUsuario() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar usuario</h1>
            </header>

            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                <div className="flex items-center justify-center"></div>

                <div>
                    <FormularioUsuario className="space-y-4" />
                </div>
            </div>
        </div>
    )
}
