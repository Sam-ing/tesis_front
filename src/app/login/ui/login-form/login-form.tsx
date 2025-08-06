'use client'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Loader from '../../../lib/loader'

type MockUser = {
  email: string;
  password: string;
  // otros campos si los tienes
};

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Función mock para simular el login
    const mockLogin = async (email: string, pass: string) => {
      return new Promise<{ token?: string; message?: string }>((resolve) => {
        setTimeout(() => {
          const users: MockUser[] = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const user = users.find((u) => u.email === email && u.password === pass);
          if (user) {
            resolve({ token: 'mocked-token-123' });
          } else {
            resolve({ message: 'Credenciales incorrectas' });
          }
        }, 800); // Simula un retardo de red
      });
    };

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        const res = await mockLogin(email, pass);
        if (res.token) {
          localStorage.setItem('token', res.token);
          router.push('/home');
        } else {
          setError(res.message || 'Error al iniciar sesión');
        }
      } catch {
        setError('Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    };

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
      <>
        {loading && <Loader />}
        <div className="w-screen h-screen bg-bgMedium flex items-center justify-center">
        <div className="w-full max-w-sm bg-bgLigth rounded-xl p-6 shadow-lg">
          <h1 className="centerMediumSubTitle">Iniciar sesion</h1>

          <form onSubmit={handleLogin}>
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
            <button
              type="submit"
              className="buttonPrimary"
            >
              Iniciar sesión
            </button>
          </div>
          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="centerDarkParagraph mt-4">
            ¿No estás registrado?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
            Registrarse
            </Link>
          </p>  
          </form>
        </div>
      </div>
      </>
    );
}
