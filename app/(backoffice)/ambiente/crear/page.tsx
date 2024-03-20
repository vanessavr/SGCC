
import FormularioAmbiente from '../_form'


export default function CrearAmbiente() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar ambiente</h1>
            </header>
            <div className="mt-10  bg-gray-300 p-4 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioAmbiente />
                </div>
            </div>
        </div>
    )
}
