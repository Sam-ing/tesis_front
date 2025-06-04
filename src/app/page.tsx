'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-bgMedium min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="centerLigthTitle">
        ¡Bienvenido!
      </h1>

      <p className="centerDarkParagraph">
        Regístrate o inicia sesión para comenzar a buscar tus proximas vacaciones.
      </p>

      <div className="flex flex-col items-center gap-4">

        <div className="flex gap-4">
          <Link href="/pages/login">
            <button className="buttonPrimary">
              Iniciar sesión
            </button>
          </Link>

          <Link href="/pages/register">
            <button className="buttonSecondary">
              Registrarse
            </button>
          </Link>
        </div>
        <div >
          <Link href="/pages/register">
            <button className="buttonTertiary">
              Acerca de nosotros
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

