import Link from "next/link";

export default function PanelPrincipal() {
    return (
        <div>
            <img src="\panel.png" alt="" className="w-full h-[500px] object-cover mb-10" />
            <Link href="/area-de-formacion" className="flex text-center justify-center h px-6 py-2 text-white bg-sena-800 w-full text-4xl my-6">
                ¡Inscríbete ahora con nosotros dando clic aquí!
            </Link>
        </div>
    )
}
