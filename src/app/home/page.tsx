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
    name: 'Eco Lodge',
    shortDescription: 'Disfruta de la naturaleza en un alojamiento ecológico.',
    longDescription: 'Eco Lodge ofrece una experiencia única en contacto con la naturaleza, con instalaciones sostenibles y actividades ecológicas para toda la familia. Perfecto para quienes buscan desconectarse y cuidar el medio ambiente.',
    priceType: 'per night',
    price: 120,
    adress: { street: 'Calle 1', city: 'Ciudad 1', country: 'País 1' },
    owner: { name: 'Juan', email: 'juan@mail.com' },
    images: [{ url: '/images/product1.jpg' }],
    videos: [],
    mainImageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    reviews: [],
  },
  {
    id: 2,
    name: 'Senderismo en Bosque',
    shortDescription: 'Explora senderos rodeados de vegetación y aire puro',
    longDescription: 'Vive la aventura de recorrer senderos en un bosque protegido, guiado por expertos locales. Ideal para amantes del trekking, la fotografía y la naturaleza. Incluye paradas en miradores y zonas de picnic.',
    priceType: 'per day',
    price: 30,
    adress: { street: 'Calle 2', city: 'Ciudad 2', country: 'País 2' },
    owner: { name: 'Ana', email: 'ana@mail.com' },
    images: [{ url: '/images/product2.jpg' }],
    videos: [],
    mainImageURL: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
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
