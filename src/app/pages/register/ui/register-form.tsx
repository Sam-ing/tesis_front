'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    province: '',
    locality: '',
    address: ''
  });

  const locationData = {
    Argentina: {
      "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca"],
      Córdoba: ["Córdoba Capital", "Villa María", "Río Cuarto"],
    },
    Brasil: {
      "São Paulo": ["São Paulo", "Campinas", "Santos"],
      "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petropolis"],
    },
  };



  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setSelectedProvince('');
    setSelectedCity('');
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

                                                                                                                                                               
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Datos del usuario:', formData);
  };

  const provinces = selectedCountry ? Object.keys(locationData[selectedCountry]) : [];
  const cities = selectedProvince ? locationData[selectedCountry][selectedProvince] : [];

  return (
    <div className="h-full place-items-center bg-bgMedium py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-bgLigth grid grid-cols-1 md:grid-cols-2 gap-6 mt-40 rounded-xl p-6 shadow-lg"
      >
        <div className='md:col-span-2'>
          <h2 className="centerMediumSubTitle">Registro de Usuario</h2>
        </div>
        {/* Nombre */}
        <div className="mb-6 relative">
            <label
              htmlFor="name"
              className="floatingLabel"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.apellido}
              placeholder="Escribe tu nombre"
              onChange={handleChange}
              required
              className="textInput"
            />
          </div>

        {/* Apellido */}
        <div className="mb-6 relative">
            <label
              htmlFor="lastname"
              className="floatingLabel"
            >
              Apellido
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.apellido}
              placeholder="Escribe tu apellido"
              onChange={handleChange}
              required
              className="textInput"
            />
          </div>

        {/* Email */}
        <div className="mb-6 relative">
            <label
              htmlFor="email"
              className="floatingLabel"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Escribe tu email"
              onChange={handleChange}
              required
              className="textInput"
            />
          </div>

        {/* Contraseña */}
        <div className="mb-6 relative">
          <label className="floatingLabel">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="textInput"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        {/* Confirmar Contraseña */}
        <div className="mb-6 relative">
          <label className="floatingLabel">Confirma tu contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="textInput"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        {/* País */}
        <div className="mb-6 relative">
        <label
          htmlFor="country"
          className="floatingLabel z-10 bg-bgLigth px-1"
        >
          País
        </label>
        <div className="relative">
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="textInput appearance-none pr-10" 
            required
          >
            <option value="">Seleccionar país</option>
              {Object.keys(locationData).map((country) => (
            <option key={country} value={country}>{country}</option>
            ))}
          </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        </div>

        {/* Provincia */}
        <div className="mb-6 relative">
          <label className="floatingLabel floatingLabel z-10 bg-bgLigth px-1">Provincia</label>
          <div className="relative">
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className={`textInput appearance-none pr-10 ${!selectedCountry ? 'bg-bgLigth cursor-not-allowed' : ''}`}
              disabled={!selectedCountry}
              required
            >
              <option value="">Seleccionar provincia</option>
              {provinces.map((province) => (
              <option key={province} value={province}>{province}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Ciudad */}
        <div className="mb-6 relative">
          <label className="floatingLabel z-10 bg-bgLigth px-1 ">Ciudad</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className={`textInput appearance-none pr-10 ${!selectedProvince ? 'bg-bgLigth cursor-not-allowed' : ''}`}
                disabled={!selectedProvince}
                required
              >
                <option value="">Seleccionar ciudad</option>
                  {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
                ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

      {/* Address */}
      <div className="mb-6 relative">
        <label
            htmlFor="address"
            className="floatingLabel"
        >
            Dirección
        </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Escribe tu dirección"
            onChange={handleChange}
            required
            className="textInput"
            />
      </div>


      {/* Botón Registrarse*/}
      <div className='md:col-span-2 flex justify-center flex-col items-center'>
        <button type="submit" className="buttonPrimary"
        >
            Registrarse
        </button>
        {/*Texto ¿Ya estas registrado?*/ }
        <p className="centerMediumParagraph mt-4">
          ¿Ya estás registrado?{' '}
          <Link href="/pages/login" className="text-blue-600 hover:underline">
          Iniciar sesión.
          </Link>
        </p>  
      </div>
    </form>
  </div>
  );
}