import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormularioAmbiente() {
  return (
      <form action="" className="flex flex-col space-y-3">
          <Label htmlFor="">Nombre</Label>
          <Input type="text" placeholder="Nombre del ambiente" className="rounded-full" />
          <Label htmlFor="">Capacidad</Label>
          <Input type="number" placeholder="Capacidad" className="rounded-full" />
          <Label htmlFor="">Centro de formación</Label>
          <Input type="text" placeholder="Centro de formación" className="rounded-full" />

          <Button className="rounded-full w-full">Guardar</Button>
      </form>
  )
}
