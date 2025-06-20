'use client'
import Link from 'next/link';
import { AiOutlineSearch,  } from 'react-icons/ai';
import { IoIosSettings } from "react-icons/io";
import { useState, useRef, useEffect } from 'react';
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";




export default function Navbar() {

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLButtonElement>(null);
  const [hasNewMessages] = useState(true)

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="w-full bg-bgDark shadow-md">
      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-betwee">
        {/* Logo o título */}
        <Link href="/" className="text-xl font-bold text-tLigth">
          MiApp
        </Link>

          {/* Barra de búsqueda */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3 hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-bgLigth px-4 py-2 pl-10 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-bgLigth"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tDarks" />
        </div>

        <div className="flex items-center space-x-4 ml-auto">
        {/* Links de navegación */}
        <div className="space-x-4">
          <Link href="/register" className="text-tLigth hover:text-blue-500">
            Registro
          </Link>
          <Link href="/login" className="text-tLigth hover:text-blue-500">
            Iniciar sesión
          </Link>
        </div>

        {/* Icono de mensajería */}
<Link href="/chats" className="relative">
  <button className="p-2 rounded-full hover:bg-gray-100 transition">
    {hasNewMessages ? (
      <MdOutlineMarkUnreadChatAlt className="text-tLigth" size={22} />
    ) : (
      <MdOutlineChatBubbleOutline className="text-tLigth" size={22} />
    )}
  </button>
  
</Link>

        {/* Botón Configuración */}
        <button
            ref={menuRef}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoIosSettings size={22} className="text-tLigth" />
          </button>

          {/* Menú desplegable */}
          {open && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
              <ul className="flex flex-col">
                <li>
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ajustes"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Ajustes
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpen(false)
                      // Lógica para cerrar sesión
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
          </div>
      </div>
    </nav>
  );
}
