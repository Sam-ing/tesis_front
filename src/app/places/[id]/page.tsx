'use client';
import { useParams } from 'next/navigation';

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

export default function PlaceDetail() {
  const { id } = useParams();

  let proposal: Proposal | undefined = undefined;
  if (typeof window !== 'undefined') {
    const proposals: Proposal[] = JSON.parse(localStorage.getItem('mockProposals') || '[]');
    proposal = proposals.find((p) => String(p.id) === String(id));
  }

  if (!proposal) {
    return <div className="p-8">Propuesta no encontrada.</div>;
  }

  return (
    <main className="w-screen min-h-screen bg-bgMedium py-10 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 flex flex-col items-center">
        <h1 className="centerLigthTitle mb-4 text-2xl font-bold">{proposal.name}</h1>
        <img
          src={proposal.mainImageURL || proposal.images[0]?.url || '/images/product1.jpg'}
          alt={proposal.name}
          className="w-full max-w-lg h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg font-semibold mb-2">{proposal.shortDescription}</p>
        <p className="mb-4 text-gray-700">{proposal.longDescription}</p>
        <div className="w-full flex flex-col gap-2 text-sm text-gray-600 mb-4">
          <div>
            <b>Precio:</b> ${proposal.price} ({proposal.priceType})
          </div>
          <div>
            <b>Dirección:</b> {proposal.adress.street}, {proposal.adress.city}, {proposal.adress.country}
          </div>
          <div>
            <b>Dueño:</b> {proposal.owner.name} ({proposal.owner.email})
          </div>
        </div>
        {/* Imágenes adicionales */}
        {proposal.images?.length > 1 && (
          <div className="w-full mt-4">
            <h3 className="font-semibold mb-2">Imágenes adicionales:</h3>
            <div className="flex gap-2 flex-wrap">
              {proposal.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Imagen ${idx + 2}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}
        {/* Videos */}
        {proposal.videos?.length > 0 && (
          <div className="w-full mt-4">
            <h3 className="font-semibold mb-2">Videos:</h3>
            <div className="flex gap-2 flex-wrap">
              {proposal.videos.map((vid, idx) => (
                <video
                  key={idx}
                  src={vid.url}
                  controls
                  className="w-40 h-24 rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


