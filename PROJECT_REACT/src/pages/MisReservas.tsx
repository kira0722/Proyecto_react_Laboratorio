import type { Reserva } from '../types';

interface MisReservasProps {
  reservas: Reserva[];
  cancelarReserva: (id: string) => void;
  eliminarReserva: (id: string) => void;
  irANuevaReserva: () => void;
}

export function MisReservas({
  reservas,
  cancelarReserva,
  eliminarReserva,
  irANuevaReserva,
}: MisReservasProps) {
  const manejarCancelar = (id: string) => {
    if (window.confirm('¿Deseas cancelar esta reserva de evento/mesa?')) {
      cancelarReserva(id);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-brand text-3xl font-bold text-slate-900">
            Mis Reservas y Eventos
          </h2>
          <p className="text-gray-500 text-sm">
            Gestiona tus próximas visitas a Menta &amp; Vainilla
          </p>
        </div>
        <button
          type="button"
          onClick={irANuevaReserva}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-emerald-700 shadow-sm"
        >
          <i className="fa-solid fa-plus mr-1"></i> Nueva Reserva
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-emerald-100/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50/50 text-slate-700 text-xs uppercase font-bold border-b border-emerald-100">
                <th className="p-4">Código</th>
                <th className="p-4">Fecha y Hora</th>
                <th className="p-4">Ambiente</th>
                <th className="p-4">Personas</th>
                <th className="p-4">Pastel Cotizado</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {reservas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No tienes reservas registradas. ¡Crea tu primera reserva!
                  </td>
                </tr>
              ) : (
                reservas.map((item) => {
                  const estaCancelada = item.estado === 'Cancelada';
                  return (
                    <tr
                      key={item.id}
                      className={estaCancelada ? 'opacity-50 bg-gray-50/50' : ''}
                    >
                      <td className="p-4 font-mono font-bold text-slate-900">
                        {item.codigo}
                      </td>
                      <td className="p-4">
                        {item.fecha} - {item.hora}
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{item.zona}</span>
                        {item.solicitudes && (
                          <span className="block text-xs text-gray-400">
                            Nota: {item.solicitudes}
                          </span>
                        )}
                      </td>
                      <td className="p-4">{item.invitados} Pers.</td>
                      <td className="p-4 text-xs">
                        {item.saborPastel ? (
                          <div>
                            <span className="font-semibold text-amber-800 block">
                              <i className="fa-solid fa-cake-candles mr-1"></i>
                              {item.saborPastel}
                            </span>
                            <span className="text-gray-500">
                              {item.pisosPastel} piso(s) · {item.coberturaPastel}
                            </span>
                            {item.tematicaPastel && (
                              <span className="block text-gray-400 italic">
                                "{item.tematicaPastel}"
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">Solo mesa</span>
                        )}
                      </td>
                      <td className="p-4">
                        {estaCancelada ? (
                          <span className="text-rose-600 font-semibold text-xs px-3 py-1 bg-rose-50 rounded-full">
                            Cancelada
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-xs">
                            Confirmada
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center space-x-2">
                        {!estaCancelada && (
                          <button
                            type="button"
                            onClick={() => manejarCancelar(item.id)}
                            className="text-rose-600 font-medium text-xs bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full"
                          >
                            Cancelar
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => eliminarReserva(item.id)}
                          title="Eliminar del historial"
                          className="text-gray-400 hover:text-rose-600 text-xs px-2 py-1"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

