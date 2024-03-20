import FormularioCurso from '../../_form'

export default function EditarCursoComplementario({ params }: { params: { id: string } }) {
    // You can use the id variable in your component logic
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Registrar curso complementario</h1>
            </header>

            <div className="flex flex-col space-y-2 mt-6 ml-6">
                <h1 className="text-3xl uppercase font-bold">TRABAJO EN ALTURAS</h1>
                <h5 className="text-2xl">ID - 277323</h5>
            </div>
            <div className="mt-10 bg-gray-300 rounded-md py-16 grid grid-cols-2 gap-6 items-center">
                <div className="ml-64 w-full">
                    <FormularioCurso />
                </div>
            </div>
        </div>
    )
}
