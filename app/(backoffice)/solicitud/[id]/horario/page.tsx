
export default function Horario({ params }: { params: { id: string } }) {

  // You can use the id variable in your component logic
  return (
    <div>
      <h1>ID: {params.id}</h1>



    </div>
  );
}