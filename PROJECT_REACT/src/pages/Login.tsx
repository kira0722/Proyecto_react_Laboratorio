import { useState } from 'react';
import type { Usuario } from '../types';

interface LoginProps {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

export function Login({ usuario, iniciarSesion, cerrarSesion }: LoginProps) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nombreUsuario =
      nombre.trim() || correo.split('@')[0] || 'Cliente';

    iniciarSesion({
      nombre: nombreUsuario,
      correo,
    });
    alert('¡Bienvenido a Menta & Vainilla! Sesión iniciada.');
  };

  if (usuario) {
    return (
      <main className="flex-grow flex items-center justify-center p-4 my-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-emerald-100/60 text-center space-y-6">
          <div className="inline-block p-4 rounded-full bg-emerald-50 text-emerald-600">
            <i className="fa-solid fa-user-check text-2xl"></i>
          </div>
          <div>
            <h2 className="font-brand text-2xl font-bold text-slate-900">
              ¡Hola, {usuario.nombre}!
            </h2>
            <p className="text-gray-500 text-xs mt-1">{usuario.correo}</p>
          </div>
          <p className="text-xs text-gray-600 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            Tu sesión está activa en este navegador. Puedes gestionar tus reservas o cotizar pasteles personalizados.
          </p>
          <button
            type="button"
            onClick={cerrarSesion}
            className="w-full bg-rose-50 text-rose-600 font-bold py-3 rounded-full hover:bg-rose-100 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4 my-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-emerald-100/60">
        <div className="text-center mb-6">
          <div className="inline-block p-4 rounded-full bg-emerald-50 text-emerald-600 mb-3">
            <i className="fa-solid fa-key text-2xl"></i>
          </div>
          <h2 className="font-brand text-2xl font-bold text-slate-900">
            Bienvenido de Nuevo
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Ingresa a tu cuenta para gestionar tus reservas y cotizaciones
          </p>
        </div>

        <form onSubmit={manejarSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Tu Nombre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 text-sm">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Sofía Gómez"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 text-sm">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="cliente@ejemplo.com"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 text-sm">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-full hover:bg-emerald-700 shadow-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}

