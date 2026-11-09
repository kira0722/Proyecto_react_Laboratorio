import { useState } from 'react';
import type { Especialidad, Pagina } from '../types';

interface InicioProps {
  especialidades: Especialidad[];
  agregarEspecialidad: (nueva: Omit<Especialidad, 'id'>) => void;
  eliminarEspecialidad: (id: number) => void;
  irAReserva: () => void;
  cambiarPagina: (pagina: Pagina) => void;
}

export function Inicio({
  especialidades,
  agregarEspecialidad,
  eliminarEspecialidad,
  irAReserva,
}: InicioProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [icono, setIcono] = useState('fa-cake-candles');
  const [color, setColor] = useState<'emerald' | 'amber'>('emerald');

  const manejarCrearEspecialidad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !precio.trim()) return;

    agregarEspecialidad({
      nombre,
      descripcion,
      precio,
      icono,
      color,
    });

    setNombre('');
    setDescripcion('');
    setPrecio('');
    setMostrarFormulario(false);
  };

  return (
    <>
      <header className="bg-emerald-50/60 py-16 px-4 text-center border-b border-emerald-100">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider inline-block">
            Momentos especiales con sabor a hogar
          </span>
          <h1 className="font-brand text-4xl md:text-5xl font-bold text-slate-900">
            Celebraciones &amp; Repostería Artesanal
          </h1>
          <p className="text-gray-600 text-base">
            Disfruta de nuestras especialidades en el salón o diseña con nosotros el pastel personalizado para tu próximo evento.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={irAReserva}
              className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-emerald-700 text-sm"
            >
              <i className="fa-solid fa-calendar-check mr-2"></i>Reservar Lugar
            </button>
            <a
              href="#cotizacion-pastel"
              className="bg-amber-600 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-amber-700 text-sm"
            >
              <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>Cotizar Pastel
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full space-y-16">
        {/* Menú de especialidades */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center md:text-left">
              <h2 className="font-brand text-3xl font-bold text-slate-900">
                Nuestras Especialidades
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Elaborados diariamente con ingredientes naturales y vainilla de orquídea pura
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs font-bold hover:bg-emerald-200"
            >
              <i className={`fa-solid ${mostrarFormulario ? 'fa-xmark' : 'fa-plus'} mr-1.5`}></i>
              {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Especialidad'}
            </button>
          </div>

          {/* Formulario sencillo para agregar especialidad al LocalStorage */}
          {mostrarFormulario && (
            <form
              onSubmit={manejarCrearEspecialidad}
              className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-emerald-200 space-y-4"
            >
              <h3 className="font-brand text-lg font-bold text-slate-900">
                Nueva Especialidad del Menú
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Nombre del Postre
                  </label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Brownie de Menta"
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Precio / Presentación
                  </label>
                  <input
                    type="text"
                    required
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej: $14.000 / Porción"
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Ícono
                  </label>
                  <select
                    value={icono}
                    onChange={(e) => setIcono(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="fa-cake-candles">Pastel</option>
                    <option value="fa-stroopwafel">Cheesecake / Tartaleta</option>
                    <option value="fa-cookie">Galletas / Macarons</option>
                    <option value="fa-mug-hot">Bebida Caliente</option>
                    <option value="fa-ice-cream">Postre Frío</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Color de Tarjeta
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value as 'emerald' | 'amber')}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="emerald">Verde Menta</option>
                    <option value="amber">Dorado Vainilla</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  required
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe los ingredientes principales..."
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-full text-xs hover:bg-emerald-700"
                >
                  Guardar en Catálogo
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {especialidades.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100/60 hover:shadow-md transition relative group"
              >
                {especialidades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarEspecialidad(item.id)}
                    title="Eliminar especialidad"
                    className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 text-gray-300 hover:text-rose-500 text-xs p-1"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${
                    item.color === 'amber'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  <i className={`fa-solid ${item.icono}`}></i>
                </div>
                <h3 className="font-brand text-lg font-bold text-slate-900 mb-1">
                  {item.nombre}
                </h3>
                <p className="text-gray-500 text-xs mb-3">{item.descripcion}</p>
                <span className="font-bold text-emerald-700 text-sm">
                  {item.precio}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Experiencias y Eventos */}
        <section className="bg-emerald-50/40 rounded-3xl p-8 border border-emerald-100/60">
          <h2 className="font-brand text-2xl font-bold text-slate-900 mb-6 text-center">
            Paquetes para Celebraciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-brand font-bold text-lg text-slate-900 mb-2">
                Cumpleaños Petit
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Mesa decorada para 4-6 personas con mini pastel personalizado.
              </p>
              <button
                type="button"
                onClick={irAReserva}
                className="w-full block text-center bg-slate-900 text-white text-xs font-bold py-2 rounded-full hover:bg-emerald-600"
              >
                Reservar
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-brand font-bold text-lg text-slate-900 mb-2">
                Fiesta Sweet
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Zona privada para 10-15 personas con barra de mini postres y bebidas.
              </p>
              <button
                type="button"
                onClick={irAReserva}
                className="w-full block text-center bg-slate-900 text-white text-xs font-bold py-2 rounded-full hover:bg-emerald-600"
              >
                Reservar
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-emerald-100">
              <h3 className="font-brand font-bold text-lg text-slate-900 mb-2">
                Tarde de Té
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Degustación de 3 porciones de tarta artesanal y maridaje.
              </p>
              <button
                type="button"
                onClick={irAReserva}
                className="w-full block text-center bg-slate-900 text-white text-xs font-bold py-2 rounded-full hover:bg-emerald-600"
              >
                Reservar
              </button>
            </div>
          </div>
        </section>

        {/* Cotización del pastel */}
        <section
          id="cotizacion-pastel"
          className="bg-white rounded-3xl p-8 shadow-sm border border-amber-200/80"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                <i className="fa-solid fa-cake-candles"></i>
              </div>
              <h2 className="font-brand text-2xl font-bold text-slate-900">
                Cotiza tu Pastel Soñado
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                ¿Tienes una idea única para un pastel de cumpleaños, boda o aniversario? Cuéntanos tu concepto y diseñaremos un boceto junto con el presupuesto a tu medida.
              </p>
            </div>
            <div className="md:col-span-2 bg-[#fdfbf7] p-6 rounded-2xl border border-amber-100">
              <button
                type="button"
                onClick={irAReserva}
                className="w-full flex items-center justify-between group text-left"
              >
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-sm block group-hover:text-amber-700">
                    Diseña con nuestro Maestro Repostero
                  </span>
                  <span className="text-xs text-gray-500 block">
                    Elige sabor, pisos, cubierta temática y fecha del evento
                  </span>
                </div>
                <span className="bg-amber-600 text-white px-5 py-2.5 rounded-full text-xs font-bold group-hover:bg-amber-700 shrink-0 ml-4">
                  Ir a Cotizador <i className="fa-solid fa-arrow-right ml-1"></i>
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

