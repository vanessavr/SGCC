import FormularioEmpresa from '../_form'

export default function CrearEmpresa() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar empresa</h1>
            </header>
            <div className="mt-10 bg-gray-300 rounded-md p-4 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioEmpresa className="space-y-2" />
                </div>
            </div>
        </div>
    )
}
