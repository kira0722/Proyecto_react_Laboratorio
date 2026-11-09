export type Pagina = 'inicio' | 'reserva' | 'mis-reservas' | 'login';

export interface Especialidad {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  icono: string;
  color: 'emerald' | 'amber';
}

export interface Reserva {
  id: string;
  codigo: string;
  fecha: string;
  hora: string;
  invitados: string;
  zona: string;
  saborPastel?: string;
  pisosPastel?: string;
  coberturaPastel?: string;
  tematicaPastel?: string;
  solicitudes?: string;
  estado: 'Confirmada' | 'Cancelada';
}

export interface Usuario {
  correo: string;
  nombre: string;
}

