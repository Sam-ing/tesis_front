'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Adress = {
  street: string;
  city: string;
  country: string;
};
type UserProfile = {
  name: string;
  email: string;
};
type OfferImage = { url: string };
type OfferVideo = { url: string };
type Review = { user: string; comment: string };

type Proposal = {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceType: 'per day' | 'per night' | 'per hour' | 'per person';
  price: number;
  adress: Adress;
  owner: UserProfile;
  images: OfferImage[];
  videos: OfferVideo[];
  mainImageURL?: string;
  reviews?: Review[];
};

const defaultProposals: Proposal[] = [
  {
    id: 1,
    name: 'Producto 1',
    shortDescription: 'Descripción breve del producto 1.',
    longDescription: 'Descripción larga del producto 1.',
    priceType: 'per day',
    price: 100,
    adress: { street: 'Calle 1', city: 'Ciudad 1', country: 'País 1' },
    owner: { name: 'Juan', email: 'juan@mail.com' },
    images: [{ url: '/images/product1.jpg' }],
    videos: [],
    mainImageURL: '/images/product1.jpg',
    reviews: [],
  },
  {
    id: 2,
    name: 'Producto 2',
    shortDescription: 'Descripción breve del producto 2.',
    longDescription: 'Descripción larga del producto 2.',
    priceType: 'per night',
    price: 200,
    adress: { street: 'Calle 2', city: 'Ciudad 2', country: 'País 2' },
    owner: { name: 'Ana', email: 'ana@mail.com' },
    images: [{ url: '/images/product2.jpg' }],
    videos: [],
    mainImageURL: '/images/product2.jpg',
    reviews: [],
  },
];

export default function HomePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  // Cargar propuestas desde localStorage al montar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('mockProposals') || '[]');
    // Combina las propuestas mockeadas con las por defecto (evita duplicados por id)
    const all = [...stored, ...defaultProposals.filter(def => !stored.some((p: Proposal) => p.id === def.id))];
    setProposals(all);
  }, []);

  return (
    <main className="w-screen min-h-screen bg-bgMedium py-10 flex flex-col items-center">
      <h1 className="centerLigthTitle">Propuestas turísticas</h1>
      <Link href="/home/offer-register" className="buttonPrimary mb-6">
        Agregar propuesta
      </Link>

      <div className="w-[90%] mx-auto space-y-6 mt-4">
        {proposals.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <img
              src={item.mainImageURL || item.images[0]?.url || '/images/product1.jpg'}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="leftDarkSubTitle">{item.name}</h2>
              <p className="leftMediumParagraph">{item.shortDescription}</p>
              <Link
                href={`/places/${item.id}`}
                className="buttonSecondary mt-4 inline-block"
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
