import { useState } from 'react';
import type { Reserva } from '../types';

interface ReservaPageProps {
  crearReserva: (nueva: Omit<Reserva, 'id' | 'codigo' | 'estado'>) => void;
}

export function ReservaPage({ crearReserva }: ReservaPageProps) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [invitados, setInvitados] = useState('2');
  const [zona, setZona] = useState('Jardín Menta');

  // Cotización Pastel (Opcional)
  const [saborPastel, setSaborPastel] = useState('');
  const [pisosPastel, setPisosPastel] = useState('1');
  const [coberturaPastel, setCoberturaPastel] = useState('Buttercream Sedoso');
  const [tematicaPastel, setTematicaPastel] = useState('');
  const [solicitudes, setSolicitudes] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    crearReserva({
      fecha,
      hora,
      invitados,
      zona,
      saborPastel: saborPastel || undefined,
      pisosPastel: saborPastel ? pisosPastel : undefined,
      coberturaPastel: saborPastel ? coberturaPastel : undefined,
      tematicaPastel: tematicaPastel.trim() || undefined,
      solicitudes: solicitudes.trim() || undefined,
    });
    alert('¡Tu reserva en Menta & Vainilla ha sido registrada con éxito!');
  };

  const opcionesZona = [
    {
      valor: 'Jardín Menta',
      titulo: 'Jardín Menta',
      subtitulo: 'Al aire libre con plantas',
      icono: 'fa-leaf text-emerald-500',
    },
    {
      valor: 'Salón Vainilla',
      titulo: 'Salón Vainilla',
      subtitulo: 'Interior cálido e íntimo',
      icono: 'fa-couch text-amber-600',
    },
    {
      valor: 'Barra Especial',
      titulo: 'Barra Especial',
      subtitulo: 'Vista a la cocina artesanal',
      icono: 'fa-cookie-bite text-emerald-600',
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 flex-grow w-full">
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 border border-emerald-100/60">
        <div className="mb-8">
          <span className="bg-amber-100 text-amber-800 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
            Reserva &amp; Personalización
          </span>
          <h2 className="font-brand text-3xl font-bold text-slate-900 mt-2">
            Reserva tu Celebración
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Elige el espacio ideal en nuestro salón y diseña tu pastel soñado para la ocasión.
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-8">
          {/* 1. Datos de Reserva */}
          <div className="space-y-6">
            <h3 className="font-brand text-xl font-bold text-slate-900 border-b border-gray-100 pb-2">
              1. Detalles de la Visita
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Hora
                </label>
                <select
                  required
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="">Selecciona Hora</option>
                  <option value="03:00 PM">03:00 PM (Tarde de Té)</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Invitados
                </label>
                <select
                  required
                  value={invitados}
                  onChange={(e) => setInvitados(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="2">2 personas</option>
                  <option value="4">4 personas</option>
                  <option value="8">6 a 8 personas</option>
                  <option value="15">10 a 15 (Zona Evento)</option>
                </select>
              </div>
            </div>

            {/* Seleccionar Zona */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-3">
                Ambiente del Salón
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {opcionesZona.map((op) => {
                  const seleccionada = zona === op.valor;
                  return (
                    <label
                      key={op.valor}
                      className={`border-2 rounded-2xl p-4 cursor-pointer hover:border-emerald-400 flex items-center space-x-3 transition ${
                        seleccionada
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="zona"
                        value={op.valor}
                        checked={seleccionada}
                        onChange={() => setZona(op.valor)}
                        className="text-emerald-600 focus:ring-emerald-500"
                        required
                      />
                      <div>
                        <span className="font-bold block text-sm text-slate-800">
                          <i className={`fa-solid ${op.icono} mr-1`}></i> {op.titulo}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {op.subtitulo}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Cotización Pastel */}
          <div
            id="cotizar-pastel"
            className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80 space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div>
                <h3 className="font-brand font-bold text-slate-900 text-lg">
                  2. Cotización de Pastel Soñado (Opcional)
                </h3>
                <p className="text-xs text-gray-500">
                  Completa si deseas encargar un pastel personalizado para tu reserva
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-600 mb-1">
                  Sabor Principal
                </label>
                <select
                  value={saborPastel}
                  onChange={(e) => setSaborPastel(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="">Sin pastel (Solo reserva)</option>
                  <option value="Vainilla Bourbon & Frutos Rojos">
                    Vainilla Bourbon &amp; Frutos Rojos
                  </option>
                  <option value="Menta Fresca & Chocolate 70%">
                    Menta Fresca &amp; Chocolate Cacao 70%
                  </option>
                  <option value="Red Velvet Menta">Red Velvet Menta</option>
                  <option value="Zanahoria & Nueces">
                    Zanahoria &amp; Nueces Caramelizadas
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-600 mb-1">
                  Niveles / Pisos
                </label>
                <select
                  value={pisosPastel}
                  onChange={(e) => setPisosPastel(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="1">1 Piso (Hasta 12 porciones)</option>
                  <option value="2">2 Pisos (Hasta 25 porciones)</option>
                  <option value="3">3 Pisos (Hasta 50 porciones)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase text-gray-600 mb-1">
                  Estilo de Cobertura
                </label>
                <select
                  value={coberturaPastel}
                  onChange={(e) => setCoberturaPastel(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="Buttercream Sedoso">Buttercream Sedoso</option>
                  <option value="Naked Cake">Naked Cake (Semi al desnudo)</option>
                  <option value="Fondant Personalizado">
                    Fondant Temático Personalizado
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-gray-600 mb-1">
                Detalles de Temática o Mensaje para el Pastel
              </label>
              <input
                type="text"
                value={tematicaPastel}
                onChange={(e) => setTematicaPastel(e.target.value)}
                placeholder="Ej: Pastel color verde menta con detalles dorados y letrero de 'Feliz Cumpleaños Sofía'"
                className="w-full px-3 py-2.5 border rounded-xl text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Solicitudes Especiales */}
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
              Solicitudes Especiales para la Mesa
            </label>
            <textarea
              rows={2}
              value={solicitudes}
              onChange={(e) => setSolicitudes(e.target.value)}
              placeholder="Ej: Requerimos una silla alta para bebé o mesa cerca de la ventana..."
              className="w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-full hover:bg-emerald-700 shadow-md"
          >
            Confirmar Reserva &amp; Enviar Cotización
          </button>
        </form>
      </div>
    </main>
  );
}

