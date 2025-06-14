import { notFound } from 'next/navigation';

// Tipo explícito para props
type Props = {
  params: Promise<{ placeId: string }>;
};


const productos = [
  {
    id: 1,
    title: 'Producto 1',
    description: 'Descripción completa del producto 1.',
    image: '/images/product1.jpg',
  },
  {
    id: 2,
    title: 'Producto 2',
    description: 'Descripción completa del producto 2.',
    image: '/images/product2.jpg',
  },
  {
    id: 3,
    title: 'Producto 3',
    description: 'Descripción completa del producto 3.',
    image: '/images/product3.jpg',
  },
];

// Debes exportar como `default async function` aunque no uses await
export default async function ProductoPage({ params }: Props) {
  const resolvedParams = await params;

  const producto = productos.find((p) => p.id === Number(resolvedParams.placeId));

  if (!producto) return notFound();

  return (
    <main className="min-h-screen bg-bgMedium p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow p-6">
        <img
          src={producto.image}
          alt={producto.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <h1 className="centerDarkTitle mt-4">{producto.title}</h1>
        <p className="leftMediumParagraph mt-2">{producto.description}</p>
      </div>
    </main>
  );
}


