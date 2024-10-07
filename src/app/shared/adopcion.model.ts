export class AdopcionModel {
        constructor(
        public usuarioId: string,
        public mascotaId: string,
        public fechaAdopcion: Date,
        public id?: string
        ) {}
    }
