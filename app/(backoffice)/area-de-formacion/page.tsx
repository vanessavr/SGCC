export default function AreaFormacion() {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Áreas de formación</h1>
            </header>
            <div className="flex flex-wrap justify-center">
                <div className="mt-10 bg-sena-800 py-8 w-60 rounded-xl flex items-center justify-center mx-4">
                    <h3 className="text-white text-lg">Trabajo en alturas</h3>
                </div>
                <div className="mt-10 bg-sena-800 py-8 w-60 rounded-xl flex items-center justify-center mx-4">
                    <h3 className="text-white text-lg">Soldadura</h3>
                </div>
                <div className="mt-10 bg-sena-800 py-8 w-60 rounded-xl flex items-center justify-center mx-4">
                    <h3 className="text-white text-lg">Confección</h3>
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                <div className="mt-10 bg-sena-800 py-8 w-60 rounded-xl flex items-center justify-center mx-4">
                    <h3 className="text-white text-lg">Electricidad</h3>
                </div>
                <div className="mt-10 bg-sena-800 py-8 w-60 rounded-xl flex items-center justify-center mx-4">
                    <h3 className="text-white text-lg">Maquinaria amarilla</h3>
                </div>
            </div>
        </div>
    )
}
