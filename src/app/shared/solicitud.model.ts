export class SolicitudModel {
    constructor(
        public usuarioId: string,  // Obligatorio
        public mascotaId: string,   // Obligatorio
        public id?: string,         // Opcional
        public fechaSolicitud?: Date,
        public estado?: string       // 'pendiente', 'aprobada', 'rechazada'
    ) {}
}
