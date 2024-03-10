import Formulario from "../../_form";

export default function EditarHorario({ params }: { params: { id: string } }) {

  // You can use the id variable in your component logic
  return (
    <div>
      <h1>ID: {params.id}</h1>

    <Formulario />

    </div>
  );
}