import { useState } from 'react';
import type { Pagina, Usuario } from '../types';

interface NavbarProps {
  paginaActual: Pagina;
  cambiarPagina: (pagina: Pagina) => void;
  usuario: Usuario | null;
}

export function Navbar({ paginaActual, cambiarPagina, usuario }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const irA = (pagina: Pagina) => {
    cambiarPagina(pagina);
    setMenuAbierto(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => irA('inicio')}
            className="flex items-center space-x-3 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <div>
              <span className="font-brand text-2xl font-bold text-slate-900 leading-none block">
                Menta &amp; Vainilla
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">
                Repostería &amp; Eventos
              </span>
            </div>
          </button>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
            <button
              type="button"
              onClick={() => irA('inicio')}
              className={
                paginaActual === 'inicio'
                  ? 'text-emerald-600 font-bold'
                  : 'hover:text-emerald-600'
              }
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => irA('reserva')}
              className={
                paginaActual === 'reserva'
                  ? 'text-emerald-600 font-bold'
                  : 'hover:text-emerald-600'
              }
            >
              Reservar Mesa
            </button>
            <button
              type="button"
              onClick={() => irA('mis-reservas')}
              className={
                paginaActual === 'mis-reservas'
                  ? 'text-emerald-600 font-bold'
                  : 'hover:text-emerald-600'
              }
            >
              Mis Reservas
            </button>
            <button
              type="button"
              onClick={() => irA('login')}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-700"
            >
              {usuario ? (
                <span>
                  <i className="fa-solid fa-user mr-1.5"></i>
                  {usuario.nombre}
                </span>
              ) : (
                'Mi Cuenta'
              )}
            </button>
          </div>

          {/* Botón móvil */}
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden pb-4 space-y-2 border-t border-emerald-50 pt-3 flex flex-col items-start text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => irA('inicio')}
              className={`w-full text-left py-2 ${paginaActual === 'inicio' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => irA('reserva')}
              className={`w-full text-left py-2 ${paginaActual === 'reserva' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Reservar Mesa
            </button>
            <button
              type="button"
              onClick={() => irA('mis-reservas')}
              className={`w-full text-left py-2 ${paginaActual === 'mis-reservas' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Mis Reservas
            </button>
            <button
              type="button"
              onClick={() => irA('login')}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-emerald-700 mt-1"
            >
              {usuario ? usuario.nombre : 'Mi Cuenta'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

