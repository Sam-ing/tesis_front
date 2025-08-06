'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Adress = { street: string; city: string; country: string };
type UserProfile = { name: string; email: string };
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

export default function OfferRegister() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Proposal, 'id'>>({
    name: '',
    shortDescription: '',
    longDescription: '',
    priceType: 'per day',
    price: 0,
    adress: { street: '', city: '', country: '' },
    owner: { name: '', email: '' },
    images: [],
    videos: [],
    mainImageURL: '',
    reviews: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('adress.')) {
      setForm({
        ...form,
        adress: { ...form.adress, [name.split('.')[1]]: value },
      });
    } else if (name.startsWith('owner.')) {
      setForm({
        ...form,
        owner: { ...form.owner, [name.split('.')[1]]: value },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Cambia handleImages para aceptar archivos
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const readers: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
      );
    }
    Promise.all(readers).then((base64s) => {
      const images = base64s.map((b64) => ({ url: b64 }));
      setForm((prev) => ({
        ...prev,
        images,
        mainImageURL: images[0]?.url || '',
      }));
    });
  };

  // Cambia handleVideos para aceptar archivos
  const handleVideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const readers: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
      );
    }
    Promise.all(readers).then((base64s) => {
      const videos = base64s.map((b64) => ({ url: b64 }));
      setForm((prev) => ({
        ...prev,
        videos,
      }));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal: Proposal = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      reviews: [],
    };
    const proposals = JSON.parse(localStorage.getItem('mockProposals') || '[]');
    localStorage.setItem('mockProposals', JSON.stringify([newProposal, ...proposals]));
    router.push('/home');
  };

  return (
    <main className="w-screen min-h-screen bg-bgMedium py-10 flex flex-col items-center">
      <h1 className="centerLigthTitle mb-6">Registrar nueva propuesta</h1>
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl space-y-4"
        onSubmit={handleSubmit}
      >
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="textInput" required />
        <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Descripción corta" className="textInput" required />
        <textarea name="longDescription" value={form.longDescription} onChange={handleChange} placeholder="Descripción larga" className="textInput" required />
        <select name="priceType" value={form.priceType} onChange={handleChange} className="textInput">
          <option value="per day">Por día</option>
          <option value="per night">Por noche</option>
          <option value="per hour">Por hora</option>
          <option value="per person">Por persona</option>
        </select>
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio" className="textInput" required />
        <input name="adress.street" value={form.adress.street} onChange={handleChange} placeholder="Calle" className="textInput" required />
        <input name="adress.city" value={form.adress.city} onChange={handleChange} placeholder="Ciudad" className="textInput" required />
        <input name="adress.country" value={form.adress.country} onChange={handleChange} placeholder="País" className="textInput" required />
        <input name="owner.name" value={form.owner.name} onChange={handleChange} placeholder="Nombre del dueño" className="textInput" required />
        <input name="owner.email" value={form.owner.email} onChange={handleChange} placeholder="Email del dueño" className="textInput" required />
        <label className="block">Imágenes (puedes seleccionar varias):</label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImages}
          className="textInput"
        />
        <label className="block">Videos (puedes seleccionar varios):</label>
        <input
          name="videos"
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideos}
          className="textInput"
        />
        <div className="flex gap-4">
          <button type="submit" className="buttonPrimary w-full">Guardar</button>
          <button type="button" className="buttonSecondary w-full" onClick={() => router.push('/home')}>Cancelar</button>
        </div>
      </form>
    </main>
  );
}