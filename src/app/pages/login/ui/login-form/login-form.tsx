'use client'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <div className="w-screen h-screen bg-bgMedium flex items-center justify-center">
        <div className="w-full max-w-sm bg-bgLigth rounded-xl p-6 shadow-lg">
          <h1 className="centerMediumSubTitle">Iniciar sesion</h1>
    
          {/* Email Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="email"
              className="floatingLabel"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu email"
              className="textInput"
            />
          </div>
    
          {/* Password Input */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="floatingLabel"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Escribe tu contraseña"
              className="textInput"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
    
          {/* Botón centrado */}
          <div className="flex justify-center">
            <Link
                href="/pages/home"
                className="buttonPrimary"
            >
                Iniciar Sesión
            </Link>
          </div>
          <p className="centerDarkParagraph mt-4">
            ¿No estás registrado?{' '}
            <Link href="/pages/register" className="text-blue-600 hover:underline">
            Registrarse
            </Link>
         </p>  

        </div>
      </div>
    );
}