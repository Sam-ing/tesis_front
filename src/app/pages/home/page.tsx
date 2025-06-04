// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  const items = [
    {
      id: 1,
      title: 'Producto 1',
      description: 'Descripción breve del producto 1.',
      image: '/images/product1.jpg'
    },
    {
      id: 2,
      title: 'Producto 2',
      description: 'Descripción breve del producto 2.',
      image: '/images/product2.jpg'
    },
    {
      id: 3,
      title: 'Producto 3',
      description: 'Descripción breve del producto 3.',
      image: '/images/product3.jpg'
    },
  ];

  return (
    <main className="w-screen min-h-screen bg-bgMedium py-10 flex flex-col items-center">
      <h1 className="centerLigthTitle">Nuestros Productos</h1>

      <div className="w-[90%] mx-auto space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="leftDarkSubTitle">{item.title}</h2>
              <p className="leftMediumParagraph">{item.description}</p>
              <Link
                href={`places/${item.id}`}
                className="buttonSecondary"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
