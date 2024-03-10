import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import FormularioCursoComplementario from '../../_form-curso-complementario'

export default function CursoComplementario({ params }: { params: { id: string } }) {
    return (
        <div>
            <header className="bg-sena-600 p-2 rounded-sm">
                <h1 className="text-center text-4xl text-white">Áreas de formación</h1>
            </header>
            <div className="flex flex-wrap justify-center">
                <div className="mt-10 bg-gray-300 py-7 px-8 w-60 rounded-xl flex flex-col items-center justify-center mx-4">
                    <h1 className="text-center text-sm mb-2 font-bold">REENTRENAMIENTO EN TRABAJO EN ALTURAS PARA TRABAJADOR AUTORIZADO</h1>
                    <h2 className="text-center text-sm mb -1 mt-4">Sena Regional de Caldas</h2>
                    <p className="text-center text-xs mb-1">cupos: 15</p>
                    <Button className="rounded-full font-bold py-2 px-4 mt-6">Ver / Aplicar</Button>
                </div>
                <div className="mt-10 bg-gray-300 py-7 px-8 w-60 rounded-xl flex flex-col items-center justify-center mx-4">
                    <h1 className="text-center text-sm mb-2 font-bold">COORDINADOR DE TRABAJO EN ALTURAS</h1>
                    <h2 className="text-center text-sm mb-1 mt-12">Sena Regional de Caldas</h2>
                    <p className="text-center text-xs mb-1">cupos: 15</p>
                    <Button className="rounded-full font-bold py-2 px-4 mt-6">Ver / Aplicar</Button>
                </div>
                <div className="mt-10 bg-gray-300 py-7 px-8 w-60 rounded-xl flex flex-col items-center justify-center mx-4">
                    <h1 className="text-center text-sm mb-2 font-bold">TRABAJADOR AUTORIZADO PARA TRABAJO EN ALTURAS</h1>
                    <h2 className="text-center text-sm mb-1 mt-4">Sena Regional de Caldas</h2>
                    <p className="text-center text-xs mb-1">cupos: 15</p>
                    <Dialog>
                        <DialogTrigger className="rounded-full font-bold py-2 px-4 mt-6 text-white bg-sena-800">Ver / Aplicar</DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-center text-sm text-white">REENTRENAMIENTO EN TRABAJO EN ALTURAS PARA TRABAJADOR AUTORIZADO</DialogTitle>
                            </DialogHeader>
                            <FormularioCursoComplementario />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
