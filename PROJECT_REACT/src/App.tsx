import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Inicio } from './pages/Inicio';
import { ReservaPage } from './pages/Reserva';
import { MisReservas } from './pages/MisReservas';
import { Login } from './pages/Login';
import type { Especialidad, Pagina, Reserva, Usuario } from './types';

const ESPECIALIDADES_INICIALES: Especialidad[] = [
  {
    id: 1,
    nombre: 'Tarta Menta Fresca',
    descripcion: 'Mousse de menta natural con cobertura de chocolate amargo 70% cacao.',
    precio: '$15.000 / Porción',
    icono: 'fa-cake-candles',
    color: 'emerald',
  },
  {
    id: 2,
    nombre: 'Cheesecake Vainilla',
    descripcion: 'Base crocante de galleta artesanal con infusión de vainilla en vaina.',
    precio: '$16.000 / Porción',
    icono: 'fa-stroopwafel',
    color: 'amber',
  },
  {
    id: 3,
    nombre: 'Macarons Artesanales',
    descripcion: 'Caja de 6 piezas surtidas (Menta, Vainilla Bourbon, Pistacho y Caramelo).',
    precio: '$28.000 / Caja',
    icono: 'fa-cookie',
    color: 'emerald',
  },
  {
    id: 4,
    nombre: 'Café & Té de Origen',
    descripcion: 'Maridaje especial de bebidas calientes o frías infundidas con menta silvestre.',
    precio: 'Desde $10.000',
    icono: 'fa-mug-hot',
    color: 'amber',
  },
];

const RESERVAS_INICIALES: Reserva[] = [
  {
    id: '1',
    codigo: '#MV-1042',
    fecha: '2026-10-12',
    hora: '05:00 PM',
    zona: 'Jardín Menta',
    invitados: '4',
    saborPastel: 'Menta Fresca & Chocolate 70%',
    pisosPastel: '1',
    coberturaPastel: 'Buttercream Sedoso',
    estado: 'Confirmada',
  },
  {
    id: '2',
    codigo: '#MV-0988',
    fecha: '2026-10-28',
    hora: '03:00 PM',
    zona: 'Salón Vainilla',
    invitados: '2',
    estado: 'Confirmada',
  },
];

function App() {
  const [paginaActual, setPaginaActual] = useState<Pagina>('inicio');

  // Estado de Especialidades en LocalStorage
  const [especialidades, setEspecialidades] = useState<Especialidad[]>(() => {
    const guardadas = localStorage.getItem('mv_especialidades');
    return guardadas ? JSON.parse(guardadas) : ESPECIALIDADES_INICIALES;
  });

  // Estado de Reservas en LocalStorage
  const [reservas, setReservas] = useState<Reserva[]>(() => {
    const guardadas = localStorage.getItem('mv_reservas');
    return guardadas ? JSON.parse(guardadas) : RESERVAS_INICIALES;
  });

  // Estado de Usuario en LocalStorage
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = localStorage.getItem('mv_usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    localStorage.setItem('mv_especialidades', JSON.stringify(especialidades));
  }, [especialidades]);

  useEffect(() => {
    localStorage.setItem('mv_reservas', JSON.stringify(reservas));
  }, [reservas]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('mv_usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('mv_usuario');
    }
  }, [usuario]);

  // Funciones CRUD para Especialidades
  const agregarEspecialidad = (nueva: Omit<Especialidad, 'id'>) => {
    const item: Especialidad = {
      ...nueva,
      id: Date.now(),
    };
    setEspecialidades([...especialidades, item]);
  };

  const eliminarEspecialidad = (id: number) => {
    setEspecialidades(especialidades.filter((item) => item.id !== id));
  };

  // Funciones CRUD para Reservas
  const crearReserva = (datos: Omit<Reserva, 'id' | 'codigo' | 'estado'>) => {
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    const nuevaReserva: Reserva = {
      ...datos,
      id: Date.now().toString(),
      codigo: `#MV-${numeroAleatorio}`,
      estado: 'Confirmada',
    };
    setReservas([nuevaReserva, ...reservas]);
    setPaginaActual('mis-reservas');
  };

  const cancelarReserva = (id: string) => {
    setReservas(
      reservas.map((res) =>
        res.id === id ? { ...res, estado: 'Cancelada' } : res
      )
    );
  };

  const eliminarReserva = (id: string) => {
    setReservas(reservas.filter((res) => res.id !== id));
  };

  // Funciones de Sesión
  const iniciarSesion = (datosUsuario: Usuario) => {
    setUsuario(datosUsuario);
    setPaginaActual('inicio');
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen flex flex-col justify-between text-slate-800">
      <Navbar
        paginaActual={paginaActual}
        cambiarPagina={setPaginaActual}
        usuario={usuario}
      />

      {paginaActual === 'inicio' && (
        <Inicio
          especialidades={especialidades}
          agregarEspecialidad={agregarEspecialidad}
          eliminarEspecialidad={eliminarEspecialidad}
          irAReserva={() => setPaginaActual('reserva')}
          cambiarPagina={setPaginaActual}
        />
      )}

      {paginaActual === 'reserva' && (
        <ReservaPage crearReserva={crearReserva} />
      )}

      {paginaActual === 'mis-reservas' && (
        <MisReservas
          reservas={reservas}
          cancelarReserva={cancelarReserva}
          eliminarReserva={eliminarReserva}
          irANuevaReserva={() => setPaginaActual('reserva')}
        />
      )}

      {paginaActual === 'login' && (
        <Login
          usuario={usuario}
          iniciarSesion={iniciarSesion}
          cerrarSesion={cerrarSesion}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
